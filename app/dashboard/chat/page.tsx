"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Brain,
  Send,
  Paperclip,
  Mic,
  MicOff,
  ImageIcon,
  FileText,
  Lightbulb,
  BookOpen,
  Calculator,
  Code,
  Sparkles,
  MessageCircle,
  Clock,
} from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  type?: "text" | "code" | "image" | "file"
  suggestions?: string[]
}

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Xin chào! Tôi là AI Tutor của bạn. Tôi có thể giúp bạn học tập, giải đáp thắc mắc, và hỗ trợ làm bài tập. Bạn muốn học về chủ đề gì hôm nay?",
    sender: "ai",
    timestamp: new Date(),
    suggestions: ["Lập trình Python", "Machine Learning", "Toán học", "Tiếng Anh", "Khoa học"],
  },
]

const quickActions = [
  { icon: BookOpen, label: "Giải thích khái niệm", color: "bg-blue-500" },
  { icon: Calculator, label: "Giải bài toán", color: "bg-green-500" },
  { icon: Code, label: "Review code", color: "bg-purple-500" },
  { icon: Lightbulb, label: "Gợi ý học tập", color: "bg-yellow-500" },
]

const sampleQuestions = [
  "Python là gì và tại sao nó phổ biến?",
  "Giải thích thuật toán sắp xếp nổi bọt",
  "Sự khác biệt giữa Machine Learning và Deep Learning?",
  "Cách tối ưu hóa hiệu suất website?",
  "Giải phương trình bậc hai: x² + 5x + 6 = 0",
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: "ai",
        timestamp: new Date(),
        suggestions: generateSuggestions(inputMessage),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (input: string): string => {
    const responses = [
      "Đây là một câu hỏi rất hay! Để giải thích điều này, tôi sẽ chia nhỏ thành các phần dễ hiểu...",
      "Tôi hiểu bạn đang quan tâm đến chủ đề này. Hãy cùng khám phá từng bước một...",
      "Câu hỏi của bạn liên quan đến một khái niệm quan trọng. Để bắt đầu...",
      "Rất tốt khi bạn hỏi về điều này! Đây là cách tôi sẽ giải thích...",
      "Tôi có thể giúp bạn hiểu rõ hơn về vấn đề này. Trước tiên...",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const generateSuggestions = (input: string): string[] => {
    const suggestions = [
      "Cho tôi ví dụ cụ thể",
      "Giải thích chi tiết hơn",
      "So sánh với khái niệm khác",
      "Ứng dụng thực tế như thế nào?",
      "Có bài tập thực hành không?",
    ]
    return suggestions.slice(0, 3)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
    inputRef.current?.focus()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    // Implement voice recording logic here
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/ai-tutor-avatar.png" />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Brain className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <div>
                  <CardTitle className="text-lg">AI Tutor</CardTitle>
                  <p className="text-sm text-gray-500">Trợ lý học tập thông minh</p>
                </div>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Sparkles className="mr-1 h-3 w-3" />
                Đang hoạt động
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex space-x-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                    >
                      <Avatar className="h-8 w-8 flex-shrink-0">
                        {message.sender === "ai" ? (
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            <Brain className="h-4 w-4" />
                          </AvatarFallback>
                        ) : (
                          <AvatarFallback>U</AvatarFallback>
                        )}
                      </Avatar>
                      <div className="space-y-2">
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.sender === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div
                          className={`flex items-center space-x-2 text-xs text-gray-500 ${message.sender === "user" ? "justify-end" : ""}`}
                        >
                          <Clock className="h-3 w-3" />
                          <span>
                            {message.timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        {message.suggestions && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {message.suggestions.map((suggestion, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="text-xs h-7 bg-transparent"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex space-x-3 max-w-[80%]">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Brain className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Textarea
                    ref={inputRef}
                    placeholder="Nhập câu hỏi hoặc chủ đề bạn muốn học..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[44px] max-h-32 resize-none"
                    rows={1}
                  />
                </div>
                <div className="flex space-x-1">
                  <Button variant="outline" size="sm" className="h-11 w-11 p-0 bg-transparent">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-11 w-11 p-0 bg-transparent">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`h-11 w-11 p-0 ${isRecording ? "bg-red-100 text-red-600" : ""}`}
                    onClick={toggleRecording}
                  >
                    {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim()} className="h-11 px-4">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="w-80 space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hành động nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex-col space-y-2 bg-transparent hover:bg-gray-50"
                  onClick={() => handleSuggestionClick(action.label)}
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <action.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-xs text-center">{action.label}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sample Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Câu hỏi gợi ý</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full text-left justify-start h-auto p-3 text-sm bg-transparent hover:bg-gray-50"
                  onClick={() => handleSuggestionClick(question)}
                >
                  <MessageCircle className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span className="text-wrap">{question}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Capabilities */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Tutor có thể</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { icon: BookOpen, text: "Giải thích khái niệm phức tạp" },
                { icon: Calculator, text: "Giải bài toán từng bước" },
                { icon: Code, text: "Review và sửa code" },
                { icon: FileText, text: "Tạo bài tập thực hành" },
                { icon: Lightbulb, text: "Đưa ra gợi ý học tập" },
                { icon: Brain, text: "Trả lời mọi câu hỏi" },
              ].map((capability, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <capability.icon className="h-4 w-4 text-primary" />
                  <span className="text-sm">{capability.text}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Lịch sử chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { title: "Python Basics", time: "2 giờ trước", messages: 15 },
                { title: "Machine Learning", time: "Hôm qua", messages: 23 },
                { title: "React Components", time: "3 ngày trước", messages: 8 },
                { title: "Database Design", time: "1 tuần trước", messages: 12 },
              ].map((chat, index) => (
                <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{chat.title}</h4>
                    <span className="text-xs text-gray-500">{chat.messages} tin</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{chat.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
