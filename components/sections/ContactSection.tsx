"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useForm } from "react-hook-form";
import {
  Mail,
  Calendar,
  Send,
  CheckCircle,
  AlertCircle,
  Copy,
  ExternalLink,
} from "lucide-react";
import { ContactFormData } from "@/types";
import { cn, isValidEmail } from "@/lib/utils";
import { BsLinkedin, BsTwitterX, BsYoutube } from "react-icons/bs";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
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

// Obfuscated email parts - makes it harder for bots to harvest
const emailParts = {
  user: "contact",
  domain: "chrisnortonjr",
  tld: "com",
};

const getEmailAddress = () =>
  `${emailParts.user}@${emailParts.domain}.${emailParts.tld}`;

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "Click to reveal email",
    description: "Direct line for project inquiries",
    action: "email",
  },
  {
    icon: BsLinkedin,
    label: "LinkedIn",
    value: "/in/chrisnortonjr",
    href: "https://linkedin.com/in/chrisnortonjr",
    description: "Professional network and updates",
  },
  {
    icon: BsTwitterX,
    label: "Twitter",
    value: "@TheWebTechNinja",
    href: "https://x.com/TheWebTechNinja",
    description: "Find me on Twitter",
  },
  {
    icon: BsYoutube,
    label: "YouTube",
    value: "@chrisnortonjr",
    href: "https://www.youtube.com/@chrisnortonjr",
    description: "Find me on YouTube",
  },
  // {
  //   icon: Calendar,
  //   label: "Schedule Call",
  //   value: "Strategic Consultation",
  //   href: "https://calendly.com/christopher-norton",
  //   description: "30-min strategic discussion",
  // },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [emailRevealed, setEmailRevealed] = useState(false);
  const [showCopySuccess, setShowCopySuccess] = useState(false);

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

  const handleEmailReveal = async () => {
    if (!emailRevealed) {
      setEmailRevealed(true);
    } else {
      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(getEmailAddress());
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = getEmailAddress();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
      }
    }
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${getEmailAddress()}`;
  };

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
            <h2 className="section-title text-foreground">
              <span className="dark:text-white">Ready to </span>
              <span className="text-gradient-hero">Build?</span>
            </h2>
            <p className="section-subtitle text-muted-foreground">
              Let's architect a system that scales your business
            </p>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Start Strategic Consultation
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  Every great system starts with understanding your unique
                  challenges. Let's discuss how strategic architecture can
                  transform your business processes.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                {contactMethods.map((method) => {
                  const Icon = method.icon;
                  const isEmailMethod = method.action === "email";

                  return (
                    <motion.div
                      key={method.label}
                      className="bg-card dark:bg-gray-800 border border-border dark:border-gray-600 rounded-xl p-6 shadow-card dark:shadow-xl dark:shadow-pink-500/10 hover:shadow-card-hover dark:hover:shadow-pink-500/20 group transition-all duration-300"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                          <Icon size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="font-semibold text-foreground group-hover:text-signature-burgundy dark:group-hover:text-pink-400 transition-colors">
                            {method.label}
                          </div>
                          <div className="text-sm text-signature-burgundy dark:text-pink-400 font-medium">
                            {isEmailMethod && emailRevealed
                              ? getEmailAddress()
                              : method.value}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {method.description}
                          </div>
                        </div>
                      </div>

                      {/* Action buttons for email */}
                      {isEmailMethod && (
                        <div className="mt-4 flex gap-2">
                          <button
                            onClick={handleEmailReveal}
                            className="flex items-center gap-2 px-3 py-2 text-sm bg-signature-burgundy dark:bg-pink-400 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
                          >
                            {emailRevealed ? (
                              <>
                                <Copy size={16} />
                                {showCopySuccess ? "Copied!" : "Copy Email"}
                              </>
                            ) : (
                              "Reveal Email"
                            )}
                          </button>
                          {emailRevealed && (
                            <button
                              onClick={handleEmailClick}
                              className="flex items-center gap-2 px-3 py-2 text-sm border border-signature-burgundy dark:border-pink-400 text-signature-burgundy dark:text-pink-400 rounded-lg hover:bg-signature-burgundy/10 dark:hover:bg-pink-400/10 transition-colors"
                            >
                              <ExternalLink size={16} />
                              Open Mail App
                            </button>
                          )}
                        </div>
                      )}

                      {/* Direct links for non-email methods */}
                      {!isEmailMethod && method.href && (
                        <div className="mt-4">
                          <a
                            href={method.href}
                            target={
                              method.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              method.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-signature-burgundy dark:bg-pink-400 text-white dark:text-gray-900 rounded-lg hover:opacity-90 transition-opacity"
                          >
                            <ExternalLink size={16} />
                            Connect
                          </a>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
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
                        className="block text-sm font-medium text-foreground mb-2 dark:text-white"
                      >
                        Your Name
                      </label>
                      <input
                        {...register("name", { required: "Name is required" })}
                        type="text"
                        id="name"
                        className={cn(
                          "w-full px-4 py-3 border-2 rounded-lg bg-background  border-border dark:border-gray-600 text-foreground placeholder-muted-foreground focus:border-[#8B1538] dark:focus:border-[#E8B4B8] focus:outline-none transition-colors",
                          errors.name && "border-red-500 focus:border-red-500"
                        )}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-foreground mb-2 dark:text-white"
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
                          "w-full px-4 py-3 border-2 rounded-lg bg-background  border-border dark:border-gray-600 text-foreground placeholder-muted-foreground focus:border-[#8B1538] dark:focus:border-[#E8B4B8] focus:outline-none transition-colors",
                          errors.email && "border-red-500 focus:border-red-500"
                        )}
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
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
                      className="block text-sm font-medium text-foreground mb-2 dark:text-white"
                    >
                      Company (Optional)
                    </label>
                    <input
                      {...register("company")}
                      type="text"
                      id="company"
                      className="w-full px-4 py-3 border-2 rounded-lg bg-background  border-border dark:border-gray-600 text-foreground placeholder-muted-foreground focus:border-[#8B1538] dark:focus:border-[#E8B4B8] focus:outline-none transition-colors"
                      placeholder="Your Company Name"
                    />
                  </div>

                  {/* Project Type Field */}
                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-sm font-medium text-foreground mb-2 dark:text-white"
                    >
                      Project Type
                    </label>
                    <select
                      {...register("projectType", {
                        required: "Please select a project type",
                      })}
                      id="projectType"
                      className={cn(
                        "w-full px-4 py-3 border-2 rounded-lg bg-background  border-border dark:border-gray-600 text-foreground focus:border-[#8B1538] dark:focus:border-[#E8B4B8] focus:outline-none transition-colors",
                        errors.projectType &&
                          "border-red-500 focus:border-red-500"
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
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.projectType.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground mb-2 dark:text-white"
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
                        "w-full px-4 py-3 border-2 rounded-lg bg-background  border-border dark:border-gray-600 text-foreground placeholder-muted-foreground focus:border-[#8B1538] dark:focus:border-[#E8B4B8] focus:outline-none transition-colors resize-none min-h-[120px]",
                        errors.message && "border-red-500 focus:border-red-500"
                      )}
                      placeholder="Describe your system requirements, challenges, and goals..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
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
                      className="mt-1 h-4 w-4 text-[#8B1538] dark:text-[#eacdcf] focus:ring-[#8B1538] dark:focus:ring-[#E8B4B8] border-border dark:border-gray-600 bg-background dark:bg-gray-900 rounded"
                    />
                    <label
                      htmlFor="newsletter"
                      className="text-sm text-muted-foreground"
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
                              {/* Send Message */}
                              Coming Soon
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
