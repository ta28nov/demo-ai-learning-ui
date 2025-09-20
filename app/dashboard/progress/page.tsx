"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  Clock,
  Target,
  Award,
  BookOpen,
  Brain,
  Users,
  Star,
  Trophy,
  Flame,
  Zap,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChartIcon,
  Activity,
  Timer,
} from "lucide-react"

// Sample data for charts
const weeklyProgressData = [
  { day: "T2", hours: 2.5, completed: 3, score: 85 },
  { day: "T3", hours: 3.2, completed: 4, score: 92 },
  { day: "T4", hours: 1.8, completed: 2, score: 78 },
  { day: "T5", hours: 4.1, completed: 5, score: 88 },
  { day: "T6", hours: 3.5, completed: 4, score: 95 },
  { day: "T7", hours: 2.8, completed: 3, score: 82 },
  { day: "CN", hours: 5.2, completed: 6, score: 90 },
]

const monthlyProgressData = [
  { month: "T1", courses: 2, hours: 45, quizzes: 12, avgScore: 85 },
  { month: "T2", courses: 3, hours: 62, quizzes: 18, avgScore: 88 },
  { month: "T3", courses: 2, hours: 38, quizzes: 15, avgScore: 92 },
  { month: "T4", courses: 4, hours: 78, quizzes: 25, avgScore: 87 },
  { month: "T5", courses: 3, hours: 55, quizzes: 20, avgScore: 90 },
  { month: "T6", courses: 5, hours: 95, quizzes: 32, avgScore: 93 },
]

const skillProgressData = [
  { skill: "Python", progress: 85, level: "Nâng cao", color: "#3B82F6" },
  { skill: "Machine Learning", progress: 72, level: "Trung bình", color: "#10B981" },
  { skill: "Web Development", progress: 90, level: "Chuyên gia", color: "#8B5CF6" },
  { skill: "Data Science", progress: 68, level: "Trung bình", color: "#F59E0B" },
  { skill: "React", progress: 78, level: "Nâng cao", color: "#06B6D4" },
  { skill: "Algorithms", progress: 82, level: "Nâng cao", color: "#EF4444" },
]

const categoryDistribution = [
  { name: "Programming", value: 35, color: "#3B82F6" },
  { name: "AI/ML", value: 25, color: "#10B981" },
  { name: "Web Dev", value: 20, color: "#8B5CF6" },
  { name: "Data Science", value: 15, color: "#F59E0B" },
  { name: "Others", value: 5, color: "#6B7280" },
]

const achievements = [
  {
    id: 1,
    title: "Người học chăm chỉ",
    description: "Học 7 ngày liên tiếp",
    icon: Flame,
    color: "bg-orange-500",
    earned: true,
    date: "2 ngày trước",
  },
  {
    id: 2,
    title: "Thạc sĩ Quiz",
    description: "Đạt 90% trong 10 quiz",
    icon: Trophy,
    color: "bg-yellow-500",
    earned: true,
    date: "1 tuần trước",
  },
  {
    id: 3,
    title: "Tốc độ ánh sáng",
    description: "Hoàn thành khóa học trong 1 ngày",
    icon: Zap,
    color: "bg-blue-500",
    earned: true,
    date: "3 ngày trước",
  },
  {
    id: 4,
    title: "Người cố vấn",
    description: "Giúp đỡ 5 học viên khác",
    icon: Users,
    color: "bg-green-500",
    earned: false,
    progress: 60,
  },
  {
    id: 5,
    title: "Chuyên gia Python",
    description: "Hoàn thành tất cả khóa Python",
    icon: Star,
    color: "bg-purple-500",
    earned: false,
    progress: 80,
  },
  {
    id: 6,
    title: "Học giả",
    description: "Học 100 giờ trong tháng",
    icon: BookOpen,
    color: "bg-indigo-500",
    earned: false,
    progress: 45,
  },
]

const learningGoals = [
  {
    id: 1,
    title: "Hoàn thành khóa Machine Learning",
    progress: 75,
    target: "Cuối tháng này",
    status: "on-track",
  },
  {
    id: 2,
    title: "Đạt 95% điểm trung bình quiz",
    progress: 88,
    target: "Cuối tuần này",
    status: "ahead",
  },
  {
    id: 3,
    title: "Học 40 giờ trong tháng",
    progress: 60,
    target: "31/12/2024",
    status: "behind",
  },
  {
    id: 4,
    title: "Hoàn thành 5 dự án thực hành",
    progress: 40,
    target: "Cuối quý",
    status: "on-track",
  },
]

