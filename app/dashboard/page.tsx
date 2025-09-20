import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Clock, Trophy, TrendingUp, Play, MessageCircle, Calendar, Target, Award, Users } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Chào mừng trở lại, Nguyễn Văn A!</h1>
        <p className="text-blue-100 mb-4">
          Hôm nay là ngày tuyệt vời để học điều gì đó mới. Hãy tiếp tục hành trình học tập của bạn!
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/courses">
            <Button variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              <BookOpen className="mr-2 h-4 w-4" />
              Khám phá khóa học
            </Button>
          </Link>
          <Link href="/dashboard/chat">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat với AI Tutor
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Khóa học đang học</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+1 từ tuần trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Giờ học tuần này</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5</div>
            <p className="text-xs text-muted-foreground">+2.1 giờ từ tuần trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz hoàn thành</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+6 từ tuần trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Điểm trung bình</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.7</div>
            <p className="text-xs text-muted-foreground">+0.3 từ tuần trước</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Courses */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Khóa học đang học</CardTitle>
              <CardDescription>Tiếp tục học từ nơi bạn đã dừng lại</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Lập trình Python cơ bản</h3>
                  <p className="text-sm text-gray-600">Bài 5: Vòng lặp và điều kiện</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Progress value={65} className="flex-1" />
                    <span className="text-sm text-gray-500">65%</span>
                  </div>
                </div>
                <Button size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  Tiếp tục
                </Button>
              </div>

              <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Machine Learning với TensorFlow</h3>
                  <p className="text-sm text-gray-600">Bài 3: Neural Networks</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Progress value={30} className="flex-1" />
                    <span className="text-sm text-gray-500">30%</span>
                  </div>
                </div>
                <Button size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  Tiếp tục
                </Button>
              </div>

              <div className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Web Development với React</h3>
                  <p className="text-sm text-gray-600">Bài 8: State Management</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Progress value={80} className="flex-1" />
                    <span className="text-sm text-gray-500">80%</span>
                  </div>
                </div>
                <Button size="sm">
                  <Play className="mr-2 h-4 w-4" />
                  Tiếp tục
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Learning Streak */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5 text-orange-500" />
                Chuỗi học tập
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">7</div>
                <p className="text-sm text-gray-600 mb-4">ngày liên tiếp</p>
                <div className="flex justify-center space-x-1">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{i + 1}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">Tiếp tục để duy trì chuỗi!</p>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-yellow-500" />
                Thành tích gần đây
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Quiz Master</p>
                  <p className="text-xs text-gray-500">Hoàn thành 20 quiz</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Dedicated Learner</p>
                  <p className="text-xs text-gray-500">Học 7 ngày liên tiếp</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Community Helper</p>
                  <p className="text-xs text-gray-500">Giúp đỡ 5 học viên khác</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-purple-500" />
                Sự kiện sắp tới
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">Webinar: AI trong giáo dục</p>
                  <Badge variant="secondary">Live</Badge>
                </div>
                <p className="text-xs text-gray-600">Hôm nay, 19:00</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">Quiz: Python Fundamentals</p>
                  <Badge variant="outline">Sắp tới</Badge>
                </div>
                <p className="text-xs text-gray-600">Ngày mai, 14:00</p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-sm">Workshop: React Hooks</p>
                  <Badge variant="outline">Đăng ký</Badge>
                </div>
                <p className="text-xs text-gray-600">Thứ 6, 20:00</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
