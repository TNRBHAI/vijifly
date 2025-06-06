"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, MessageSquare, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/ProtectedRoute"
import { usePosts } from "@/contexts/PostContext"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function MyPostsPage() {
  const { user } = useAuth()
  const router = useRouter()
  const { posts, deletePost } = usePosts()

  // Categories for filtering
  const categories = ["All", "Web Development", "Technology", "Design", "React", "Backend", "CSS"]

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 4

  // Filter posts to show only those created by the current user
  const userPosts = posts.filter(post => post.author.id === user?.uid)

  // Filter posts based on search query and category
  const filteredPosts = userPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDeletePost = (postId: number) => {
    deletePost(postId)
    toast({
      title: "Success",
      description: "Post has been deleted successfully.",
    })
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <section className="w-full py-12 md:py-24 bg-gradient-to-r from-purple-500 to-purple-700 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col items-start space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Posts</h1>
                  <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl">
                    Manage and view your published content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Sidebar */}
              <div className="w-full md:w-1/4 space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Search</h3>
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="Search your posts..."
                      className="w-full"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setCurrentPage(1)
                      }}
                    />
                  </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Categories</h3>
                  <ul className="space-y-1">
                    {categories.map((category) => (
                      <li key={category}>
                        <Button 
                          variant={selectedCategory === category ? "default" : "ghost"}
                          className="w-full justify-start text-left"
                          onClick={() => {
                            setSelectedCategory(category)
                            setCurrentPage(1)
                          }}
                        >
                          {category}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Create New Post Button */}
                <div className="pt-4">
                  <Button 
                    className="w-full" 
                    onClick={() => router.push("/blog/create")}
                  >
                    Create New Post
                  </Button>
                </div>
              </div>

              {/* Main Content */}
              <div className="w-full md:w-3/4">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-12">
                    <h2 className="text-xl font-semibold mb-4">No posts found</h2>
                    <p className="text-gray-500 mb-4">Create your first post to get started!</p>
                    <Button onClick={() => router.push("/blog/create")}>Create Post</Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {paginatedPosts.map((post) => (
                      <Card key={post.id} className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="inline-block px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full mb-2">
                                {post.category}
                              </span>
                              <CardTitle className="text-xl">{post.title}</CardTitle>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the post
                                    and all its comments.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDeletePost(post.id)}
                                    className="bg-red-500 hover:bg-red-600"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
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
                          <Button asChild variant="outline" className="w-full hover:bg-purple-100">
                            <Link href={`/blog/${post.id}`}>Read More</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        &lt;
                      </Button>
                      {[...Array(totalPages)].map((_, index) => (
                        <Button
                          key={index + 1}
                          variant={currentPage === index + 1 ? "default" : "outline"}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </Button>
                      ))}
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        &gt;
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
} 