export default function ProgressPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("week")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ahead":
        return "text-green-600 bg-green-100"
      case "on-track":
        return "text-blue-600 bg-blue-100"
      case "behind":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "ahead":
        return "Vượt tiến độ"
      case "on-track":
        return "Đúng tiến độ"
      case "behind":
        return "Chậm tiến độ"
      default:
        return "Không xác định"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Theo dõi tiến độ</h1>
          <p className="text-gray-600 mt-2">Phân tích chi tiết quá trình học tập của bạn</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={selectedPeriod === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("week")}
          >
            Tuần
          </Button>
          <Button
            variant={selectedPeriod === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("month")}
          >
            Tháng
          </Button>
          <Button
            variant={selectedPeriod === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPeriod("year")}
          >
            Năm
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tổng thời gian học</p>
                <p className="text-2xl font-bold text-gray-900">127.5h</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12% so với tháng trước</span>
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Khóa học hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+3 khóa học mới</span>
                </div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Điểm trung bình</p>
                <p className="text-2xl font-bold text-gray-900">89.2%</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+2.1% cải thiện</span>
                </div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Chuỗi học tập</p>
                <p className="text-2xl font-bold text-gray-900">15 ngày</p>
                <div className="flex items-center mt-2">
                  <Flame className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm text-orange-600">Kỷ lục cá nhân!</span>
                </div>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="skills">Kỹ năng</TabsTrigger>
          <TabsTrigger value="achievements">Thành tích</TabsTrigger>
          <TabsTrigger value="goals">Mục tiêu</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Learning Activity Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Hoạt động học tập hàng tuần</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="hours" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Điểm số theo ngày</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyProgressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Xu hướng học tập theo tháng</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={monthlyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="hours" stroke="#3B82F6" strokeWidth={2} name="Giờ học" />
                  <Line type="monotone" dataKey="quizzes" stroke="#10B981" strokeWidth={2} name="Quiz hoàn thành" />
                  <Line type="monotone" dataKey="avgScore" stroke="#F59E0B" strokeWidth={2} name="Điểm trung bình" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Category Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChartIcon className="h-5 w-5" />
                  <span>Phân bố theo danh mục</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Timer className="h-5 w-5" />
                  <span>Thời gian học theo giờ</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { time: "6:00 - 9:00", hours: 12.5, percentage: 25 },
                    { time: "9:00 - 12:00", hours: 8.2, percentage: 16 },
                    { time: "12:00 - 15:00", hours: 5.8, percentage: 12 },
                    { time: "15:00 - 18:00", hours: 15.3, percentage: 31 },
                    { time: "18:00 - 21:00", hours: 18.7, percentage: 38 },
                    { time: "21:00 - 24:00", hours: 9.2, percentage: 18 },
                  ].map((slot, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium w-24">{slot.time}</span>
                        <div className="flex-1">
                          <Progress value={slot.percentage} className="h-2" />
                        </div>
                      </div>
                      <span className="text-sm text-gray-600 w-16 text-right">{slot.hours}h</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Tiến độ kỹ năng</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillProgressData.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: skill.color }}></div>
                        <span className="font-medium">{skill.skill}</span>
                        <Badge variant="outline">{skill.level}</Badge>
                      </div>
                      <span className="text-sm font-medium">{skill.progress}%</span>
                    </div>
                    <Progress value={skill.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kỹ năng mạnh nhất</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillProgressData
                    .sort((a, b) => b.progress - a.progress)
                    .slice(0, 3)
                    .map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100">
                          <span className="text-sm font-bold text-yellow-600">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{skill.skill}</p>
                          <p className="text-sm text-gray-600">{skill.progress}% hoàn thành</p>
                        </div>
                        <Trophy className="h-5 w-5 text-yellow-500" />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cần cải thiện</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {skillProgressData
                    .sort((a, b) => a.progress - b.progress)
                    .slice(0, 3)
                    .map((skill, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-100">
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{skill.skill}</p>
                          <p className="text-sm text-gray-600">{skill.progress}% hoàn thành</p>
                        </div>
                        <Button size="sm" variant="outline">
                          Học thêm
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className={`${achievement.earned ? "border-yellow-200 bg-yellow-50" : ""}`}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${achievement.color}`}>
                      <achievement.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        {achievement.earned && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                      {achievement.earned ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          Đạt được {achievement.date}
                        </Badge>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Tiến độ</span>
                            <span>{achievement.progress}%</span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5" />
                <span>Mục tiêu học tập</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningGoals.map((goal) => (
                  <div key={goal.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{goal.title}</h3>
                        <p className="text-sm text-gray-600">Mục tiêu: {goal.target}</p>
                      </div>
                      <Badge className={getStatusColor(goal.status)}>{getStatusText(goal.status)}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Tiến độ</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Thêm mục tiêu mới</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                      <BookOpen className="h-6 w-6" />
                      <span className="text-sm">Hoàn thành khóa học</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                      <Target className="h-6 w-6" />
                      <span className="text-sm">Đạt điểm số</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                      <Clock className="h-6 w-6" />
                      <span className="text-sm">Thời gian học</span>
                    </Button>
                    <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
                      <Brain className="h-6 w-6" />
                      <span className="text-sm">Phát triển kỹ năng</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Thống kê mục tiêu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tổng mục tiêu</span>
                    <span className="font-semibold">{learningGoals.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Đã hoàn thành</span>
                    <span className="font-semibold text-green-600">
                      {learningGoals.filter((g) => g.progress === 100).length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Đúng tiến độ</span>
                    <span className="font-semibold text-blue-600">
                      {learningGoals.filter((g) => g.status === "on-track").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Chậm tiến độ</span>
                    <span className="font-semibold text-red-600">
                      {learningGoals.filter((g) => g.status === "behind").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
