"use client";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Award,
  Code,
  Database,
  Cloud,
  Palette,
  Globe,
  Zap,
  Server,
  Layout,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SkillCategory, TechBadgeGrid } from "@/components/ui/TechBadge";

interface Skill {
  name: string;
  category: "frontend" | "backend" | "cloud" | "database" | "cms" | "language";
  level: "expert" | "advanced" | "intermediate";
  icon: string; // We'll use text-based icons for now, easily replaceable with real logos
  color: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
  description: string;
  type: "degree" | "certification" | "course";
}

// Skill categories with tech badge integration
const skillCategories = {
  frontend: {
    title: 'Frontend Development',
    icon: Layout,
    skills: [
      {
        name: 'React',
        level: 'expert' as const,
        description: 'Modern React with hooks, context, and performance optimization'
      },
      {
        name: 'Next.js',
        level: 'expert' as const,
        description: 'Full-stack React framework with SSR and static generation'
      },
      {
        name: 'JavaScript',
        level: 'expert' as const,
        description: 'ES6+, async/await, functional programming patterns'
      },
      {
        name: 'TypeScript',
        level: 'expert' as const,
        description: 'Type-safe development, advanced types, generics'
      },
      {
        name: 'HTML5',
        level: 'expert' as const,
        description: 'Semantic markup, accessibility, modern standards'
      },
      {
        name: 'CSS3',
        level: 'expert' as const,
        description: 'Grid, Flexbox, animations, responsive design'
      }
    ]
  },
  backend: {
    title: 'Backend Development',
    icon: Server,
    skills: [
      {
        name: 'PHP',
        level: 'expert' as const,
        description: 'Modern PHP, Laravel, API development, optimization'
      },
      {
        name: 'Laravel',
        level: 'expert' as const,
        description: 'Eloquent ORM, Artisan, API resources, queues'
      },
      {
        name: 'Python',
        level: 'advanced' as const,
        description: 'Django, Flask, data processing, automation scripts'
      },
      {
        name: 'C#',
        level: 'advanced' as const,
        description: '.NET Core, ASP.NET, enterprise applications'
      },
      {
        name: 'Node.js',
        level: 'advanced' as const,
        description: 'Express, API development, microservices'
      }
    ]
  },
  cloud: {
    title: 'Cloud & DevOps',
    icon: Cloud,
    skills: [
      {
        name: 'AWS',
        level: 'expert' as const,
        description: 'EC2, Lambda, S3, RDS, CloudFormation, DevOps'
      },
      {
        name: 'Azure',
        level: 'advanced' as const,
        description: 'App Services, Functions, Storage, Active Directory'
      },
      {
        name: 'Docker',
        level: 'advanced' as const,
        description: 'Containerization, orchestration, deployment'
      }
    ]
  },
  cms: {
    title: 'Content Management',
    icon: Globe,
    skills: [
      {
        name: 'WordPress',
        level: 'expert' as const,
        description: 'Custom themes, plugins, headless CMS, optimization'
      }
    ]
  }
}

const education: Education[] = [
  {
    degree: "Bachelor of Computer Science",
    institution: "University of Technology",
    year: "2018",
    description:
      "Specialized in Software Engineering, Devops, and Hardware solutions with focus on scalable solutions.",
    type: "degree",
  },
  {
    degree: "AWS Solutions Architect Professional",
    institution: "Amazon Web Services",
    year: "2022",
    description:
      "Advanced cloud architecture, security, and enterprise-scale deployments.",
    type: "certification",
  },
  {
    degree: "Advanced React Development",
    institution: "Meta Professional Certificate",
    year: "2023",
    description:
      "Modern React patterns, performance optimization, and enterprise application development.",
    type: "course",
  },
  {
    degree: "System Design & Architecture",
    institution: "MIT Professional Education",
    year: "2021",
    description:
      "Large-scale system design, microservices, and distributed architecture patterns.",
    type: "course",
  },
];



const educationIcons = {
  degree: GraduationCap,
  certification: Award,
  course: Zap,
};

export function SkillsEducationSection() {
  return (
    <section className="section-padding bg-bg-secondary">
      <div className="container-strategic">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title text-gradient-hero">
            Skills & Education
          </h2>
          <p className="section-subtitle">
            A systematic approach to technology mastery and continuous learning,
            building expertise that delivers scalable solutions and strategic
            results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
              <Code className="text-primary" size={24} />
              Technical Skills
            </h3>

            <div className="space-y-12">
              {Object.entries(skillCategories).map(([key, category]) => (
                <SkillCategory
                  key={key}
                  title={category.title}
                  icon={category.icon}
                  skills={category.skills}
                />
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-bold text-text-primary mb-8 flex items-center gap-3">
              <GraduationCap className="text-primary" size={24} />
              Education
            </h3>

            <div className="space-y-6">
              {education.map((edu, index) => {
                const EduIcon = educationIcons[edu.type];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card-blueprint relative"
                  >
                    {/* Type Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={cn(
                          "badge-system text-xs",
                          edu.type === "degree" &&
                            "bg-blue-100 text-blue-800 border-blue-200",
                          edu.type === "certification" &&
                            "bg-green-100 text-green-800 border-green-200",
                          edu.type === "course" &&
                            "bg-purple-100 text-purple-800 border-purple-200"
                        )}
                      >
                        <EduIcon size={12} className="mr-1" />
                        {edu.type.charAt(0).toUpperCase() + edu.type.slice(1)}
                      </span>
                      <span className="text-sm font-medium text-primary">
                        {edu.year}
                      </span>
                    </div>

                    <h4 className="font-bold text-text-primary mb-2">
                      {edu.degree}
                    </h4>

                    <p className="text-sm font-medium text-secondary mb-3">
                      {edu.institution}
                    </p>

                    <p className="text-sm text-text-secondary leading-relaxed">
                      {edu.description}
                    </p>

                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-accent opacity-5 rounded-bl-full" />
                  </motion.div>
                );
              })}
            </div>

            {/* Continuous Learning Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-8 card-premium text-center"
            >
              <Zap className="w-8 h-8 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Continuous Learning</h4>
              <p className="text-sm opacity-90">
                Committed to staying current with emerging technologies and
                industry best practices.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
