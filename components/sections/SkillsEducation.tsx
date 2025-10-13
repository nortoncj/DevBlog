"use client";

import { useState } from "react";
import {
  BiLogoPhp,
  BiLogoReact,
  BiLogoHtml5,
  BiLogoCss3,
  BiLogoJavascript,
  BiLogoDocker,
  BiLogoCPlusPlus,
  BiLogoPython,
  BiLogoAws,
  BiLogoMicrosoft,
  BiLogoWordpress,
  BiLogoKubernetes,
} from "react-icons/bi";

const SkillsEducation = () => {
  const [activeTab, setActiveTab] = useState("skills");

  const skills = [
    {
      name: "Laravel / PHP",
      icon: BiLogoPhp,
      color: "bg-red-500 dark:bg-red-600",
    },
    {
      name: "React",
      icon: BiLogoReact,
      color: "bg-cyan-400 dark:bg-cyan-500",
    },
    {
      name: "HTML",
      icon: BiLogoHtml5,
      color: "bg-orange-600 dark:bg-orange-500",
    },
    {
      name: "CSS",
      icon: BiLogoCss3,
      color: "bg-purple-600 dark:bg-purple-500",
    },
    {
      name: "AWS",
      icon: BiLogoAws,
      color: "bg-gray-800 dark:bg-orange-500",
    },
    {
      name: "Azure",
      icon: BiLogoMicrosoft,
      color: "bg-blue-600 dark:bg-blue-500",
    },
    {
      name: "JavaScript",
      icon: BiLogoJavascript,
      color: "bg-green-500 dark:bg-green-400",
    },
    {
      name: "WordPress",
      icon: BiLogoWordpress,
      color: "bg-blue-700 dark:bg-blue-600",
    },
    {
      name: "Python",
      icon: BiLogoPython,
      color: "bg-yellow-500 dark:bg-yellow-400",
    },
    {
      name: "Docker",
      icon: BiLogoDocker,
      color: "bg-blue-400 dark:bg-blue-500",
    },
    {
      name: "Kubernetes",
      icon: BiLogoKubernetes,
      color: "bg-blue-600 dark:bg-blue-500",
    },
    {
      name: "C++",
      icon: BiLogoCPlusPlus,
      color: "bg-blue-800 dark:bg-blue-600",
    },
  ];

  const education = [
    {
      degree: "AS - Computer Engineering",
      institution: "UNIVERSITY OF SOUTH FLORIDA",
      year: "2019",
      description:
        "Learned the basics of coding languages, C, Java, JavaScript, Python, Computer Architecture, Control Systems.",
    },
    {
      degree: "BSc in Electrical Engineering",
      institution: "FLORIDA INTERNATIONAL UNIVERSITY",
      year: "2021",
      description:
        "Learned object oriented programming, data analytics, and basic Data Structures and Algorithms. Circuitry and Embedded Systems",
    },
    {
      degree: "AWS Certified Cloud Practitioner",
      institution: "AWS / PEARSON",
      year: "2021 - 2025",
      description:
        "Learned how to host apps and emails using Dynamo DB, EC2, S3 and Code Pipelines as well use Lambda Functions",
    },
    {
      degree: "Azure AI Fundamentals",
      institution: "MICROSOFT",
      year: "2024 - Present",
      description:
        "Participated in training that utilizes web api and machine learning tactics for computer vision, generative AI and LLM",
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-br from-background via-muted/30 dark:via-muted/10 to-background dark:bg-[#1a1a1a] dark:from-[#1a1a1a] dark:to-[#2a2a2a]">
      <div className="container-strategic pb-4">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 gap-4 pb-4">
          <button
            onClick={() => setActiveTab("skills")}
            className={`px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
              activeTab === "skills"
                ? "bg-gradient-to-r from-signature-burgundy to-deep-magenta text-white shadow-button-glow"
                : "bg-background dark:bg-[#1a1a1a] text-foreground dark:text-white border-2 border-border dark:border-gray-600 hover:border-primary dark:hover:border-pink-400"
            }`}
          >
            SKILLS
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`px-12 py-4 rounded-full text-lg font-semibold transition-all duration-300 ${
              activeTab === "education"
                ? "bg-gradient-to-r from-signature-burgundy to-deep-magenta text-white shadow-button-glow"
                : "bg-background dark:bg-[#1a1a1a] text-foreground dark:text-white border-2 border-border dark:border-gray-600 hover:border-primary dark:hover:border-pink-400"
            }`}
          >
            EDUCATION
          </button>
        </div>

        {/* Content Area */}
        <div className="relative">
          {/* Skills Tab */}
          {activeTab === "skills" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-4 p-6 rounded-xl bg-card dark:bg-[#1a1a1a] hover:shadow-card-hover dark:hover:shadow-xl dark:hover:shadow-pink-500/20 transition-all duration-300 hover:-translate-y-1 border border-transparent dark:border-gray-700"
                  >
                    <div
                      className={`w-20 h-20 ${skill.color} rounded-full flex items-center justify-center text-3xl shadow-lg dark:shadow-xl`}
                    >
                      <skill.icon className="text-white text-2xl" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground dark:text-white text-center">
                      {skill.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Tab */}
          {activeTab === "education" && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {education.map((item, index) => (
                  <div key={index} className="relative flex flex-col">
                    {/* Timeline dot */}
                    <div className="absolute -left-3 top-0 md:relative md:left-0 md:mb-4 flex justify-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-deep-magenta to-signature-burgundy border-4 border-background dark:border-gray-900 shadow-lg"></div>
                    </div>

                    {/* Content */}
                    <div className="ml-6 md:ml-0 bg-card dark:bg-[#1a1a1a] border border-border dark:border-gray-600 rounded-xl p-6 shadow-card dark:shadow-xl h-full flex flex-col">
                      <h3 className="text-lg font-bold text-card-foreground dark:text-white mb-2 line-clamp-2">
                        {item.degree}
                      </h3>
                      <p className="text-xs font-semibold text-muted-foreground dark:text-gray-400 uppercase tracking-wide mb-3 line-clamp-2">
                        {item.institution}
                      </p>
                      <div className="inline-block bg-gradient-to-r from-deep-magenta to-signature-burgundy text-white px-3 py-1 rounded font-bold text-xs mb-3 self-start">
                        {item.year}
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-gray-300 leading-relaxed flex-grow">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillsEducation;
