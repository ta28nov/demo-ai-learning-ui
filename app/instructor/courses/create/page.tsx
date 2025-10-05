"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Plus, X, Save, Eye } from "lucide-react"
import Link from "next/link"

export default function CreateCoursePage() {
  const [courseTitle, setCourseTitle] = useState("")
  const [courseDescription, setCourseDescription] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [isFree, setIsFree] = useState(false)
  const [price, setPrice] = useState("")
  const [lessons, setLessons] = useState([{ id: 1, title: "", content: "", duration: "" }])

  const addLesson = () => {
    setLessons([...lessons, { id: lessons.length + 1, title: "", content: "", duration: "" }])
  }

  const removeLesson = (id: number) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Tạo khóa học mới</h1>
              <p className="text-muted-foreground">Tạo khóa học và chia sẻ kiến thức của bạn</p>
            </div>
            <div className="flex gap-3">
              <Link href="/instructor/courses">
                <Button variant="outline">Hủy</Button>
              </Link>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Xem trước
              </Button>
              <Button>
                <Save className="mr-2 h-4 w-4" />
                Lưu khóa học
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList>
            <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
            <TabsTrigger value="content">Nội dung khóa học</TabsTrigger>
            <TabsTrigger value="pricing">Giá & Thanh toán</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin khóa học</CardTitle>
                <CardDescription>Điền thông tin cơ bản về khóa học của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tên khóa học *</Label>
                  <Input
                    id="title"
                    placeholder="VD: Lập trình Python từ cơ bản đến nâng cao"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Mô tả khóa học *</Label>
                  <Textarea
                    id="description"
                    placeholder="Mô tả chi tiết về khóa học, nội dung, mục tiêu học tập..."
                    rows={6}
                    value={courseDescription}
                    onChange={(e) => setCourseDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Danh mục *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="programming">Lập trình</SelectItem>
                        <SelectItem value="ai">AI & Machine Learning</SelectItem>
                        <SelectItem value="web">Web Development</SelectItem>
                        <SelectItem value="mobile">Mobile Development</SelectItem>
                        <SelectItem value="data">Data Science</SelectItem>
                        <SelectItem value="devops">DevOps</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Cấp độ *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn cấp độ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Người mới bắt đầu</SelectItem>
                        <SelectItem value="intermediate">Trung cấp</SelectItem>
                        <SelectItem value="advanced">Nâng cao</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail">Ảnh đại diện khóa học</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Kéo thả ảnh hoặc click để chọn</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG (tối đa 5MB)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Nội dung khóa học</CardTitle>
                    <CardDescription>Thêm các bài học và tài liệu cho khóa học</CardDescription>
                  </div>
                  <Button onClick={addLesson}>
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm bài học
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {lessons.map((lesson, index) => (
                  <Card key={lesson.id} className="border-2">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="font-semibold">Bài học {index + 1}</h4>
                        {lessons.length > 1 && (
                          <Button variant="ghost" size="sm" onClick={() => removeLesson(lesson.id)}>
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label>Tiêu đề bài học</Label>
                          <Input placeholder="VD: Giới thiệu về Python" />
                        </div>
                        <div className="space-y-2">
                          <Label>Nội dung</Label>
                          <Textarea placeholder="Mô tả nội dung bài học..." rows={3} />
                        </div>
                        <div className="space-y-2">
                          <Label>Thời lượng (phút)</Label>
                          <Input type="number" placeholder="30" />
                        </div>
                        <div className="space-y-2">
                          <Label>Video bài học</Label>
                          <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-primary transition-colors cursor-pointer">
                            <Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">Tải lên video hoặc nhập link YouTube</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Giá và thanh toán</CardTitle>
                <CardDescription>Thiết lập giá cho khóa học của bạn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="free-course" className="text-base font-medium">
                      Khóa học miễn phí
                    </Label>
                    <p className="text-sm text-muted-foreground">Cho phép tất cả mọi người truy cập miễn phí</p>
                  </div>
                  <Switch id="free-course" checked={isFree} onCheckedChange={setIsFree} />
                </div>

                {!isFree && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Giá khóa học (VNĐ) *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="499000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>

                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Phân chia doanh thu</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Giá khóa học:</span>
                          <span className="font-medium">{price || "0"} VNĐ</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Phí nền tảng (20%):</span>
                          <span className="font-medium">
                            {price ? Math.round(Number(price) * 0.2).toLocaleString() : "0"} VNĐ
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="font-medium">Bạn nhận được:</span>
                          <span className="font-bold text-primary">
                            {price ? Math.round(Number(price) * 0.8).toLocaleString() : "0"} VNĐ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cài đặt khóa học</CardTitle>
                <CardDescription>Quản lý quyền truy cập và hiển thị</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="public-course" className="text-base font-medium">
                      Khóa học công khai
                    </Label>
                    <p className="text-sm text-muted-foreground">Hiển thị khóa học trong danh sách công khai</p>
                  </div>
                  <Switch id="public-course" checked={isPublic} onCheckedChange={setIsPublic} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="certificate" className="text-base font-medium">
                      Cấp chứng chỉ
                    </Label>
                    <p className="text-sm text-muted-foreground">Học viên nhận chứng chỉ khi hoàn thành</p>
                  </div>
                  <Switch id="certificate" />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="discussion" className="text-base font-medium">
                      Cho phép thảo luận
                    </Label>
                    <p className="text-sm text-muted-foreground">Học viên có thể đặt câu hỏi và thảo luận</p>
                  </div>
                  <Switch id="discussion" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
