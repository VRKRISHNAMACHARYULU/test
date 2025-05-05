
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  additionalInfo: string;
  technologies: string[];
  links: {
    demo: string;
    github: string;
  };
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-purple-500/20 h-full flex flex-col overflow-hidden">
      <div className="p-6 flex-grow">
        <h3 className="text-xl font-semibold text-cyan-400 mb-4">{project.title}</h3>
        <p className="text-white/80 mb-4">{project.description}</p>
        <p className="text-white/70 mb-6 text-sm">{project.additionalInfo}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-purple-500/20 rounded-full text-xs text-white"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div className="border-t border-purple-500/20 p-4 flex justify-center gap-4">
        <Button variant="outline" size="sm" className="border-cyan-500/50 text-white hover:bg-cyan-500/20 flex-1">
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full">
            <ExternalLink size={14} /> Live Demo
          </a>
        </Button>
        <Button variant="outline" size="sm" className="border-purple-500/50 text-white hover:bg-purple-500/20 flex-1">
          <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full">
            <Github size={14} /> GitHub
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
