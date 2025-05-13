import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MessageSquare } from "lucide-react"

export default function FeaturedPosts() {
  // Mock data for featured posts
  const featuredPosts = [
    {
      id: 1,
      title: "Getting Started with Web Development",
      excerpt: "Learn the basics of HTML, CSS, and JavaScript to kickstart your web development journey.",
      date: "March 21, 2025",
      author: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      commentCount: 12,
    },
    {
      id: 2,
      title: "The Future of Artificial Intelligence",
      excerpt: "Exploring the potential impact of AI on various industries and our daily lives.",
      date: "March 28, 2025",
      author: {
        name: "Samantha Lee",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "SL",
      },
      commentCount: 8,
    },
    {
      id: 3,
      title: "Responsive Design Best Practices",
      excerpt: "Tips and tricks for creating websites that look great on all devices.",
      date: "April 02, 2025",
      author: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "MC",
      },
      commentCount: 5,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Posts</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
              Discover our most popular and engaging content.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {featuredPosts.map((post) => (
            <Card key={post.id} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription className="flex items-center text-sm text-gray-500 mt-2">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {post.date}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-500">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between items-center border-t pt-4">
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                    <AvatarFallback>{post.author.initials}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{post.author.name}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <MessageSquare className="mr-1 h-4 w-4" />
                  {post.commentCount}
                </div>
              </CardFooter>
              <CardFooter className="pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href={`/blog/${post.id}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
