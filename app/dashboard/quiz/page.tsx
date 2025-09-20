"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  Clock,
  CheckCircle,
  XCircle,
  Trophy,
  Target,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Play,
  Pause,
  AlertCircle,
  Star,
  TrendingUp,
  Award,
} from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  difficulty: "Dễ" | "Trung bình" | "Khó"
  category: string
  points: number
}

interface QuizResult {
  questionId: string
  selectedAnswer: number | null
  isCorrect: boolean
  timeSpent: number
}

const sampleQuestions: Question[] = [
  {
    id: "1",
    question: "Python là ngôn ngữ lập trình thuộc loại nào?",
    options: [
      "Ngôn ngữ biên dịch (Compiled)",
      "Ngôn ngữ thông dịch (Interpreted)",
      "Ngôn ngữ assembly",
      "Ngôn ngữ máy",
    ],
    correctAnswer: 1,
    explanation:
      "Python là ngôn ngữ thông dịch, có nghĩa là code được thực thi trực tiếp bởi interpreter mà không cần biên dịch trước.",
    difficulty: "Dễ",
    category: "Python Basics",
    points: 10,
  },
  {
    id: "2",
    question: "Thuật toán nào có độ phức tạp thời gian O(n log n) trong trường hợp trung bình?",
    options: ["Bubble Sort", "Quick Sort", "Selection Sort", "Insertion Sort"],
    correctAnswer: 1,
    explanation:
      "Quick Sort có độ phức tạp thời gian O(n log n) trong trường hợp trung bình và tốt nhất, O(n²) trong trường hợp xấu nhất.",
    difficulty: "Trung bình",
    category: "Algorithms",
    points: 15,
  },
  {
    id: "3",
    question: "Trong Machine Learning, overfitting xảy ra khi nào?",
    options: [
      "Model học quá ít từ dữ liệu training",
      "Model học quá nhiều từ dữ liệu training",
      "Dữ liệu training quá ít",
      "Learning rate quá cao",
    ],
    correctAnswer: 1,
    explanation:
      "Overfitting xảy ra khi model học quá chi tiết từ dữ liệu training, bao gồm cả noise, dẫn đến hiệu suất kém trên dữ liệu mới.",
    difficulty: "Khó",
    category: "Machine Learning",
    points: 20,
  },
  {
    id: "4",
    question: "CSS Flexbox được sử dụng để làm gì?",
    options: ["Tạo animations", "Quản lý layout một chiều", "Tạo responsive images", "Quản lý database"],
    correctAnswer: 1,
    explanation:
      "CSS Flexbox là một layout method được thiết kế để sắp xếp các items trong container theo một chiều (hàng hoặc cột).",
    difficulty: "Dễ",
    category: "Web Development",
    points: 10,
  },
  {
    id: "5",
    question: "Trong React, useState hook trả về gì?",
    options: [
      "Chỉ state value",
      "Chỉ setter function",
      "Array gồm state value và setter function",
      "Object gồm state và methods",
    ],
    correctAnswer: 2,
    explanation: "useState hook trả về một array với 2 elements: state value hiện tại và function để update state đó.",
    difficulty: "Trung bình",
    category: "React",
    points: 15,
  },
]

const quizCategories = [
  { name: "Python Basics", color: "bg-blue-500", questions: 12 },
  { name: "Machine Learning", color: "bg-green-500", questions: 8 },
  { name: "Web Development", color: "bg-purple-500", questions: 15 },
  { name: "Algorithms", color: "bg-orange-500", questions: 10 },
  { name: "React", color: "bg-cyan-500", questions: 7 },
]

