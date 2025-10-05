"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Brain, CheckCircle2, ArrowRight, Target, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function AssessmentPage() {
  const [step, setStep] = useState<"intro" | "questions" | "result">("intro")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")

  const questions = [
    {
      id: 1,
      question: "Bạn có kinh nghiệm lập trình chưa?",
      options: [
        { value: "none", label: "Chưa có kinh nghiệm", level: "beginner" },
        { value: "basic", label: "Biết cơ bản", level: "intermediate" },
        { value: "intermediate", label: "Có kinh nghiệm trung bình", level: "intermediate" },
        { value: "advanced", label: "Có kinh nghiệm cao", level: "advanced" },
      ],
    },
    {
      id: 2,
      question: "Bạn đã học qua ngôn ngữ lập trình nào?",
      options: [
        { value: "none", label: "Chưa học ngôn ngữ nào", level: "beginner" },
        { value: "one", label: "1 ngôn ngữ", level: "beginner" },
        { value: "few", label: "2-3 ngôn ngữ", level: "intermediate" },
        { value: "many", label: "Nhiều hơn 3 ngôn ngữ", level: "advanced" },
      ],
    },
    {
      id: 3,
      question: "Bạn có thể giải quyết vấn đề logic phức tạp không?",
      options: [
        { value: "no", label: "Chưa thể", level: "beginner" },
        { value: "simple", label: "Vấn đề đơn giản", level: "beginner" },
        { value: "moderate", label: "Vấn đề trung bình", level: "intermediate" },
        { value: "complex", label: "Vấn đề phức tạp", level: "advanced" },
      ],
    },
    {
      id: 4,
      question: "Mục tiêu học tập của bạn là gì?",
      options: [
        { value: "hobby", label: "Học cho vui", level: "beginner" },
        { value: "career", label: "Chuyển đổi nghề nghiệp", level: "intermediate" },
        { value: "advance", label: "Nâng cao kỹ năng", level: "intermediate" },
        { value: "expert", label: "Trở thành chuyên gia", level: "advanced" },
      ],
    },
    {
      id: 5,
      question: "Bạn có thể dành bao nhiêu thời gian học mỗi tuần?",
      options: [
        { value: "1-3", label: "1-3 giờ/tuần", level: "beginner" },
        { value: "4-7", label: "4-7 giờ/tuần", level: "beginner" },
        { value: "8-15", label: "8-15 giờ/tuần", level: "intermediate" },
        { value: "15+", label: "Hơn 15 giờ/tuần", level: "advanced" },
      ],
    },
  ]

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers({ ...answers, [currentQuestion]: selectedAnswer })
      setSelectedAnswer("")

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setStep("result")
      }
    }
  }

  const calculateLevel = () => {
    const levels = Object.values(answers).map((answer) => {
      const question = questions.find((q) => q.options.some((opt) => opt.value === answer))
      const option = question?.options.find((opt) => opt.value === answer)
      return option?.level || "beginner"
    })

    const levelCounts = levels.reduce(
      (acc, level) => {
        acc[level] = (acc[level] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    if (levelCounts.advanced >= 3) return "advanced"
    if (levelCounts.intermediate >= 3) return "intermediate"
    return "beginner"
  }

  const getRecommendations = (level: string) => {
    const recommendations = {
      beginner: [
        { title: "Lập trình Python cơ bản", duration: "8 tuần", difficulty: "Dễ" },
        { title: "HTML & CSS cho người mới", duration: "6 tuần", difficulty: "Dễ" },
        { title: "Tư duy lập trình", duration: "4 tuần", difficulty: "Dễ" },
      ],
      intermediate: [
        { title: "JavaScript nâng cao", duration: "10 tuần", difficulty: "Trung bình" },
        { title: "React & Next.js", duration: "12 tuần", difficulty: "Trung bình" },
        { title: "Node.js Backend", duration: "10 tuần", difficulty: "Trung bình" },
      ],
      advanced: [
        { title: "Machine Learning với TensorFlow", duration: "16 tuần", difficulty: "Khó" },
        { title: "System Design & Architecture", duration: "14 tuần", difficulty: "Khó" },
        { title: "DevOps & Cloud Computing", duration: "12 tuần", difficulty: "Khó" },
      ],
    }
    return recommendations[level as keyof typeof recommendations] || recommendations.beginner
  }

  if (step === "intro") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-2">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl">Đánh giá năng lực đầu vào</CardTitle>
            <CardDescription className="text-lg">
              Hoàn thành bài test ngắn để chúng tôi hiểu rõ trình độ và gợi ý khóa học phù hợp nhất cho bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">5</div>
                <div className="text-sm text-muted-foreground">Câu hỏi</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">5-7</div>
                <div className="text-sm text-muted-foreground">Phút</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">Miễn phí</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Đánh giá chính xác</div>
                  <div className="text-sm text-muted-foreground">
                    Hệ thống AI phân tích và đánh giá trình độ của bạn
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Gợi ý cá nhân hóa</div>
                  <div className="text-sm text-muted-foreground">
                    Nhận danh sách khóa học phù hợp với mục tiêu của bạn
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium">Lộ trình học tập</div>
                  <div className="text-sm text-muted-foreground">Xây dựng lộ trình học tập tối ưu dựa trên kết quả</div>
                </div>
              </div>
            </div>

            <Button onClick={() => setStep("questions")} className="w-full" size="lg">
              Bắt đầu đánh giá
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (step === "questions") {
    const progress = ((currentQuestion + 1) / questions.length) * 100

    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Câu hỏi {currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{questions[currentQuestion].question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {questions[currentQuestion].options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 p-4 rounded-lg border-2 hover:border-primary transition-colors cursor-pointer"
                  onClick={() => setSelectedAnswer(option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex gap-3 pt-4">
              {currentQuestion > 0 && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setCurrentQuestion(currentQuestion - 1)
                    setSelectedAnswer(answers[currentQuestion - 1] || "")
                  }}
                >
                  Quay lại
                </Button>
              )}
              <Button onClick={handleNext} disabled={!selectedAnswer} className="flex-1">
                {currentQuestion < questions.length - 1 ? "Tiếp theo" : "Hoàn thành"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const level = calculateLevel()
  const recommendations = getRecommendations(level)
  const levelInfo = {
    beginner: {
      title: "Người mới bắt đầu",
      description: "Bạn đang ở giai đoạn khởi đầu. Hãy tập trung vào nền tảng!",
      color: "bg-green-500",
    },
    intermediate: {
      title: "Trung cấp",
      description: "Bạn đã có nền tảng tốt. Đã đến lúc nâng cao kỹ năng!",
      color: "bg-blue-500",
    },
    advanced: {
      title: "Nâng cao",
      description: "Bạn có trình độ cao. Hãy thử thách bản thân với các khóa học chuyên sâu!",
      color: "bg-purple-500",
    },
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <Card className="border-2">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div
              className={`h-20 w-20 rounded-full ${levelInfo[level as keyof typeof levelInfo].color} flex items-center justify-center`}
            >
              <Target className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl">Kết quả đánh giá</CardTitle>
          <CardDescription className="text-lg">Chúc mừng! Bạn đã hoàn thành bài đánh giá năng lực</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center p-6 bg-muted rounded-lg">
            <Badge className="mb-2" variant="secondary">
              Trình độ của bạn
            </Badge>
            <div className="text-2xl font-bold mb-2">{levelInfo[level as keyof typeof levelInfo].title}</div>
            <p className="text-muted-foreground">{levelInfo[level as keyof typeof levelInfo].description}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">Khóa học được gợi ý cho bạn</h3>
            </div>
            <div className="grid gap-4">
              {recommendations.map((course, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{course.title}</h4>
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <span>Thời lượng: {course.duration}</span>
                          <span>Độ khó: {course.difficulty}</span>
                        </div>
                      </div>
                      <Button size="sm">Xem chi tiết</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Link href="/dashboard/courses" className="flex-1">
              <Button className="w-full" size="lg">
                Khám phá khóa học
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg">
                Về Dashboard
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
