import Image from "next/image";
import Header from "@/components/Header";
import { Metadata } from "next";
// import { HeroSection } from "@/components/sections/HeroSection";
import  HeroSection  from "@/components/sections/Hero2Section";
import { AboutSection } from "@/components/sections/AboutSection";
// import { ProjectsSection } from "@/components/sections/ProjectSection";
// import { BlogSection } from "@/components/sections/BlogSection";
import { BlogSection } from "@/components/sections/BlogSectionNew";
import { ContactSection } from "@/components/sections/ContactSection";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { preloadHomepageData } from "@/data/sanity-data";
// import '@/public/assets/css/styles.css'
import SkillsEducationSection  from "@/components/sections/Skills2Section";
import SkillsEducation from "@/components/sections/SkillsEducation";
import { ThemeTest } from "@/components/test/ThemeTest";
import { ProjectsSection } from "@/components/sections/ProjectSectionNew";

export const metadata: Metadata = {
  title: "Chris Norton Jr - The Engineer",
  description:
    "Build systems that scale. Results with precision. Strategic systems designing scalable tools, automations, and products for businesses.",
};
export const revalidate = 3600;
export default async function Home() {
  const { featuredPosts, projects } = await preloadHomepageData();

  return (
    <div className="">
      {/* <Navigation /> */}
      {/* <Header title="Welcome to my blog" /> */}
      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <HeroSection />
        {/* <SkillsEducation /> */}
          <SkillsEducationSection />
        {/* About Section */}
        {/* <AboutSection /> */}

        {/* Projects Showcase - Pass preloaded data */}
        {/* <ProjectsSection initialProjects={projects} /> */}
        <ProjectsSection  />

        {/* Blog Insights - Pass preloaded data */}
        {/* <BlogSection initialPosts={featuredPosts} /> */}
        <BlogSection />

        {/* Contact */}
        {/* <ContactSection /> */}
      </main>
      {/* <Footer /> */}

      {/* <h1 className="text-4xl">Welcome</h1>
      <Button variant={"destructive"}>Testing</Button> */}
    </div>
  );
}
