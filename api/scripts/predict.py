import json
import sys
import os
import torch
from transformers import AutoTokenizer, AutoModel
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import re

# Set paths relative to script location
script_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.abspath(os.path.join(script_dir, '..'))
model_dir = os.path.join(project_root, 'models')
data_path = os.path.join(project_root, 'qa_data.json')

# Load configuration
config_file = os.path.join(model_dir, 'config.json')
try:
    with open(config_file, 'r') as f:
        config = json.load(f)
    
    model_name = config.get('model_name', 'sentence-transformers/all-MiniLM-L6-v2')
    print(f"Using model: {model_name}", file=sys.stderr)
except Exception as e:
    print(f"Error loading config: {e}", file=sys.stderr)
    model_name = 'sentence-transformers/all-MiniLM-L6-v2'  # Default fallback

# Load QA data
try:
    with open(data_path, 'r') as f:
        qa_data_raw = json.load(f)
    
    # Handle the specific structure of your qa_data.json
    qa_data = []
    
    # Extract questions list if it exists
    if 'questions' in qa_data_raw:
        questions_list = qa_data_raw['questions']
        print(f"Found {len(questions_list)} questions in list", file=sys.stderr)
    
    # Extract qa_dict if it exists
    if 'qa_dict' in qa_data_raw:
        qa_dict = qa_data_raw['qa_dict']
        print(f"Found {len(qa_dict)} question-answer pairs in dictionary", file=sys.stderr)
        
        # Convert qa_dict to the format expected by the find_best_answer function
        for question, answer in qa_dict.items():
            qa_data.append({
                'questions': [question],
                'answer': answer
            })
    
    print(f"Processed {len(qa_data)} QA pairs for matching", file=sys.stderr)
except Exception as e:
    print(f"Error loading QA data: {e}", file=sys.stderr)
    qa_data = []

# Initialize tokenizer and model
try:
    tokenizer = AutoTokenizer.from_pretrained(model_name)
    model = AutoModel.from_pretrained(model_name)
    print("Model and tokenizer loaded successfully", file=sys.stderr)
except Exception as e:
    print(f"Error loading model from HuggingFace: {e}", file=sys.stderr)
    
    # Try loading from local path
    try:
        model_path = os.path.join(model_dir, 'sentence_model.pt')
        print(f"Attempting to load model from: {model_path}", file=sys.stderr)
        
        # For local model, still use the tokenizer from HuggingFace
        tokenizer = AutoTokenizer.from_pretrained(model_name)
        
        # Load the model from local file
        model = AutoModel.from_pretrained(model_name)
        model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
        
        print("Model loaded from local path", file=sys.stderr)
    except Exception as e:
        print(f"Error loading local model: {e}", file=sys.stderr)
        sys.exit(1)

# List of off-topic terms that should be rejected
OFF_TOPIC_TERMS = [
    'pakistan', 'terrorism', 'politics', 'religion', 'cricket', 'movie', 
    'film', 'celebrity', 'actor', 'actress', 'sports', 'news', 'current events',
    'controversy', 'scandal', 'war', 'conflict', 'government', 'president',
    'prime minister', 'election', 'vote', 'party', 'democrat', 'republican',
    'liberal', 'conservative', 'socialism', 'capitalism', 'communism'
]

# Function to check if a query is off-topic
def is_off_topic(query):
    # Convert to lowercase for case-insensitive matching
    query_lower = query.lower()
    
    # Check if any off-topic term is in the query
    for term in OFF_TOPIC_TERMS:
        if term.lower() in query_lower:
            print(f"Query contains off-topic term: {term}", file=sys.stderr)
            return True
    
    return False

