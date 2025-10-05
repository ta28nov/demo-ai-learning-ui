"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, TrendingUp, DollarSign, Plus, Eye, Edit, BarChart3, Clock, Star, Award } from "lucide-react"
import Link from "next/link"

export default function InstructorDashboard() {
  const stats = [
    {
      title: "Tổng khóa học",
      value: "12",
      change: "+2 tháng này",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Tổng học viên",
      value: "1,234",
      change: "+156 tháng này",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Doanh thu",
      value: "45.2M VNĐ",
      change: "+12% so với tháng trước",
      icon: DollarSign,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Đánh giá TB",
      value: "4.8/5.0",
      change: "Từ 892 đánh giá",
      icon: Star,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const recentCourses = [
    {
      id: 1,
      title: "Lập trình Python nâng cao",
      students: 234,
      revenue: "12.5M",
      rating: 4.9,
      status: "Công khai",
      lastUpdated: "2 ngày trước",
    },
    {
      id: 2,
      title: "Machine Learning cơ bản",
      students: 189,
      revenue: "8.9M",
      rating: 4.7,
      status: "Công khai",
      lastUpdated: "5 ngày trước",
    },
    {
      id: 3,
      title: "React & Next.js Full Stack",
      students: 156,
      revenue: "7.2M",
      rating: 4.8,
      status: "Riêng tư",
      lastUpdated: "1 tuần trước",
    },
  ]

  const recentActivities = [
    { type: "enrollment", message: "15 học viên mới đăng ký khóa Python nâng cao", time: "30 phút trước" },
    { type: "review", message: "Nhận được 5 đánh giá mới (4.8 sao trung bình)", time: "2 giờ trước" },
    { type: "question", message: "8 câu hỏi mới từ học viên cần trả lời", time: "3 giờ trước" },
    { type: "payment", message: "Nhận thanh toán 2.5M VNĐ từ khóa học", time: "5 giờ trước" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard Giảng viên</h1>
              <p className="text-muted-foreground">Chào mừng trở lại, Nguyễn Văn A</p>
            </div>
            <div className="flex gap-3">
              <Link href="/instructor/courses/create">
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Tạo khóa học mới
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`h-12 w-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Khóa học của bạn</CardTitle>
                    <CardDescription>Quản lý và theo dõi các khóa học</CardDescription>
                  </div>
                  <Link href="/instructor/courses">
                    <Button variant="outline" size="sm">
                      Xem tất cả
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentCourses.map((course) => (
                    <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{course.title}</h4>
                          <Badge variant={course.status === "Công khai" ? "default" : "secondary"}>
                            {course.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {course.students} học viên
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {course.revenue}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            {course.rating}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {course.lastUpdated}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Hoạt động gần đây</CardTitle>
                <CardDescription>Cập nhật mới nhất</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Thành tích</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Award className="h-8 w-8 text-yellow-500" />
                    <div>
                      <p className="font-medium">Giảng viên xuất sắc</p>
                      <p className="text-xs text-muted-foreground">Top 10% giảng viên</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Award className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">1000+ học viên</p>
                      <p className="text-xs text-muted-foreground">Đạt mốc quan trọng</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Hành động nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link href="/instructor/courses/create">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <Plus className="h-6 w-6" />
                  <span>Tạo khóa học</span>
                </Button>
              </Link>
              <Link href="/instructor/students">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <Users className="h-6 w-6" />
                  <span>Quản lý học viên</span>
                </Button>
              </Link>
              <Link href="/instructor/analytics">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <BarChart3 className="h-6 w-6" />
                  <span>Xem thống kê</span>
                </Button>
              </Link>
              <Link href="/instructor/settings">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2 bg-transparent">
                  <TrendingUp className="h-6 w-6" />
                  <span>Cài đặt thanh toán</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
