"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Globe, Mail, Cpu, Cloud, ArrowRight } from "lucide-react";
import Image from "next/image";
import img from "@/public/assets/img/chrisNorton1.png";

// Simple skills overview for visitors
const skills = [
  {
    title: "Full-Stack Web Development",
    description:
      "I build complete websites and web applications that work perfectly on all devices and load fast.",
    icon: Globe,
    visual:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop&crop=center",
    benefits: [
      "Custom websites that fit your needs",
      "Mobile-friendly and fast loading",
      "Easy to update and maintain",
    ],
  },
  {
    title: "Email Marketing Automation",
    description:
      "I create smart email systems that automatically send the right messages to grow your business.",
    icon: Mail,
    visual:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=500&h=300&fit=crop&crop=center",
    benefits: [
      "Automated customer journeys",
      "Targeted campaigns that convert",
      "Save time on manual emails",
    ],
  },
  {
    title: "Embedded Systems & IoT",
    description:
      "I make everyday devices smart by connecting them to the internet for remote control and monitoring.",
    icon: Cpu,
    visual:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500&h=300&fit=crop&crop=center",
    benefits: [
      "Smart automation systems",
      "Remote device monitoring",
      "Custom hardware solutions",
    ],
  },
  {
    title: "DevOps & Cloud Infrastructure",
    description:
      "I set up reliable systems that keep your applications running smoothly without you worrying about technical issues.",
    icon: Cloud,
    visual:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop&crop=center",
    benefits: [
      "Reliable uptime and performance",
      "Automatic backups and security",
      "Scales as your business grows",
    ],
  },
];

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section
      id="about"
      className="section-padding bg-bg-secondary dark:bg-gray-800"
      ref={ref}
    >
      <div className="container-strategic">
        <div className="space-y-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-header text-center"
          >
            <h2 className="section-title text-text-primary dark:text-white">
              <span className="dark:text-white">The System </span>
              <span className="text-gradient-hero">Architect</span>
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto text-text-secondary dark:text-gray-300">
              <span className="dark:text-gray-300">I design and build digital solutions that work while you focus on
              growing your business.</span>
              
            </p>
          </motion.div>

          {/* Skills Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-12"
          >
            <h3 className="text-2xl font-bold text-text-primary dark:text-white text-center mb-12">
              What I Do
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <motion.div
                    key={skill.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-card dark:bg-gray-900 border border-border dark:border-gray-600 rounded-xl p-6 shadow-card dark:shadow-xl dark:shadow-pink-500/10 group hover:shadow-card-hover dark:hover:shadow-pink-500/20 transition-all duration-300"
                  >
                    {/* Visual Header */}
                    <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                      <Image
                        src={skill.visual}
                        alt={skill.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-signature-burgundy/20 to-deep-magenta/20 dark:from-pink-500/30 dark:to-purple-500/30" />
                      <div className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm flex items-center justify-center border dark:border-gray-600">
                        <Icon className="w-6 h-6 text-signature-burgundy dark:text-pink-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h4 className="text-xl font-bold text-text-primary dark:text-white group-hover:text-signature-burgundy dark:group-hover:text-pink-400 transition-colors">
                        {skill.title}
                      </h4>

                      <p className="text-text-secondary dark:text-gray-300 leading-relaxed">
                        {skill.description}
                      </p>

                      {/* Benefits */}
                      <div className="space-y-2">
                        <ul className="space-y-2">
                          {skill.benefits.map((benefit, benefitIndex) => (
                            <li
                              key={benefitIndex}
                              className="flex items-start gap-2 text-sm text-text-secondary dark:text-gray-400"
                            >
                              <ArrowRight className="w-4 h-4 text-signature-burgundy dark:text-pink-400 flex-shrink-0 mt-0.5" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Strategic Approach */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <h3 className="text-2xl font-semibold text-text-primary dark:text-white mb-8 text-center">
              Strategic Approach
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-signature-burgundy dark:bg-pink-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-text-primary dark:text-white mb-2">
                      Systems Over Hustle
                    </h4>
                    <p className="text-sm text-text-secondary dark:text-gray-300">
                      Build once, scale forever. Focus on systematic solutions
                      rather than constant manual effort.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-deep-magenta dark:bg-purple-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-text-primary dark:text-white mb-2">
                      Precision Architecture
                    </h4>
                    <p className="text-sm text-text-secondary dark:text-gray-300">
                      Every component serves a purpose. No over-engineering, no
                      technical debt.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-soft-purple dark:bg-indigo-500 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-text-primary dark:text-white mb-2">
                      Business Alignment
                    </h4>
                    <p className="text-sm text-text-secondary dark:text-gray-300">
                      Technical decisions driven by measurable business outcomes
                      and ROI.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-rose-gold dark:bg-rose-400 flex-shrink-0 mt-1" />

                  <div>
                    <h4 className="font-medium text-text-primary dark:text-white mb-2">
                      Scalable Execution
                    </h4>
                    <p className="text-sm text-text-secondary dark:text-gray-300">
                      Solutions designed to grow with your business without
                      breaking.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center bg-bg-primary dark:bg-gray-900 border border-bg-accent dark:border-gray-600 rounded-2xl p-8 lg:p-12 shadow-card dark:shadow-xl"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-white mb-4">
              Ready to Build Systems That Scale?
            </h3>
            <p className="text-lg text-text-secondary dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's architect a solution that grows with your business.
              Strategic consultation starts with understanding your unique
              challenges.
            </p>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-primary"
            >
              Start Strategic Discussion
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
