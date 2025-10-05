"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, BookOpen, MessageSquare, Settings, Trash2, Edit, Play, Clock, Target } from "lucide-react"
import Link from "next/link"

export default function MyCoursesPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [courseName, setCourseName] = useState("")
  const [courseDescription, setCourseDescription] = useState("")

  const personalCourses = [
    {
      id: 1,
      title: "Lộ trình học Python của tôi",
      description: "Khóa học cá nhân để học Python từ cơ bản đến nâng cao",
      lessons: 12,
      progress: 45,
      lastAccessed: "2 giờ trước",
      status: "Đang học",
    },
    {
      id: 2,
      title: "Ôn tập Machine Learning",
      description: "Tổng hợp kiến thức ML để chuẩn bị phỏng vấn",
      lessons: 8,
      progress: 75,
      lastAccessed: "1 ngày trước",
      status: "Đang học",
    },
    {
      id: 3,
      title: "Dự án Web Development",
      description: "Học xây dựng ứng dụng web full-stack",
      lessons: 15,
      progress: 20,
      lastAccessed: "3 ngày trước",
      status: "Đang học",
    },
  ]

  const handleCreateCourse = () => {
    if (courseName && courseDescription) {
      // Logic tạo khóa học mới
      setShowCreateForm(false)
      setCourseName("")
      setCourseDescription("")
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Khóa học của tôi</h1>
          <p className="text-muted-foreground">Tạo và quản lý các khóa học cá nhân với AI hỗ trợ</p>
        </div>
        <Button onClick={() => setShowCreateForm(!showCreateForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Tạo khóa học mới
        </Button>
      </div>

      {showCreateForm && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle>Tạo khóa học cá nhân mới</CardTitle>
            <CardDescription>Tạo khóa học riêng và học tập với sự hỗ trợ của AI Tutor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="course-name">Tên khóa học</Label>
              <Input
                id="course-name"
                placeholder="VD: Lộ trình học React của tôi"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="course-description">Mô tả</Label>
              <Textarea
                id="course-description"
                placeholder="Mô tả mục tiêu và nội dung khóa học..."
                rows={4}
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCreateCourse} disabled={!courseName || !courseDescription}>
                Tạo khóa học
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Tất cả ({personalCourses.length})</TabsTrigger>
          <TabsTrigger value="active">Đang học</TabsTrigger>
          <TabsTrigger value="completed">Đã hoàn thành</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4">
            {personalCourses.map((course) => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-semibold">{course.title}</h3>
                        <Badge variant="secondary">{course.status}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{course.description}</p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{course.lessons} bài học</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{course.lastAccessed}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          <span>{course.progress}% hoàn thành</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tiến độ</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary transition-all" style={{ width: `${course.progress}%` }} />
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Link href={`/dashboard/my-courses/${course.id}`} className="flex-1">
                      <Button className="w-full">
                        <Play className="mr-2 h-4 w-4" />
                        Tiếp tục học
                      </Button>
                    </Link>
                    <Link href={`/dashboard/chat?course=${course.id}`}>
                      <Button variant="outline">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat với AI
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active">
          <div className="text-center py-12 text-muted-foreground">Hiển thị các khóa học đang học</div>
        </TabsContent>

        <TabsContent value="completed">
          <div className="text-center py-12 text-muted-foreground">Chưa có khóa học nào hoàn thành</div>
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/50">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Học tập với AI Tutor</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Mỗi khóa học cá nhân đều có AI Tutor riêng để hỗ trợ bạn học tập hiệu quả hơn. AI sẽ giải đáp thắc mắc,
                gợi ý tài liệu và theo dõi tiến độ của bạn.
              </p>
              <Link href="/dashboard/chat">
                <Button variant="outline" size="sm">
                  Trò chuyện với AI ngay
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
