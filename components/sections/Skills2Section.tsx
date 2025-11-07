"use client";

import React, { useState, useEffect, useRef } from "react";
import { IconType } from "react-icons";
import { BiLogoPostgresql } from "react-icons/bi";
import {
  FaAws,
  FaBolt,
  FaBrain,
  FaBroadcastTower,
  FaCertificate,
  FaChartBar,
  FaChartLine,
  FaCode,
  FaCodeBranch,
  FaCog,
  FaCogs,
  FaCss3,
  FaCube,
  FaDatabase,
  FaDocker,
  FaEnvelope,
  FaEnvelopeOpenText,
  FaEye,
  FaFigma,
  FaGit,
  FaGraduationCap,
  FaHtml5,
  FaHubspot,
  FaJs,
  FaLeaf,
  FaLink,
  FaMailchimp,
  FaMicrochip,
  FaMobileAlt,
  FaNetworkWired,
  FaNode,
  FaPaperPlane,
  FaPlug,
  FaProjectDiagram,
  FaPython,
  FaReact,
  FaRobot,
  FaServer,
  FaSignal,
  FaSync,
  FaToolbox,
  FaWifi,
  FaWind,
} from "react-icons/fa";
import { FaB, FaP, FaR } from "react-icons/fa6";
import { HiFlag } from "react-icons/hi";
import { LuWaves } from "react-icons/lu";
import { SiCplusplus, SiPhp } from "react-icons/si";
import { TbBrandCSharp, TbBrandMysql } from "react-icons/tb";

interface Skill {
  name: string;
  icon: IconType;
  description: string;
  tags: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  description: string;
  tags: string[];
}

interface Certification {
  title: string;
  issuer: string;
  year: string;
  icon: IconType;
  gradient: string;
}

interface SkillsEducationProps {
  emailSkills?: Skill[];
  webSkills?: Skill[];
  engineeringSkills?: Skill[];
  education?: Education[];
  certifications?: Certification[];
}

