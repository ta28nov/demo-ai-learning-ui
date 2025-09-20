"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BookOpen,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Lock,
  Download,
  MessageCircle,
  ArrowLeft,
  Award,
  FileText,
  Video,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock data for course details
const courseData = {
  id: 1,
  title: "Lập trình Python cơ bản",
  description:
    "Khóa học Python toàn diện từ cơ bản đến nâng cao. Bạn sẽ học được cú pháp Python, lập trình hướng đối tượng, xử lý dữ liệu và xây dựng các dự án thực tế.",
  instructor: {
    name: "Nguyễn Văn Minh",
    avatar: "/placeholder.svg?key=instructor",
    bio: "Kỹ sư phần mềm với 8 năm kinh nghiệm, chuyên gia Python và Machine Learning",
    rating: 4.9,
    students: 15000,
  },
  duration: "8 tuần",
  students: 1234,
  rating: 4.8,
  reviews: 456,
  price: "Miễn phí",
  level: "Cơ bản",
  category: "Lập trình",
  progress: 65,
  enrolled: true,
  image: "/python-programming-course-banner.jpg",
  lessons: 24,
  completedLessons: 16,
  totalDuration: "12 giờ 30 phút",
  language: "Tiếng Việt",
  certificate: true,
  lastUpdated: "Tháng 11, 2024",
  requirements: [
    "Máy tính có kết nối internet",
    "Không cần kinh nghiệm lập trình trước đó",
    "Tinh thần học hỏi và kiên trì",
  ],
  whatYouLearn: [
    "Nắm vững cú pháp Python cơ bản",
    "Lập trình hướng đối tượng với Python",
    "Xử lý file và dữ liệu",
    "Sử dụng thư viện Python phổ biến",
    "Xây dựng dự án thực tế",
    "Debug và tối ưu code Python",
  ],
  curriculum: [
    {
      title: "Giới thiệu về Python",
      lessons: 4,
      duration: "1 giờ 15 phút",
      completed: 4,
      items: [
        { title: "Python là gì?", duration: "15 phút", completed: true, type: "video" },
        { title: "Cài đặt Python và IDE", duration: "20 phút", completed: true, type: "video" },
        { title: "Chương trình Python đầu tiên", duration: "25 phút", completed: true, type: "video" },
        { title: "Bài tập thực hành", duration: "15 phút", completed: true, type: "exercise" },
      ],
    },
    {
      title: "Biến và Kiểu dữ liệu",
      lessons: 5,
      duration: "1 giờ 45 phút",
      completed: 5,
      items: [
        { title: "Biến trong Python", duration: "20 phút", completed: true, type: "video" },
        { title: "Kiểu dữ liệu cơ bản", duration: "25 phút", completed: true, type: "video" },
        { title: "String và xử lý chuỗi", duration: "30 phút", completed: true, type: "video" },
        { title: "List, Tuple, Dictionary", duration: "20 phút", completed: true, type: "video" },
        { title: "Bài tập thực hành", duration: "10 phút", completed: true, type: "exercise" },
      ],
    },
    {
      title: "Cấu trúc điều khiển",
      lessons: 6,
      duration: "2 giờ 10 phút",
      completed: 4,
      items: [
        { title: "Câu lệnh if-else", duration: "25 phút", completed: true, type: "video" },
        { title: "Vòng lặp for", duration: "30 phút", completed: true, type: "video" },
        { title: "Vòng lặp while", duration: "25 phút", completed: true, type: "video" },
        { title: "Break và Continue", duration: "20 phút", completed: true, type: "video" },
        { title: "Nested loops", duration: "30 phút", completed: false, type: "video" },
        { title: "Bài tập tổng hợp", duration: "20 phút", completed: false, type: "exercise" },
      ],
    },
    {
      title: "Hàm và Module",
      lessons: 5,
      duration: "1 giờ 50 phút",
      completed: 2,
      items: [
        { title: "Định nghĩa và gọi hàm", duration: "25 phút", completed: true, type: "video" },
        { title: "Tham số và đối số", duration: "20 phút", completed: true, type: "video" },
        { title: "Return và Scope", duration: "25 phút", completed: false, type: "video" },
        { title: "Lambda functions", duration: "20 phút", completed: false, type: "video" },
        { title: "Import và Module", duration: "20 phút", completed: false, type: "video" },
      ],
    },
    {
      title: "Lập trình hướng đối tượng",
      lessons: 4,
      duration: "2 giờ 30 phút",
      completed: 1,
      items: [
        { title: "Class và Object", duration: "40 phút", completed: true, type: "video" },
        { title: "Constructor và Destructor", duration: "35 phút", completed: false, type: "video" },
        { title: "Inheritance", duration: "45 phút", completed: false, type: "video" },
        { title: "Polymorphism", duration: "30 phút", completed: false, type: "video" },
      ],
    },
  ],
}

