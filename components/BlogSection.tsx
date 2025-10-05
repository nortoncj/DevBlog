import React from 'react'
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { client } from "@/sanity/lib/client";

async function getPosts() {
  const query = `
  *[_type == "post"] {
  title,
  slug,
  publishedAt,
  excerpt,
}
  `
  const data = await client.fetch(query);
  return data;
}

const BlogSection = async () => {
    const posts: Post:[] = await getPosts();
  console.log(posts, 'posts')
    return (
      <div className="">
        {posts?.length > 0 &&
          posts?.map((post) => (
            <div
              key={post._id}
              className="border-b border-gray-300 dark:border-gray-700 py-6 px-4"
            >
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              <p className="text-gray-800 dark:text-gray-200 mb-4">
                {post.excerpt}
              </p>
              <Button variant={"link"} href={`/post/${post.slug.current}`}>
                Read More
              </Button>
            </div>
          ))}
      </div>
    );
}

export default BlogSection