# Function to check if query is portfolio-related
def is_portfolio_related(query):
    # Common portfolio-related terms
    portfolio_terms = [
        'you', 'your', 'skills', 'experience', 'project', 'education', 
        'internship', 'work', 'portfolio', 'job', 'career', 'knowledge',
        'language', 'programming', 'tool', 'technology', 'cloud', 'devops',
        'dream', 'weakness', 'strength', 'background', 'college', 'university',
        'degree', 'cgpa', 'gpa', 'name', 'vrk', 'github', 'deployment', 'aws',
        'docker', 'kubernetes', 'terraform', 'ansible', 'jenkins', 'automation',
        'yourself', 'accomplishment', 'achievement', 'goal', 'aspiration'
    ]
    
    # Convert to lowercase
    query_lower = query.lower()
    
    # Check if any portfolio-related term is in the query
    for term in portfolio_terms:
        if term.lower() in query_lower:
            return True
    
    return False

# Function to get embeddings
def get_embedding(text):
    # Tokenize and get model output
    inputs = tokenizer(text, padding=True, truncation=True, return_tensors="pt", max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Use [CLS] token embedding as sentence embedding
    embeddings = outputs.last_hidden_state[:, 0, :].numpy()
    return embeddings[0]  # Return the first (and only) embedding

# Function to find the best answer
def find_best_answer(query):
    print(f"Processing query: {query}", file=sys.stderr)
    
    # Initial filter: Check if query has off-topic terms
    if is_off_topic(query):
        return {"answer": "I'm sorry, I can only answer questions about VRK's professional background and portfolio.", "score": 0.0}
        
    # Second filter: Check if query is even portfolio-related
    if not is_portfolio_related(query) and len(query.split()) > 2:  # Skip short queries
        return {"answer": "I'm sorry, I can only answer questions about VRK's professional background and portfolio.", "score": 0.0}
    
    if not qa_data:
        return {"answer": "I'm sorry, my knowledge base is empty. Please try again later.", "score": 0.0}
    
    # Get embedding for the query
    try:
        query_embedding = get_embedding(query)
    except Exception as e:
        print(f"Error getting query embedding: {e}", file=sys.stderr)
        return {"answer": "I'm sorry, I encountered an error processing your query.", "score": 0.0}
    
    # Initialize variables to track best match
    best_score = -1
    best_answer = "I don't have information about that in my knowledge base."
    
    # Compare with all QA pairs
    for qa_pair in qa_data:
        try:
            # QA data can be in different formats, handle both cases
            if isinstance(qa_pair, dict):
                # If qa_pair is a dictionary with 'questions' and 'answer' keys
                questions = qa_pair.get('questions', [])
                if isinstance(questions, str):
                    questions = [questions]  # Convert string to list
            else:
                # If qa_pair is a list [question, answer]
                questions = [qa_pair[0]]
            
            # Process each question
            for question in questions if isinstance(questions, list) else [questions]:
                try:
                    question_embedding = get_embedding(question)
                    similarity = cosine_similarity([query_embedding], [question_embedding])[0][0]
                    
                    if similarity > best_score:
                        best_score = similarity
                        
                        # Extract answer based on data format
                        if isinstance(qa_pair, dict):
                            best_answer = qa_pair.get('answer', '')
                        else:
                            best_answer = qa_pair[1]
                except Exception as e:
                    print(f"Error processing question '{question}': {e}", file=sys.stderr)
                    continue
        except Exception as e:
            print(f"Error processing QA pair: {e}", file=sys.stderr)
            continue
    
    # Higher threshold for similarity - 0.75 instead of 0.6
    if best_score < 0.75:
        confidence_note = "I'm not very confident about this answer."
        if best_score < 0.65:  # Higher threshold for rejection
            return {"answer": "I don't have specific information about that in my knowledge base. I can only answer questions about VRK's professional background and portfolio.", "score": best_score}
        best_answer = f"{best_answer}\n\n({confidence_note})"
    
    # Add a standard signature to answers
    if not best_answer.endswith("Feel free to ask me about VRK's skills, projects, and experience!"):
        best_answer = best_answer.rstrip()
        if not best_answer.endswith('.'):
            best_answer += '.'
        best_answer += "."
    
    return {"answer": best_answer, "score": float(best_score)}

# Main function to handle command line arguments
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python predict.py \"your question here\"")
        sys.exit(1)
    
    query = sys.argv[1]
    result = find_best_answer(query)
    
    # Print the result as JSON
    print(json.dumps(result))