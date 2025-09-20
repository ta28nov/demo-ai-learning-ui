"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, Clock, Users, Star, Search, Play, CheckCircle } from "lucide-react"
import Link from "next/link"

const courses = [
  {
    id: 1,
    title: "Lập trình Python cơ bản",
    description: "Học Python từ cơ bản đến nâng cao với các dự án thực tế",
    instructor: "Nguyễn Văn Minh",
    duration: "8 tuần",
    students: 1234,
    rating: 4.8,
    price: "Miễn phí",
    level: "Cơ bản",
    category: "Lập trình",
    progress: 65,
    enrolled: true,
    image: "/python-programming-course.png",
    lessons: 24,
    completedLessons: 16,
  },
  {
    id: 2,
    title: "Machine Learning với TensorFlow",
    description: "Khám phá thế giới AI và Machine Learning với TensorFlow",
    instructor: "Trần Thị Hoa",
    duration: "12 tuần",
    students: 856,
    rating: 4.9,
    price: "1,500,000 VNĐ",
    level: "Nâng cao",
    category: "AI/ML",
    progress: 30,
    enrolled: true,
    image: "/machine-learning-tensorflow-course.jpg",
    lessons: 36,
    completedLessons: 11,
  },
  {
    id: 3,
    title: "Web Development với React",
    description: "Xây dựng ứng dụng web hiện đại với React và Next.js",
    instructor: "Lê Văn Đức",
    duration: "10 tuần",
    students: 2156,
    rating: 4.7,
    price: "2,000,000 VNĐ",
    level: "Trung bình",
    category: "Web Development",
    progress: 80,
    enrolled: true,
    image: "/react-web-development-course.jpg",
    lessons: 30,
    completedLessons: 24,
  },
  {
    id: 4,
    title: "Data Science với Python",
    description: "Phân tích dữ liệu và trực quan hóa với Python",
    instructor: "Phạm Thị Lan",
    duration: "6 tuần",
    students: 743,
    rating: 4.6,
    price: "1,200,000 VNĐ",
    level: "Trung bình",
    category: "Data Science",
    progress: 0,
    enrolled: false,
    image: "/data-science-python-course.png",
    lessons: 18,
    completedLessons: 0,
  },
  {
    id: 5,
    title: "Mobile App với Flutter",
    description: "Phát triển ứng dụng di động đa nền tảng với Flutter",
    instructor: "Hoàng Văn Nam",
    duration: "8 tuần",
    students: 567,
    rating: 4.5,
    price: "1,800,000 VNĐ",
    level: "Trung bình",
    category: "Mobile Development",
    progress: 0,
    enrolled: false,
    image: "/flutter-mobile-app-development-course.jpg",
    lessons: 22,
    completedLessons: 0,
  },
  {
    id: 6,
    title: "DevOps và Cloud Computing",
    description: "Triển khai và quản lý ứng dụng trên cloud",
    instructor: "Vũ Thị Mai",
    duration: "10 tuần",
    students: 432,
    rating: 4.8,
    price: "2,500,000 VNĐ",
    level: "Nâng cao",
    category: "DevOps",
    progress: 0,
    enrolled: false,
    image: "/devops-cloud-computing-course.jpg",
    lessons: 28,
    completedLessons: 0,
  },
]

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const categories = ["all", "Lập trình", "AI/ML", "Web Development", "Data Science", "Mobile Development", "DevOps"]
  const levels = ["all", "Cơ bản", "Trung bình", "Nâng cao"]

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory
    const matchesLevel = selectedLevel === "all" || course.level === selectedLevel
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "enrolled" && course.enrolled) ||
      (activeTab === "available" && !course.enrolled)

    return matchesSearch && matchesCategory && matchesLevel && matchesTab
  })

  const CourseCard = ({ course }: { course: (typeof courses)[0] }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img src={course.image || "/placeholder.svg"} alt={course.title} className="w-full h-48 object-cover" />
        {course.enrolled && <Badge className="absolute top-2 right-2 bg-green-500">Đã đăng ký</Badge>}
      </div>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
            <CardDescription className="text-sm">{course.description}</CardDescription>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            {course.students.toLocaleString()}
          </div>
          <div className="flex items-center">
            <Star className="mr-1 h-4 w-4 text-yellow-500" />
            {course.rating}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Giảng viên: {course.instructor}</span>
            <Badge
              variant={
                course.level === "Cơ bản" ? "secondary" : course.level === "Trung bình" ? "default" : "destructive"
              }
            >
              {course.level}
            </Badge>
          </div>

          {course.enrolled && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>
                  Tiến độ: {course.completedLessons}/{course.lessons} bài
                </span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary">{course.price}</span>
            <Link href={`/dashboard/courses/${course.id}`}>
              <Button className={course.enrolled ? "bg-green-600 hover:bg-green-700" : ""}>
                {course.enrolled ? (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Tiếp tục học
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Xem chi tiết
                  </>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Khóa học</h1>
        <p className="text-gray-600 mt-2">Khám phá và học tập với hàng trăm khóa học chất lượng cao</p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm khóa học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả danh mục</SelectItem>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Cấp độ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả cấp độ</SelectItem>
                  {levels.slice(1).map((level) => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">Tất cả khóa học</TabsTrigger>
          <TabsTrigger value="enrolled">Đã đăng ký</TabsTrigger>
          <TabsTrigger value="available">Có sẵn</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredCourses.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy khóa học</h3>
                <p className="text-gray-600">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-sm text-gray-600">Tổng số khóa học</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <div className="text-2xl font-bold">{courses.filter((c) => c.enrolled).length}</div>
            <p className="text-sm text-gray-600">Đã đăng ký</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <Users className="mx-auto h-8 w-8 text-blue-500 mb-2" />
            <div className="text-2xl font-bold">{courses.reduce((sum, c) => sum + c.students, 0).toLocaleString()}</div>
            <p className="text-sm text-gray-600">Tổng học viên</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
