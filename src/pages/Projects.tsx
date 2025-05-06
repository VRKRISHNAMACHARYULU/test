
import { motion } from 'framer-motion';
import ParticleSystem from '../components/ParticleSystem/ParticleSystem';
import CursorSparkle from '../components/ParticleSystem/CursorSparkle';
import Navbar from '../components/Layout/Navbar';
import ProjectCard from '../components/Projects/ProjectCard';

const Projects = () => {
  const projects = [
    {
      title: "AWS Website Deployment",
      description: "Deployed both static and database-driven websites using AWS services, improving page load speeds by 50% and ensuring 99.9% uptime.",
      additionalInfo: "Configured 10+ servers, enhanced security settings, and improved website performance by reducing downtime by 30%.",
      technologies: ["AWS", "EC2", "RDS", "S3"],
      links: {
      demo: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7225744288490405888?collapsed=1", 
      github: "https://github.com/VRKRISHNAMACHARYULU/Iship"
      }
    },
    {
      title: "CI/CD Automation Pipeline",
      description: "Automated deployment pipelines and infrastructure management using Jenkins, Terraform, Kubernetes, and Docker.",
      additionalInfo: "Wrote Jenkins pipelines for CI/CD automation, provisioned infrastructure using Terraform, containerized applications with Docker, and orchestrated deployments with Kubernetes, ensuring efficient and reliable deployment workflows.",
      technologies: ["Jenkins", "Terraform", "Kubernetes", "Docker"],
      links: {
        demo: "https://www.linkedin.com/posts/vr-krishnamacharyulu-periyala-39b7a1314_automation-devops-java-activity-7319185492938305536-WZIh",
      github: "https://github.com/VRKRISHNAMACHARYULU/CI-CD.git"
      }
    },
    {
      title: "S3 Data Cleanup Automation",
      description: "Developed an AWS Lambda function that scans and deletes S3 objects older than 30 days, reducing unnecessary storage costs.",
      additionalInfo: "Configured an Event Bridge (Cloud Watch Events) rule to trigger the Lambda function every 24 hours, ensuring regular cleanup. Reduced manual intervention by 100%, automating the cleanup process for stale data and optimized S3 storage costs, achieving an estimated 20-30% reduction in unnecessary storage expenses.",
      technologies: ["AWS Lambda", "S3", "EventBridge", "CloudWatch"],
      links: {
        demo: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7315367812082847746?collapsed=1",
      github: "https://github.com/VRKRISHNAMACHARYULU/lambda.git"
      }
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleSystem />
      <CursorSparkle />
      <div className="absolute inset-0 z-10">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6">
              Projects
            </h2>
            <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