export default function CourseDetailPage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  const course = courseData // In real app, fetch by params.id

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link href="/dashboard/courses" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Quay lại danh sách khóa học
      </Link>

      {/* Course Header */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge variant="secondary">{course.category}</Badge>
                  <Badge variant={course.level === "Cơ bản" ? "default" : "destructive"}>{course.level}</Badge>
                  {course.enrolled && <Badge className="bg-green-500">Đã đăng ký</Badge>}
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <p className="text-gray-600 mb-6">{course.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="mr-2 h-4 w-4" />
                    {course.totalDuration}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="mr-2 h-4 w-4" />
                    {course.lessons} bài học
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="mr-2 h-4 w-4" />
                    {course.students.toLocaleString()} học viên
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="mr-2 h-4 w-4 text-yellow-500" />
                    {course.rating} ({course.reviews} đánh giá)
                  </div>
                </div>

                {course.enrolled && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-800">
                        Tiến độ học tập: {course.completedLessons}/{course.lessons} bài
                      </span>
                      <span className="text-sm font-medium text-green-800">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 mb-3" />
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Play className="mr-2 h-4 w-4" />
                      Tiếp tục học
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Instructor */}
          <Card>
            <CardHeader>
              <CardTitle>Giảng viên</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={course.instructor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>NM</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{course.instructor.name}</h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="mr-1 h-3 w-3 text-yellow-500" />
                    {course.instructor.rating} • {course.instructor.students.toLocaleString()} học viên
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">{course.instructor.bio}</p>
            </CardContent>
          </Card>

          {/* Course Info */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin khóa học</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Thời lượng:</span>
                <span className="text-sm font-medium">{course.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Ngôn ngữ:</span>
                <span className="text-sm font-medium">{course.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Cập nhật:</span>
                <span className="text-sm font-medium">{course.lastUpdated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Chứng chỉ:</span>
                <span className="text-sm font-medium">{course.certificate ? "Có" : "Không"}</span>
              </div>
              <div className="pt-3 border-t">
                <div className="text-2xl font-bold text-primary mb-2">{course.price}</div>
                {!course.enrolled && (
                  <Button className="w-full">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Đăng ký ngay
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Hành động</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="mr-2 h-4 w-4" />
                Tải tài liệu
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <MessageCircle className="mr-2 h-4 w-4" />
                Thảo luận
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Award className="mr-2 h-4 w-4" />
                Xem chứng chỉ
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="curriculum">Chương trình</TabsTrigger>
          <TabsTrigger value="reviews">Đánh giá</TabsTrigger>
          <TabsTrigger value="resources">Tài nguyên</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Bạn sẽ học được gì</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.whatYouLearn.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Yêu cầu</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {course.requirements.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 h-2 w-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="curriculum" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Chương trình học</CardTitle>
              <CardDescription>
                {course.lessons} bài học • {course.totalDuration} • {course.completedLessons} bài đã hoàn thành
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {course.curriculum.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="border rounded-lg">
                    <div className="p-4 bg-gray-50 border-b">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{section.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>
                            {section.completed}/{section.lessons} bài
                          </span>
                          <span>{section.duration}</span>
                        </div>
                      </div>
                      <Progress value={(section.completed / section.lessons) * 100} className="h-1 mt-2" />
                    </div>
                    <div className="p-4 space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center justify-between py-2">
                          <div className="flex items-center space-x-3">
                            {item.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Lock className="h-4 w-4 text-gray-400" />
                            )}
                            {item.type === "video" ? (
                              <Video className="h-4 w-4 text-blue-500" />
                            ) : (
                              <FileText className="h-4 w-4 text-orange-500" />
                            )}
                            <span className={`text-sm ${item.completed ? "text-gray-900" : "text-gray-500"}`}>
                              {item.title}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{item.duration}</span>
                            {item.completed && course.enrolled && (
                              <Button size="sm" variant="ghost">
                                <Play className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Đánh giá từ học viên</CardTitle>
              <CardDescription>
                {course.rating} sao trung bình từ {course.reviews} đánh giá
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Rating breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">{course.rating}</div>
                    <div className="flex justify-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{course.reviews} đánh giá</p>
                  </div>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-2">
                        <span className="text-sm w-8">{stars} sao</span>
                        <Progress
                          value={stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 8 : 2}
                          className="flex-1 h-2"
                        />
                        <span className="text-sm text-gray-600 w-8">
                          {stars === 5 ? "70%" : stars === 4 ? "20%" : stars === 3 ? "8%" : "2%"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample reviews */}
                <div className="space-y-4">
                  {[
                    {
                      name: "Trần Văn B",
                      rating: 5,
                      date: "2 ngày trước",
                      comment:
                        "Khóa học rất hay và dễ hiểu. Giảng viên giải thích rất chi tiết và có nhiều ví dụ thực tế.",
                    },
                    {
                      name: "Nguyễn Thị C",
                      rating: 4,
                      date: "1 tuần trước",
                      comment: "Nội dung chất lượng, tuy nhiên một số bài hơi khó theo kịp. Nhìn chung rất tốt!",
                    },
                    {
                      name: "Lê Văn D",
                      rating: 5,
                      date: "2 tuần trước",
                      comment:
                        "Tuyệt vời! Từ không biết gì về Python giờ tôi đã có thể viết được những chương trình đơn giản.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{review.name}</span>
                        </div>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Tài nguyên khóa học</CardTitle>
              <CardDescription>Tài liệu, mã nguồn và các tài nguyên bổ sung</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: "Python Cheat Sheet", type: "PDF", size: "2.5 MB" },
                  { name: "Source Code - Tất cả bài tập", type: "ZIP", size: "15.2 MB" },
                  { name: "Slides bài giảng", type: "PDF", size: "8.7 MB" },
                  { name: "Dataset mẫu", type: "CSV", size: "1.2 MB" },
                  { name: "Tài liệu tham khảo", type: "PDF", size: "5.4 MB" },
                ].map((resource, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-sm">{resource.name}</p>
                        <p className="text-xs text-gray-500">
                          {resource.type} • {resource.size}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
