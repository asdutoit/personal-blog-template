import Image from "next/image";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { FeaturedPosts } from "./components/sections/FeaturedPosts";
import { Contact } from "./components/sections/Contact";
import { getFeaturedPosts } from "@/lib/blog";

export default async function Home() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="space-y-0">
      <Hero />
      <About />
      <Skills />
      <FeaturedPosts posts={featuredPosts} />
      <Contact />
    </div>
  );
}