const SkillsEducationClean: React.FC<SkillsEducationProps> = ({
  emailSkills = [
    // {
    //   name: "ActiveCampaign",
    //   icon: FaEnvelope,
    //   description:
    //     "Marketing automation platform for email campaigns and lead nurturing",
    //   tags: ["Automation", "Workflows", "CRM"],
        // },
        {
            name: "HTML",
          icon: FaHtml5,
          description: "Standard markup language for creating web pages",
            tags: ["Web", "Markup", "Frontend"],
        },
        {
            name: "CSS",
            icon: FaCss3,
            description: "Style sheet language for designing web pages",
            tags: ["Design", "Styling", "Responsive"],
        },
        {
            name: "Liquid",
            icon: LuWaves,
            description: "Template language for dynamic content rendering",
            tags: ["Templates", "E-commerce", "Dynamic"],
    },
    {
      name: "HubSpot",
      icon: FaHubspot,
      description: "All-in-one marketing, sales, and service platform",
      tags: ["Marketing", "Sales", "Analytics"],
    },
    {
      name: "Mailchimp",
      icon: FaMailchimp,
      description: "Email marketing and automation service",
      tags: ["Campaigns", "Templates", "Analytics"],
    },
    {
      name: "Zapier",
      icon: FaRobot,
      description: "Workflow automation connecting apps and services",
      tags: ["Automation", "Integration", "No-code"],
    },
    {
      name: "Make",
      icon: FaProjectDiagram,
      description: "Visual platform for workflow automation",
      tags: ["Workflows", "API", "Integration"],
    },
    {
      name: "Salesforce",
      icon: FaDatabase,
      description: "Cloud-based CRM and customer success platform",
      tags: ["CRM", "Sales", "Enterprise"],
    },
    // {
    //   name: "SendGrid",
    //   icon: FaCogs,
    //   description: "Email delivery and transactional email service",
    //   tags: ["Deliverability", "API", "SMTP"],
    // },
    {
      name: "AWS SES",
      icon: FaCodeBranch,
      description: "Amazon Simple Email Service for scalable sending",
      tags: ["AWS", "Cloud", "Scalable"],
    },
    // {
    //   name: "Postmark",
    //   icon: FaSync,
    //   description: "Fast and reliable transactional email delivery",
    //   tags: ["Transactional", "API", "Delivery"],
    // },
    {
      name: "n8n",
      icon: FaPlug,
      description: "Open-source workflow automation tool",
      tags: ["Open-source", "Self-hosted", "Workflows"],
        },
        {
            name: "Figma",
            icon: FaFigma,
            description: "Collaborative interface design tool",
            tags: ["Design", "Prototyping", "Collaboration"],
        },
        {
            name: "Klaviyo",
            icon: HiFlag,
            description: "Marketing automation platform for e-commerce",
            tags: ["E-commerce", "Segmentation", "Automation"],
    },
    // {
    //   name: "Webhooks",
    //   icon: FaLink,
    //   description: "Real-time data integration between applications",
    //   tags: ["API", "Real-time", "Integration"],
    // },
    {
      name: "Analytics",
      icon: FaChartBar,
      description: "Email campaign tracking and performance metrics",
      tags: ["Metrics", "Reporting", "ROI"],
    },
  ],
  webSkills = [
    {
      name: "React",
      icon: FaReact,
      description: "JavaScript library for building user interfaces",
      tags: ["Frontend", "Components", "Hooks"],
    },
    {
      name: "Next.js",
      icon: FaCode,
      description: "React framework with SSR and static generation",
      tags: ["React", "SSR", "Full-stack"],
    },
    {
      name: "Node.js",
      icon: FaNode,
      description: "JavaScript runtime for backend development",
      tags: ["Backend", "JavaScript", "API"],
    },
    {
      name: "Python",
      icon: FaPython,
      description: "High-level programming for web and data science",
      tags: ["Backend", "Data", "ML"],
      },
      {
          name: "MySQL",
          icon: TbBrandMysql,
          description: "Popular open-source relational database",
            tags: ["SQL", "Database", "Relational"],
    },
    {
      name: "PostgreSQL",
      icon: FaDatabase,
      description: "Advanced open-source relational database",
      tags: ["SQL", "Database", "ACID"],
    },
    {
      name: "MongoDB",
      icon: FaLeaf,
      description: "NoSQL document database for modern apps",
      tags: ["NoSQL", "JSON", "Scalable"],
      },
      {
          name: "PHP",
          icon: SiPhp,
          description: "Server-side scripting language for web development",
            tags: ["Backend", "Web", "Scripting"],
      },
      {
          name: "C/C++",
          icon: SiCplusplus,
          description: "Powerful programming languages for system/software development",
            tags: ["Systems", "Performance", "Low-level"],
      },
      {
          name: "C#",
          icon: TbBrandCSharp,
          description: "Modern programming language for .NET applications",
            tags: [".NET", "Windows", "Applications"],
      },
    {
      name: "AWS",
      icon: FaAws,
      description: "Amazon Web Services cloud platform",
      tags: ["Cloud", "Infrastructure", "DevOps"],
    },
    {
      name: "Docker",
      icon: FaDocker,
      description: "Containerization platform for applications",
      tags: ["Containers", "DevOps", "Deployment"],
    },
    {
      name: "Git",
      icon: FaGit,
      description: "Distributed version control system",
      tags: ["Version Control", "Collaboration", "GitHub"],
    },
    {
      name: "Tailwind CSS",
      icon: FaWind,
      description: "Utility-first CSS framework",
      tags: ["CSS", "Responsive", "Design"],
    },
    {
      name: "TypeScript",
      icon: FaJs,
      description: "Typed superset of JavaScript",
      tags: ["JavaScript", "Types", "DX"],
    },
    {
      name: "REST APIs",
      icon: FaServer,
      description: "RESTful API design and development",
      tags: ["API", "HTTP", "Backend"],
    },
  ],
  engineeringSkills = [
    {
      name: "Microcontrollers",
      icon: FaMicrochip,
          description:"lightweight computers that run code rather than OS",
      tags: ["Arduino","ESP32","PIC","ARM"]
    },
    {
      name: "Wireless Communications",
      icon: FaWifi,
      description: "Wi-Fi and Bluetooth connectivity for devices",
      tags: ["IoT", "Wireless", "Low-power"],
    },
    {
      name: "MatLab",
      icon: FaChartLine,
      description: "Numerical computing and simulation software",
      tags: ["Simulation", "Modeling", "Data Analysis","Simulink"],
    },
    {
      name: "MQTT",
      icon: FaNetworkWired,
      description: "Lightweight messaging protocol for IoT",
      tags: ["IoT", "Messaging", "Pub/Sub"],
    },
    {
      name: "Circuit Design",
      icon: FaBolt,
      description: "Electronic circuit design and analysis",
      tags: ["Hardware", "PCB", "Analog","AC","DC"],
    },
    {
      name: "CAD",
      icon: FaCube,
      description: "Computer-aided design for mechanical parts",
      tags: ["3D Modeling", "Design", "Manufacturing","Fusion 360"],
    },
    // {
    //   name: "TensorFlow",
    //   icon: FaBrain,
    //   description: "Machine learning and deep learning framework",
    //   tags: ["ML", "Neural Networks", "AI"],
    // },
    // {
    //   name: "OpenCV",
    //   icon: FaEye,
    //   description: "Computer vision and image processing library",
    //   tags: ["Vision", "Image Processing", "ML"],
    // },
    {
      name: "PID Control",
      icon: FaCogs,
      description: "Proportional-Integral-Derivative control systems",
      tags: ["Control", "Automation", "Feedback"],
    },
    // {
    //   name: "LoRa",
    //   icon: FaSignal,
    //   description: "Long-range, low-power wireless communication",
    //   tags: ["Wireless", "IoT", "Long-range"],
    // },
    // {
    //   name: "BLE",
    //   icon: FaBroadcastTower,
    //   description: "Bluetooth Low Energy for wireless devices",
    //   tags: ["Bluetooth", "Wireless", "Low-power"],
    // },
    {
      name: "Embedded C",
      icon: FaToolbox,
      description: "C programming for embedded systems",
      tags: ["Programming", "Low-level", "Firmware"],
      },
      {
          name: "VHDL/Verifilog",
          icon: FaBrain,
          description: "Hardware description languages for FPGA/ASIC design",
            tags: ["FPGA", "ASIC", "Digital Design"],
      },
      {
          name: "PLC",
          icon: FaCodeBranch,
          description: "Programmable Logic Controllers for industrial automation",
            tags: ["Siemens", "LadderLogic", "Control"],
      }
  ],
  education = [
    {
      degree: "Bachelor of Science in Electrical Engineering",
      institution: "Florida International University",
      period: "Graduated",
      description:
        "Focused on Computer Engineering and Electrical Engineering with emphasis on embedded systems, automation, and software development. Honor Roll and Dean's List multiple semesters.",
      tags: ["Computer Engineering", "Electrical Engineering", "GPA: 3.4/4.0"],
    },
  ],
  certifications = [
    {
      title: "AWS Certified",
      issuer: "Amazon Web Services",
      year: "2022",
      icon: FaAws,
      gradient: "from-blue-500 to-cyan-500",
    },
    // {
    //   title: "HubSpot Email Marketing",
    //   issuer: "HubSpot Academy",
    //   year: "2023",
    //   icon: FaCertificate,
    //   gradient: "from-green-500 to-emerald-500",
    // },
    // {
    //   title: "Advanced React & Next.js",
    //   issuer: "Frontend Masters",
    //   year: "2022",
    //   icon: FaReact,
    //   gradient: "from-purple-500 to-pink-500",
    // },
    // {
    //   title: "Embedded Systems Specialist",
    //   issuer: "Professional Development",
    //   year: "2021",
    //   icon: FaRobot,
    //   gradient: "from-orange-500 to-red-500",
    // },
  ],
}) => {
  const [activeTab, setActiveTab] = useState<
    "email" | "web" | "engineering" | "education"
  >("email");
  const particlesRef = useRef<HTMLDivElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Particle system
  useEffect(() => {
    if (!particlesRef.current) return;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className = "absolute w-1 h-1 rounded-full opacity-30";

      const startX = Math.random() * 100;
      const startY = Math.random() * 100;
      particle.style.left = `${startX}%`;
      particle.style.top = `${startY}%`;

      const colors = ["#9333ea", "#db2777", "#3b82f6", "#8b5cf6", "#ec4899"];
      particle.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];

      particlesRef.current?.appendChild(particle);

      const duration = 15000 + Math.random() * 15000;
      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random() * 200;

      const endX = startX + Math.cos(angle) * distance;
      const endY = startY + Math.sin(angle) * distance;

      particle.animate(
        [
          { left: `${startX}%`, top: `${startY}%`, opacity: 0.3 },
          { left: `${endX}%`, top: `${endY}%`, opacity: 0 },
        ],
        {
          duration,
          easing: "ease-in-out",
        }
      ).onfinish = () => {
        particle.remove();
        createParticle();
      };
    };

    for (let i = 0; i < 20; i++) {
      setTimeout(() => createParticle(), i * 200);
    }
  }, []);

  // Force re-render with animation when tab changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [activeTab]);

  const renderSkillIcon = (skill: Skill, index: number) => {
    const Icon = skill.icon;

    return (
      <div
        key={`${skill.name}-${animationKey}`}
        className="skill-icon-item relative flex flex-col items-center gap-3 cursor-pointer group"
        style={{
          animation: `fadeInUp 0.8s ease-out forwards`,
          animationDelay: `${index * 0.05}s`,
          opacity: 0,
        }}
      >
        {/* Icon Circle */}
        <div className="w-[70px] h-[70px] bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
          <Icon size={28} className="flex-shrink-0" />
        </div>

        {/* Skill Name */}
        <span className="text-sm font-medium text-gray-900 dark:text-white text-center">
          {skill.name}
        </span>

        {/* Hover Popover */}
        <div className="skill-popover absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 z-10">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800"></div>

          <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Icon size={18} />
            {skill.name}
          </h4>

          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            {skill.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {skill.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const getSkillsForTab = () => {
    switch (activeTab) {
      case "email":
        return emailSkills;
      case "web":
        return webSkills;
      case "engineering":
        return engineeringSkills;
      default:
        return [];
    }
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen bg-white dark:bg-gray-900 py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/10 dark:to-gray-900"></div>

      {/* Particles Container */}
      <div ref={particlesRef} className="absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl sm:text-5xl font-bold font-space-grotesk text-gray-900 dark:text-white mb-4">
            Skills &{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Education
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Multi-disciplinary expertise across Email Automation, Web
            Development, and Engineering domains
          </p>
        </div>

        {/* Tabbed Menu */}
        <div
          className="mb-12 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              onClick={() => setActiveTab("email")}
              className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all gap-2 duration-300 ${
                activeTab === "email"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-400"
              }`}
            >
              <FaEnvelopeOpenText size={20} />
              <span>Email Automation</span>
            </button>
            <button
              onClick={() => setActiveTab("web")}
              className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 gap-2 ${
                activeTab === "web"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-400"
              }`}
            >
              <FaCode size={20} />
              <span>Web Development</span>
            </button>
            <button
              onClick={() => setActiveTab("engineering")}
              className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 gap-2 ${
                activeTab === "engineering"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-400"
              }`}
            >
              <FaMicrochip size={20} />
              <span>Engineering</span>
            </button>
            <button
              onClick={() => setActiveTab("education")}
              className={`inline-flex items-center px-8 py-4 rounded-2xl font-semibold transition-all duration-300 gap-2 ${
                activeTab === "education"
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 dark:hover:border-purple-400"
              }`}
            >
              <FaGraduationCap size={20} />
              <span>Education</span>
            </button>
          </div>
        </div>

        {/* Tab Content - Skills Grid */}
        {activeTab !== "education" && (
          <div
            key={animationKey}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 max-w-5xl mx-auto"
          >
            {getSkillsForTab().map((skill, index) =>
              renderSkillIcon(skill, index)
            )}
          </div>
        )}

        {/* Education Tab */}
        {activeTab === "education" && (
          <div className="max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <div
                key={index}
                className="mb-8 p-8 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-3xl transition-all duration-400 hover:border-purple-600 dark:hover:border-purple-400 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in-up"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white">
                      <FaGraduationCap size={48} />
                    </div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-wrap items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {edu.degree}
                      </h3>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-xl text-purple-600 dark:text-purple-400 font-semibold mb-3">
                      {edu.institution}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {edu.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-700 dark:text-purple-300 rounded-xl text-sm font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Certifications */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Certifications &{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Training
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, index) => {
                  const IconComponent = cert.icon;
                  return (
                    <div
                      key={index}
                      className="p-6 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-2xl transition-all duration-300 hover:border-purple-600 dark:hover:border-purple-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/15"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${cert.gradient} rounded-xl flex items-center justify-center text-white`}
                        >
                          <IconComponent size={32} />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                            {cert.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {cert.issuer} • {cert.year}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .font-space-grotesk {
          font-family: "Space Grotesk", sans-serif;
        }
      `}</style>
    </section>
  );
};

export default SkillsEducationClean;
