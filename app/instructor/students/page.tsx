"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Mail, MessageSquare, BarChart3, Filter } from "lucide-react"

export default function InstructorStudentsPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const students = [
    {
      id: 1,
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      avatar: "/user-avatar.jpg",
      enrolledCourses: 3,
      completedCourses: 1,
      totalProgress: 65,
      lastActive: "2 giờ trước",
      status: "Đang học",
    },
    {
      id: 2,
      name: "Trần Thị B",
      email: "tranthib@email.com",
      avatar: "/user-avatar.jpg",
      enrolledCourses: 2,
      completedCourses: 2,
      totalProgress: 100,
      lastActive: "1 ngày trước",
      status: "Hoàn thành",
    },
    {
      id: 3,
      name: "Lê Văn C",
      email: "levanc@email.com",
      avatar: "/user-avatar.jpg",
      enrolledCourses: 4,
      completedCourses: 0,
      totalProgress: 25,
      lastActive: "5 giờ trước",
      status: "Đang học",
    },
    {
      id: 4,
      name: "Phạm Thị D",
      email: "phamthid@email.com",
      avatar: "/user-avatar.jpg",
      enrolledCourses: 1,
      completedCourses: 0,
      totalProgress: 45,
      lastActive: "3 ngày trước",
      status: "Đang học",
    },
    {
      id: 5,
      name: "Hoàng Văn E",
      email: "hoangvane@email.com",
      avatar: "/user-avatar.jpg",
      enrolledCourses: 3,
      completedCourses: 1,
      totalProgress: 80,
      lastActive: "1 giờ trước",
      status: "Đang học",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <div>
            <h1 className="text-2xl font-bold">Quản lý học viên</h1>
            <p className="text-muted-foreground">Theo dõi và hỗ trợ học viên của bạn</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-sm text-muted-foreground">Tổng học viên</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">892</div>
              <p className="text-sm text-muted-foreground">Đang học</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">342</div>
              <p className="text-sm text-muted-foreground">Đã hoàn thành</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">72%</div>
              <p className="text-sm text-muted-foreground">Tỷ lệ hoàn thành TB</p>
            </CardContent>
          </Card>
        </div>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Danh sách học viên</CardTitle>
                <CardDescription>Quản lý và theo dõi tiến độ học viên</CardDescription>
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Lọc
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm học viên..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Học viên</TableHead>
                  <TableHead>Khóa học</TableHead>
                  <TableHead>Tiến độ</TableHead>
                  <TableHead>Hoạt động</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={student.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{student.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{student.enrolledCourses} đang học</div>
                        <div className="text-muted-foreground">{student.completedCourses} hoàn thành</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm font-medium">{student.totalProgress}%</div>
                        <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${student.totalProgress}%` }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">{student.lastActive}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={student.status === "Hoàn thành" ? "default" : "secondary"}>
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <BarChart3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
