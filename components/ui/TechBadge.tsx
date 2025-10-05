"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { GraduationCap, Award, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TechBadgeProps {
  name: string;
  level: "expert" | "advanced" | "intermediate";
  description: string;
  delay?: number;
  className?: string;
}

// Tech logos from shields.io and devicons
const techLogos: Record<
  string,
  { url: string; bgColor: string; textColor: string }
> = {
  React: {
    url: "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB",
    bgColor: "from-blue-400 to-blue-600",
    textColor: "text-blue-600",
  },
  JavaScript: {
    url: "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
    bgColor: "from-yellow-400 to-yellow-600",
    textColor: "text-yellow-600",
  },
  TypeScript: {
    url: "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white",
    bgColor: "from-blue-500 to-blue-700",
    textColor: "text-blue-600",
  },
  PHP: {
    url: "https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white",
    bgColor: "from-purple-400 to-purple-600",
    textColor: "text-purple-600",
  },
  Python: {
    url: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
    bgColor: "from-blue-500 to-green-500",
    textColor: "text-green-600",
  },
  "C#": {
    url: "https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white",
    bgColor: "from-purple-500 to-purple-700",
    textColor: "text-purple-600",
  },
  AWS: {
    url: "https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white",
    bgColor: "from-orange-400 to-orange-600",
    textColor: "text-orange-600",
  },
  Azure: {
    url: "https://img.shields.io/badge/Microsoft_Azure-0089D0?style=for-the-badge&logo=microsoft-azure&logoColor=white",
    bgColor: "from-blue-400 to-blue-600",
    textColor: "text-blue-500",
  },
  HTML5: {
    url: "https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white",
    bgColor: "from-orange-500 to-red-500",
    textColor: "text-orange-600",
  },
  CSS3: {
    url: "https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white",
    bgColor: "from-blue-400 to-blue-600",
    textColor: "text-blue-500",
  },
  WordPress: {
    url: "https://img.shields.io/badge/WordPress-%23117AC9.svg?style=for-the-badge&logo=WordPress&logoColor=white",
    bgColor: "from-blue-600 to-blue-800",
    textColor: "text-blue-700",
  },
  "Node.js": {
    url: "https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white",
    bgColor: "from-green-500 to-green-700",
    textColor: "text-green-600",
  },
  "Next.js": {
    url: "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white",
    bgColor: "from-gray-800 to-black",
    textColor: "text-gray-800",
  },
  Laravel: {
    url: "https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white",
    bgColor: "from-red-500 to-red-700",
    textColor: "text-red-600",
  },
  Docker: {
    url: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white",
    bgColor: "from-blue-400 to-blue-600",
    textColor: "text-blue-600",
  },
};

const levelColors = {
  expert:
    "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400",
  advanced:
    "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400",
  intermediate:
    "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400",
};

const levelDots = {
  expert: 5,
  advanced: 4,
  intermediate: 3,
};

export function TechBadge({
  name,
  level,
  description,
  delay = 0,
  className,
}: TechBadgeProps) {
  const logo = techLogos[name];
  const dots = levelDots[level];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, y: -2 }}
      className={cn(
        "group relative bg-bg-primary border border-bg-accent rounded-xl p-5",
        "hover:border-primary/30 hover:shadow-card transition-all duration-300",
        "cursor-pointer overflow-hidden",
        className
      )}
    >
      {/* Background Gradient Overlay */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300",
          `bg-gradient-to-br ${logo?.bgColor || "from-primary to-accent"}`
        )}
      />

      {/* Level Badge */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={cn(
            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border",
            levelColors[level]
          )}
        >
          {level}
        </span>

        {/* Skill Level Dots */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                i < dots
                  ? logo?.textColor || "bg-primary"
                  : "bg-bg-accent dark:bg-bg-secondary"
              )}
            />
          ))}
        </div>
      </div>

      {/* Tech Logo Badge */}
      <div className="flex items-center justify-center mb-4 relative">
        <div className="relative group-hover:scale-110 transition-transform duration-300">
          {logo ? (
            <Image
              src={logo.url}
              alt={`${name} logo`}
              width={120}
              height={35}
              className="h-8 w-auto"
              unoptimized // Since it's an external badge
            />
          ) : (
            <div
              className={cn(
                "px-4 py-2 rounded-lg font-bold text-sm",
                "bg-gradient-to-r from-primary to-accent text-white"
              )}
            >
              {name}
            </div>
          )}
        </div>
      </div>

      {/* Tech Name */}
      <h4
        className={cn(
          "font-bold text-center mb-3 group-hover:text-primary transition-colors duration-300",
          logo?.textColor || "text-text-primary"
        )}
      >
        {name}
      </h4>

      {/* Description */}
      <p className="text-sm text-text-muted text-center leading-relaxed">
        {description}
      </p>

      {/* Hover Glow Effect */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10",
          `bg-gradient-to-r ${logo?.bgColor || "from-primary to-accent"}`
        )}
      />
    </motion.div>
  );
}

