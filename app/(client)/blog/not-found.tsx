
import Header from '@/components/Header'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
      <div className='flex flex-col items-center justify-center min-h-screen px-4 text-center bg-bg-primary dark:bg-gray-950 transition-colors duration-300'
      >
          
    <h1 className="text-3xl font-bold text-center mt-10 dark:text-white">404 - Post Not Found</h1>
    <p className="text-center mt-4 text-text-secondary dark:text-gray-300">
      The blog post you are looking for does not exist.
          </p>
          <Link href="/blog" className="mt-6 inline-block text-signature-burgundy dark:text-rose-gold hover:underline">
      Back to Blog
    </Link>
    </div>
  )
}

export default NotFound