export default function QuizPage() {
  const [currentView, setCurrentView] = useState<"categories" | "quiz" | "results">("categories")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: string]: number }>({})
  const [timeLeft, setTimeLeft] = useState(1800) // 30 minutes
  const [isQuizActive, setIsQuizActive] = useState(false)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [showExplanation, setShowExplanation] = useState(false)

  const currentQuestion = sampleQuestions[currentQuestionIndex]
  const totalQuestions = sampleQuestions.length
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isQuizActive && timeLeft > 0 && currentView === "quiz") {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isQuizActive, timeLeft, currentView])

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeLeft === 0 && isQuizActive) {
      handleSubmitQuiz()
    }
  }, [timeLeft, isQuizActive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const startQuiz = (category: string) => {
    setSelectedCategory(category)
    setCurrentView("quiz")
    setIsQuizActive(true)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setTimeLeft(1800)
    setShowExplanation(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answerIndex,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setShowExplanation(false)
    } else {
      handleSubmitQuiz()
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1)
      setShowExplanation(false)
    }
  }

  const handleSubmitQuiz = () => {
    setIsQuizActive(false)
    const results: QuizResult[] = sampleQuestions.map((question) => ({
      questionId: question.id,
      selectedAnswer: selectedAnswers[question.id] ?? null,
      isCorrect: selectedAnswers[question.id] === question.correctAnswer,
      timeSpent: 0, // Would calculate actual time spent per question
    }))
    setQuizResults(results)
    setCurrentView("results")
  }

  const calculateScore = () => {
    const correctAnswers = quizResults.filter((result) => result.isCorrect).length
    const totalPoints = quizResults.reduce((sum, result, index) => {
      return sum + (result.isCorrect ? sampleQuestions[index].points : 0)
    }, 0)
    const maxPoints = sampleQuestions.reduce((sum, question) => sum + question.points, 0)
    const percentage = Math.round((correctAnswers / totalQuestions) * 100)
    return { correctAnswers, totalPoints, maxPoints, percentage }
  }

  const restartQuiz = () => {
    setCurrentView("categories")
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setQuizResults([])
    setTimeLeft(1800)
    setIsQuizActive(false)
    setShowExplanation(false)
  }

  if (currentView === "categories") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hệ thống Quiz</h1>
            <p className="text-gray-600 mt-2">Kiểm tra kiến thức của bạn với các bài quiz tương tác</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <Trophy className="mr-1 h-4 w-4" />
              Điểm cao nhất: 95%
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Target className="mr-1 h-4 w-4" />
              Đã hoàn thành: 12 quiz
            </Badge>
          </div>
        </div>

        {/* Quiz Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-lg ${category.color}`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="outline">{category.questions} câu hỏi</Badge>
                </div>
                <CardTitle className="text-xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Thời gian: 30 phút</span>
                    <span>Điểm tối đa: 100</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>Dễ: 40%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span>TB: 40%</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>Khó: 20%</span>
                    </div>
                  </div>
                  <Button className="w-full group-hover:bg-primary/90" onClick={() => startQuiz(category.name)}>
                    <Play className="mr-2 h-4 w-4" />
                    Bắt đầu Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Kết quả gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { category: "Python Basics", score: 85, date: "2 giờ trước", status: "Tốt" },
                { category: "Machine Learning", score: 92, date: "Hôm qua", status: "Xuất sắc" },
                { category: "Web Development", score: 78, date: "3 ngày trước", status: "Khá" },
                { category: "React", score: 95, date: "1 tuần trước", status: "Xuất sắc" },
              ].map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium">{result.category}</h4>
                      <p className="text-sm text-gray-500">{result.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge variant={result.score >= 90 ? "default" : result.score >= 70 ? "secondary" : "destructive"}>
                      {result.status}
                    </Badge>
                    <span className="font-bold text-lg">{result.score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentView === "quiz") {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Quiz Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">{selectedCategory}</CardTitle>
                <p className="text-gray-600">
                  Câu hỏi {currentQuestionIndex + 1} / {totalQuestions}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <span className={`font-mono text-lg ${timeLeft < 300 ? "text-red-600" : ""}`}>
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <Button variant="outline" onClick={() => setIsQuizActive(!isQuizActive)}>
                  {isQuizActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Progress value={progress} className="mt-4" />
          </CardHeader>
        </Card>

        {/* Question Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge
                variant="outline"
                className={`${
                  currentQuestion.difficulty === "Dễ"
                    ? "bg-green-100 text-green-800"
                    : currentQuestion.difficulty === "Trung bình"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {currentQuestion.difficulty}
              </Badge>
              <Badge variant="secondary">
                <Star className="mr-1 h-3 w-3" />
                {currentQuestion.points} điểm
              </Badge>
            </div>
            <CardTitle className="text-xl leading-relaxed">{currentQuestion.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={selectedAnswers[currentQuestion.id]?.toString()}
              onValueChange={(value) => handleAnswerSelect(Number.parseInt(value))}
              className="space-y-4"
            >
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {showExplanation && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900">Giải thích</h4>
                    <p className="text-blue-800 mt-1">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Câu trước
          </Button>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowExplanation(!showExplanation)}
              disabled={!selectedAnswers[currentQuestion.id]}
            >
              {showExplanation ? "Ẩn giải thích" : "Xem giải thích"}
            </Button>
            <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestion.id]}>
              {currentQuestionIndex === totalQuestions - 1 ? "Hoàn thành" : "Câu tiếp theo"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Question Navigator */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Điều hướng câu hỏi</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 gap-2">
              {sampleQuestions.map((_, index) => (
                <Button
                  key={index}
                  variant={index === currentQuestionIndex ? "default" : "outline"}
                  size="sm"
                  className={`h-10 w-10 p-0 ${
                    selectedAnswers[sampleQuestions[index].id] !== undefined ? "bg-green-100 border-green-300" : ""
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentView === "results") {
    const { correctAnswers, totalPoints, maxPoints, percentage } = calculateScore()

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Results Header */}
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              {percentage >= 90 ? (
                <div className="p-4 bg-green-100 rounded-full">
                  <Trophy className="h-12 w-12 text-green-600" />
                </div>
              ) : percentage >= 70 ? (
                <div className="p-4 bg-blue-100 rounded-full">
                  <Award className="h-12 w-12 text-blue-600" />
                </div>
              ) : (
                <div className="p-4 bg-orange-100 rounded-full">
                  <Target className="h-12 w-12 text-orange-600" />
                </div>
              )}
            </div>
            <CardTitle className="text-3xl">
              {percentage >= 90 ? "Xuất sắc!" : percentage >= 70 ? "Tốt lắm!" : "Cần cố gắng thêm!"}
            </CardTitle>
            <p className="text-gray-600 text-lg">Bạn đã hoàn thành quiz {selectedCategory}</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-primary">{percentage}%</div>
                <div className="text-sm text-gray-600">Điểm số</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-green-600">{correctAnswers}</div>
                <div className="text-sm text-gray-600">Câu đúng</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-red-600">{totalQuestions - correctAnswers}</div>
                <div className="text-sm text-gray-600">Câu sai</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-blue-600">{totalPoints}</div>
                <div className="text-sm text-gray-600">Tổng điểm</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Chi tiết kết quả</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleQuestions.map((question, index) => {
                const result = quizResults[index]
                const isCorrect = result.isCorrect
                const selectedAnswer = result.selectedAnswer

                return (
                  <div key={question.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium">Câu {index + 1}:</span>
                          {isCorrect ? (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                          <Badge
                            variant="outline"
                            className={`${
                              question.difficulty === "Dễ"
                                ? "bg-green-100 text-green-800"
                                : question.difficulty === "Trung bình"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {question.difficulty}
                          </Badge>
                        </div>
                        <p className="text-gray-900 mb-3">{question.question}</p>
                        <div className="space-y-2">
                          {question.options.map((option, optionIndex) => (
                            <div
                              key={optionIndex}
                              className={`p-2 rounded border ${
                                optionIndex === question.correctAnswer
                                  ? "bg-green-100 border-green-300"
                                  : selectedAnswer === optionIndex && !isCorrect
                                    ? "bg-red-100 border-red-300"
                                    : "bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                {optionIndex === question.correctAnswer && (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                                {selectedAnswer === optionIndex && !isCorrect && (
                                  <XCircle className="h-4 w-4 text-red-600" />
                                )}
                                <span>{option}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-lg font-bold ${isCorrect ? "text-green-600" : "text-red-600"}`}>
                          {isCorrect ? `+${question.points}` : "0"}
                        </div>
                        <div className="text-sm text-gray-500">điểm</div>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded p-3">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div>
                          <h5 className="font-medium text-blue-900 text-sm">Giải thích:</h5>
                          <p className="text-blue-800 text-sm">{question.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-center space-x-4">
          <Button variant="outline" onClick={restartQuiz}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Làm lại Quiz
          </Button>
          <Button onClick={() => setCurrentView("categories")}>
            <TrendingUp className="mr-2 h-4 w-4" />
            Xem thống kê
          </Button>
        </div>
      </div>
    )
  }

  return null
}
