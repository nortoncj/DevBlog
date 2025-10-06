"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import {
  Mail,
  Linkedin,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
  MapPin,
  Phone,
  Globe,
} from "lucide-react";
import { ContactFormData } from "@/types";
import { cn, isValidEmail } from "@/lib/utils";

const containerVariants : Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants : Variants= {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "chris@systemarchitect.dev",
    href: "mailto:chris@systemarchitect.dev",
    description: "Direct line for project inquiries",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/christopher-norton",
    href: "https://linkedin.com/in/christopher-norton",
    description: "Professional network and updates",
  },
  {
    icon: Calendar,
    label: "Schedule Call",
    value: "Strategic Consultation",
    href: "https://calendly.com/christopher-norton",
    description: "30-min strategic discussion",
  },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual implementation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", data);
      setSubmitStatus("success");
      reset();

      // Reset status after 5 seconds
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus("idle"), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="section-padding bg-bg-primary dark:bg-gray-900"
      ref={ref}
    >
      <div className="container-strategic">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title text-text-primary dark:text-white">
              <span className="dark:text-white">Ready to </span> <span className="text-gradient-hero">Build?</span>
            </h2>
            <p className="section-subtitle text-text-secondary dark:text-gray-300">
              Let's architect a system that scales your business
            </p>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary dark:text-white mb-4">
                  Start Strategic Consultation
                </h3>
                <p className="text-lg text-text-secondary dark:text-gray-300 leading-relaxed mb-6">
                  Every great system starts with understanding your unique
                  challenges. Let's discuss how strategic architecture can
                  transform your business processes.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <motion.a
                      key={method.label}
                      href={method.href}
                      target={
                        method.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        method.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="bg-card dark:bg-gray-800 border border-border dark:border-gray-600 rounded-xl p-6 shadow-card dark:shadow-xl dark:shadow-pink-500/10 flex items-center gap-4 hover:shadow-card-hover dark:hover:shadow-pink-500/20 group transition-all duration-300"
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-text-primary dark:text-white group-hover:text-signature-burgundy dark:group-hover:text-pink-400 transition-colors">
                          {method.label}
                        </div>
                        <div className="text-sm text-signature-burgundy dark:text-pink-400 font-medium">
                          {method.value}
                        </div>
                        <div className="text-xs text-text-muted dark:text-gray-400">
                          {method.description}
                        </div>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Additional Info */}
              {/* <motion.div
                variants={itemVariants}
                className="bg-gradient-card dark:bg-gray-800 border-2 border-rose-gold dark:border-pink-400/50 rounded-lg p-6 relative overflow-hidden"
              >
                <h4 className="font-semibold text-text-primary dark:text-white mb-3">
                  <span className="dark:text-black">What to Expect</span> 
                </h4>
                <ul className="space-y-2 text-sm text-text-secondary dark:text-gray-800">
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-signature-burgundy dark:text-pink-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Initial consultation within 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-signature-burgundy dark:text-pink-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Strategic roadmap and architecture proposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-signature-burgundy dark:text-pink-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Clear timeline and project milestones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-signature-burgundy dark:text-pink-400 mt-0.5 flex-shrink-0"
                    />
                    <span>Ongoing support and optimization</span>
                  </li>
                </ul>
              </motion.div> */}
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-card dark:bg-gray-800 border border-border dark:border-gray-600 rounded-xl p-6 shadow-card dark:shadow-xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-text-primary dark:text-white mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        id="name"
                        className={cn(
                          "w-full px-4 py-3 border-2 rounded-lg bg-bg-primary dark:bg-gray-900 border-bg-accent dark:border-gray-600 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-gray-400 focus:border-primary dark:focus:border-pink-400 focus:outline-none transition-colors",
                          errors.name &&
                            "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                        )}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-text-primary dark:text-white mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        {...register("email", {
                          required: "Email is required",
                          validate: (value) =>
                            isValidEmail(value) || "Please enter a valid email",
                        })}
                        type="email"
                        id="email"
                        className={cn(
                          "w-full px-4 py-3 border-2 rounded-lg bg-bg-primary dark:bg-gray-900 border-bg-accent dark:border-gray-600 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-gray-400 focus:border-primary dark:focus:border-pink-400 focus:outline-none transition-colors",
                          errors.email &&
                            "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                        )}
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company Field */}
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-text-primary dark:text-white mb-2"
                    >
                      Company (Optional)
                    </label>
                    <input
                      {...register("company")}
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 border-2 rounded-lg bg-bg-primary dark:bg-gray-900 border-bg-accent dark:border-gray-600 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-gray-400 focus:border-primary dark:focus:border-pink-400 focus:outline-none transition-colors"
                      placeholder="Your Company Name"
                    />
                  </div>

                  {/* Project Type Field */}
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-text-primary dark:text-white mb-2"
                    >
                      Project Type
                    </label>
                    <select
                      {...register("projectType", {
                        required: "Please select a project type",
                      })}
                      id="projectType"
                      className={cn(
                        "w-full px-4 py-3 border-2 rounded-lg bg-bg-primary dark:bg-gray-900 border-bg-accent dark:border-gray-600 text-text-primary dark:text-white focus:border-primary dark:focus:border-pink-400 focus:outline-none transition-colors",
                        errors.projectType &&
                          "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                      )}
                    >
                      <option value="">Select Project Type</option>
                      <option value="automation">Process Automation</option>
                      <option value="web-app">Web Application</option>
                      <option value="integration">System Integration</option>
                      <option value="consulting">Strategic Consulting</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.projectType && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.projectType.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-text-primary dark:text-white mb-2"
                    >
                      Project Description
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Please describe your project",
                      })}
                      id="message"
                      rows={5}
                      className={cn(
                        "w-full px-4 py-3 border-2 rounded-lg bg-bg-primary dark:bg-gray-900 border-bg-accent dark:border-gray-600 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-gray-400 focus:border-primary dark:focus:border-pink-400 focus:outline-none transition-colors resize-none min-h-[120px]",
                        errors.message &&
                          "border-red-500 focus:border-red-500 dark:border-red-400 dark:focus:border-red-400"
                      )}
                      placeholder="Describe your system requirements, challenges, and goals..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Newsletter Opt-in */}
                  <div className="flex items-start gap-3">
                    <input
                      {...register("newsletter")}
                      type="checkbox"
                      id="newsletter"
                      className="mt-1 h-4 w-4 text-signature-burgundy dark:text-pink-400 focus:ring-signature-burgundy dark:focus:ring-pink-400 border-bg-accent dark:border-gray-600 bg-bg-primary dark:bg-gray-900 rounded"
                    />
                    <label
                      htmlFor="newsletter"
                      className="text-sm text-text-secondary dark:text-gray-300"
                    >
                      Subscribe to strategic insights and system architecture
                      updates
                    </label>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={cn(
                      "w-full btn-primary flex items-center justify-center gap-2",
                      isSubmitting && "opacity-50 cursor-not-allowed",
                      submitStatus === "success" &&
                        "bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600",
                      submitStatus === "error" &&
                        "bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                    )}
                    whileTap={!isSubmitting ? { scale: 0.98 } : undefined}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending Message...
                      </>
                    ) : submitStatus === "success" ? (
                      <>
                        <CheckCircle size={20} />
                        Message Sent Successfully!
                      </>
                    ) : submitStatus === "error" ? (
                      <>
                        <AlertCircle size={20} />
                        Failed to Send - Try Again
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Start System Design
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
