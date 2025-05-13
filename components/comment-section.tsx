"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ThumbsUp, Reply } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface CommentSectionProps {
  postId: number
  commentCount: number
}

export default function CommentSection({ postId, commentCount }: CommentSectionProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock data for comments
  const [comments, setComments] = useState([
    {
      id: 1,
      author: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      content:
        "This is a great article! I've been looking for a comprehensive guide to get started with web development.",
      date: "March 22, 2025",
      likes: 5,
    },
    {
      id: 2,
      author: {
        name: "Robert Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "RJ",
      },
      content:
        "Thanks for sharing this. I especially liked the section about CSS frameworks. Could you recommend any resources for learning Tailwind CSS?",
      date: "March 25, 2025",
      likes: 3,
    },
    {
      id: 3,
      author: {
        name: "Lisa Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "LC",
      },
      content:
        "I've been coding for a while but this article still taught me some new things. Great job explaining the fundamentals!",
      date: "April 10, 2025",
      likes: 7,
    },
  ])

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim()) {
      toast({
        title: "Error",
        description: "Please enter a comment.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      // Add the new comment to the list
      const newComment = {
        id: comments.length + 1,
        author: {
          name: "You", // In a real app, this would be the logged-in user
          avatar: "/placeholder.svg?height=40&width=40",
          initials: "YO",
        },
        content: comment,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        likes: 0,
      }

      setComments([newComment, ...comments])

      toast({
        title: "Success!",
        description: "Your comment has been posted.",
      })
      setComment("")
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Comments ({commentCount})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Comment Form */}
          <form onSubmit={handleSubmitComment}>
            <div className="space-y-4">
              <Textarea
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post Comment"}
                </Button>
              </div>
            </div>
          </form>

          <Separator />

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="space-y-2">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{comment.author.name}</p>
                      <p className="text-xs text-gray-500">{comment.date}</p>
                    </div>
                    <p className="text-sm mt-1">{comment.content}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        Like ({comment.likes})
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                        <Reply className="h-3 w-3 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
