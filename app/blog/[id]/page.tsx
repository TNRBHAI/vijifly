"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MessageSquare, ArrowLeft } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { CommentSection } from "@/components/CommentSection"
import { usePosts } from "@/contexts/PostContext"

// Mock data - in a real app, this would come from an API
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    content: `Web development is an exciting field that combines creativity with technical skills. In this comprehensive guide, we'll explore the fundamental building blocks of web development: HTML, CSS, and JavaScript.

HTML (HyperText Markup Language) is the backbone of every website. It provides the structure and content of web pages. CSS (Cascading Style Sheets) is responsible for the visual presentation, making websites beautiful and responsive. JavaScript adds interactivity and dynamic features to web pages.

Getting started with web development might seem overwhelming, but with the right approach and resources, anyone can learn these essential skills. Here are some key points to consider:

1. Start with HTML basics
2. Learn CSS fundamentals
3. Master JavaScript essentials
4. Practice with real projects
5. Build a portfolio

Remember, the best way to learn is by doing. Start with simple projects and gradually increase their complexity as you become more comfortable with the technologies.`,
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
  // Add other blog posts here...
]

export default function BlogPost() {
  const params = useParams()
  const { posts } = usePosts()
  const postId = parseInt(params.id as string)
  const post = posts.find(p => p.id === postId)
  const [comments, setComments] = useState(post?.comments || [])

  if (!post) {
    return (
      <div className="container px-4 md:px-6 py-12">
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold">Post not found</h1>
            <p className="mt-2 text-gray-500">The blog post you're looking for doesn't exist.</p>
            <Button asChild className="mt-4">
              <Link href="/blog">Back to Blog</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleAddComment = (postId: number, newComment: { author: string; content: string; date: string }) => {
    const comment = {
      id: comments.length + 1,
      ...newComment
    }
    setComments([...comments, comment])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 bg-gradient-to-r from-purple-500 to-purple-700 text-white">
        <div className="container px-4 md:px-6">
          <Button asChild variant="ghost" className="mb-4 text-white hover:bg-purple-600">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <div className="flex flex-col items-start space-y-4">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 text-sm bg-purple-100 text-purple-800 rounded-full">
                {post.category}
              </span>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-200">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.initials}</AvatarFallback>
                  </Avatar>
                  <span>{post.author.name}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  {comments.length} comments
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card>
                <CardContent className="pt-6 prose prose-purple max-w-none">
                  {post.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </CardContent>
              </Card>

              <div className="mt-8">
                <CommentSection
                  postId={post.id}
                  comments={comments}
                  onAddComment={handleAddComment}
                />
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">About the Author</h3>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{post.author.name}</p>
                      <p className="text-sm text-gray-500">Web Developer & Technical Writer</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-medium mb-4">Related Posts</h3>
                  <div className="space-y-4">
                    {posts
                      .filter(p => p.id !== post.id && p.category === post.category)
                      .slice(0, 3)
                      .map(relatedPost => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.id}`}
                          className="block hover:bg-gray-50 p-2 rounded-md"
                        >
                          <h4 className="font-medium">{relatedPost.title}</h4>
                          <p className="text-sm text-gray-500">{relatedPost.date}</p>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
