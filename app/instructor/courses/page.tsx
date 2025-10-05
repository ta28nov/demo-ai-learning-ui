"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Users, DollarSign, Star, Eye, Edit, Trash2, MoreVertical } from "lucide-react"
import Link from "next/link"

export default function InstructorCoursesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const courses = [
    {
      id: 1,
      title: "Lập trình Python nâng cao",
      description: "Khóa học Python từ cơ bản đến nâng cao với các dự án thực tế",
      thumbnail: "/python-programming-course.png",
      students: 234,
      revenue: "12.5M",
      rating: 4.9,
      reviews: 156,
      status: "Công khai",
      price: "499,000",
      category: "Lập trình",
      lastUpdated: "2 ngày trước",
    },
    {
      id: 2,
      title: "Machine Learning cơ bản",
      description: "Học Machine Learning với TensorFlow và Python",
      thumbnail: "/machine-learning-tensorflow-course.jpg",
      students: 189,
      revenue: "8.9M",
      rating: 4.7,
      reviews: 98,
      status: "Công khai",
      price: "599,000",
      category: "AI & ML",
      lastUpdated: "5 ngày trước",
    },
    {
      id: 3,
      title: "React & Next.js Full Stack",
      description: "Xây dựng ứng dụng web hiện đại với React và Next.js",
      thumbnail: "/react-web-development-course.jpg",
      students: 156,
      revenue: "7.2M",
      rating: 4.8,
      reviews: 87,
      status: "Riêng tư",
      price: "699,000",
      category: "Web Development",
      lastUpdated: "1 tuần trước",
    },
    {
      id: 4,
      title: "Data Science với Python",
      description: "Phân tích dữ liệu và trực quan hóa với Python",
      thumbnail: "/data-science-python-course.png",
      students: 145,
      revenue: "6.8M",
      rating: 4.6,
      reviews: 72,
      status: "Công khai",
      price: "549,000",
      category: "Data Science",
      lastUpdated: "2 tuần trước",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Quản lý khóa học</h1>
              <p className="text-muted-foreground">Tạo và quản lý các khóa học của bạn</p>
            </div>
            <Link href="/instructor/courses/create">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Tạo khóa học mới
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm khóa học..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="public">Công khai</SelectItem>
                  <SelectItem value="private">Riêng tư</SelectItem>
                  <SelectItem value="draft">Bản nháp</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="programming">Lập trình</SelectItem>
                  <SelectItem value="ai">AI & ML</SelectItem>
                  <SelectItem value="web">Web Development</SelectItem>
                  <SelectItem value="data">Data Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Courses List */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">Tất cả ({courses.length})</TabsTrigger>
            <TabsTrigger value="public">Công khai</TabsTrigger>
            <TabsTrigger value="private">Riêng tư</TabsTrigger>
            <TabsTrigger value="draft">Bản nháp</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {courses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl font-semibold">{course.title}</h3>
                            <Badge variant={course.status === "Công khai" ? "default" : "secondary"}>
                              {course.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{course.description}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <Badge variant="outline">{course.category}</Badge>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Users className="h-4 w-4" />
                              {course.students} học viên
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <DollarSign className="h-4 w-4" />
                              {course.revenue}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              {course.rating} ({course.reviews})
                            </span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          Cập nhật: {course.lastUpdated} • Giá: {course.price} VNĐ
                        </div>
                        <div className="flex gap-2">
                          <Link href={`/instructor/courses/${course.id}`}>
                            <Button size="sm" variant="outline">
                              <Eye className="mr-2 h-4 w-4" />
                              Xem
                            </Button>
                          </Link>
                          <Link href={`/instructor/courses/${course.id}/edit`}>
                            <Button size="sm" variant="outline">
                              <Edit className="mr-2 h-4 w-4" />
                              Chỉnh sửa
                            </Button>
                          </Link>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