/**
 * Tech Badge Grid Component
 */
interface TechBadgeGridProps {
  skills: Array<{
    name: string;
    level: "expert" | "advanced" | "intermediate";
    description: string;
  }>;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function TechBadgeGrid({
  skills,
  className,
  columns = 3,
}: TechBadgeGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {skills.map((skill, index) => (
        <TechBadge
          key={skill.name}
          name={skill.name}
          level={skill.level}
          description={skill.description}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
}

/**
 * Skill Category Component with Tech Badges
 */
interface SkillCategoryProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: Array<{
    name: string;
    level: "expert" | "advanced" | "intermediate";
    description: string;
  }>;
  className?: string;
}

export function SkillCategory({
  title,
  icon: Icon,
  skills,
  className,
}: SkillCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn("card-system", className)}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-gradient-hero rounded-lg">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-text-primary">{title}</h3>
      </div>

      <TechBadgeGrid skills={skills} columns={3} />
    </motion.div>
  );
}




/**
 * Education Timeline Component
 */
interface EducationTimelineProps {
  education: Array<{
    degree: string;
    institution: string;
    year: string;
    description: string;
    type: "degree" | "certification" | "course";
  }>;
}

const educationIcons = {
  degree: GraduationCap,
  certification: Award,
  course: Zap,
};

const educationColors = {
  degree: "from-blue-500 to-indigo-600",
  certification: "from-green-500 to-emerald-600",
  course: "from-purple-500 to-violet-600",
};

export function EducationTimeline({ education }: EducationTimelineProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary opacity-30" />

        <div className="space-y-8">
          {education.map((edu, index) => {
            const Icon = educationIcons[edu.type];
            const colorGradient = educationColors[edu.type];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative flex gap-6"
              >
                {/* Timeline Icon */}
                <div className="relative z-10 flex-shrink-0">
                  <div
                    className={cn(
                      "w-16 h-16 rounded-2xl flex items-center justify-center",
                      "bg-gradient-to-br shadow-lg border-4 border-bg-primary",
                      colorGradient
                    )}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Connecting Line */}
                  {index < education.length - 1 && (
                    <div className="absolute top-16 left-1/2 w-0.5 h-8 bg-bg-accent -translate-x-px" />
                  )}
                </div>

                {/* Education Content */}
                <motion.div
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="flex-1 card-system hover:shadow-card transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span
                        className={cn(
                          "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-2",
                          "bg-gradient-to-r text-white shadow-sm",
                          colorGradient
                        )}
                      >
                        {edu.type.charAt(0).toUpperCase() + edu.type.slice(1)}
                      </span>
                      <h3 className="text-lg font-bold text-text-primary mb-1">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-medium text-secondary">
                        {edu.institution}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">
                        {edu.year}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {edu.description}
                  </p>

                  {/* Decorative Element */}
                  <div
                    className={cn(
                      "absolute top-0 right-0 w-20 h-20 opacity-5 rounded-bl-full",
                      "bg-gradient-to-br",
                      colorGradient
                    )}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Timeline End */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: education.length * 0.1 + 0.2 }}
          className="relative flex justify-center mt-12"
        >
          <div className="w-12 h-12 rounded-full bg-gradient-hero flex items-center justify-center shadow-lg">
            <Zap className="w-6 h-6 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Education Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: education.length * 0.1 + 0.4 }}
        className="mt-12 card-premium text-center"
      >
        <h3 className="font-bold mb-2">Continuous Learning Commitment</h3>
        <p className="text-sm opacity-90 max-w-md mx-auto">
          Dedicated to staying current with emerging technologies, industry best
          practices, and innovative solutions that drive strategic business
          outcomes.
        </p>
      </motion.div>
    </div>
  );
}
