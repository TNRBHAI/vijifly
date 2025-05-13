"use client"

import React, { createContext, useContext, useState } from "react"

export interface Post {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  commentCount: number
  category: string
  comments: Array<{
    id: number
    author: string
    content: string
    date: string
  }>
}

interface PostContextType {
  posts: Post[]
  addPost: (post: Omit<Post, "id" | "date" | "commentCount" | "comments">) => void
  deletePost: (postId: number) => void
}

const PostContext = createContext<PostContextType | undefined>(undefined)

export function PostProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "Getting Started with Web Development",
      excerpt: "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journey.",
      content: "Web development is an exciting field that combines creativity with technical skills. In this comprehensive guide, we'll explore the fundamental building blocks of web development: HTML, CSS, and JavaScript.",
      date: "March 20, 2025",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      commentCount: 12,
      category: "Web Development",
      comments: [
        { id: 1, author: "John Doe", content: "Great article! Very helpful for beginners.", date: "March 21, 2025" },
        { id: 2, author: "Jane Smith", content: "I learned a lot from this. Thanks!", date: "March 22, 2025" }
      ]
    },
    {
      id: 2,
      title: "The Future of Artificial Intelligence",
      excerpt: "Exploring the potential impact of AI on various industries and our daily lives.",
      content: "Artificial Intelligence is revolutionizing how we live and work. From healthcare to transportation, AI is making significant strides in improving efficiency and creating new possibilities.",
      date: "March 25, 2025",
      author: {
        name: "Samantha Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SL",
      },
      commentCount: 8,
      category: "Technology",
      comments: [
        { id: 1, author: "Mike Brown", content: "Fascinating insights about AI!", date: "March 26, 2025" }
      ]
    },
    {
      id: 3,
      title: "Responsive Design Best Practices",
      excerpt: "Tips and tricks for creating websites that look great on all devices.",
      content: "Responsive design is crucial in today's multi-device world. Learn how to create flexible layouts that adapt to different screen sizes and provide optimal user experience.",
      date: "March 30, 2025",
      author: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MC",
      },
      commentCount: 5,
      category: "Design",
      comments: []
    },
    {
      id: 4,
      title: "Introduction to React Hooks",
      excerpt: "Learn how to use React Hooks to simplify your functional components.",
      content: "React Hooks have revolutionized how we write React components. This guide will help you understand and implement hooks effectively in your applications.",
      date: "April 2, 2025",
      author: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ER",
      },
      commentCount: 7,
      category: "React",
      comments: []
    },
    {
      id: 5,
      title: "Building RESTful APIs with Node.js",
      excerpt: "A comprehensive guide to creating robust RESTful APIs using Node.js and Express.",
      content: "Learn how to build scalable and maintainable RESTful APIs using Node.js and Express. This guide covers best practices and common patterns.",
      date: "April 8, 2025",
      author: {
        name: "David Kim",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "DK",
      },
      commentCount: 10,
      category: "Backend",
      comments: []
    },
    {
      id: 6,
      title: "CSS Grid vs Flexbox",
      excerpt: "Understanding when to use CSS Grid and when to use Flexbox for your layouts.",
      content: "CSS Grid and Flexbox are powerful layout tools, but they serve different purposes. Learn when and how to use each one effectively.",
      date: "April 14, 2025",
      author: {
        name: "Sarah Thompson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ST",
      },
      commentCount: 6,
      category: "CSS",
      comments: []
    }
  ])

  const addPost = (post: Omit<Post, "id" | "date" | "commentCount" | "comments">) => {
    console.log('Adding new post:', post)
    const newPost: Post = {
      ...post,
      id: posts.length + 1,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      commentCount: 0,
      comments: []
    }
    const newPosts = [...posts, newPost]
    setPosts(newPosts)
    console.log('Updated posts array:', newPosts)
  }

  const deletePost = (postId: number) => {
    console.log('Deleting post:', postId)
    const newPosts = posts.filter(post => post.id !== postId)
    setPosts(newPosts)
    console.log('Updated posts array after deletion:', newPosts)
  }

  return (
    <PostContext.Provider value={{ posts, addPost, deletePost }}>
      {children}
    </PostContext.Provider>
  )
}

export function usePosts() {
  const context = useContext(PostContext)
  if (context === undefined) {
    throw new Error("usePosts must be used within a PostProvider")
  }
  return context
}
