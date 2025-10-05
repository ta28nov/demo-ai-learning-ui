"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, Eye, EyeOff, ArrowLeft, User, GraduationCap, Shield } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const DEMO_ACCOUNTS = [
  {
    role: "student",
    name: "Học sinh",
    email: "student@ailearning.com",
    password: "student123",
    icon: User,
    color: "blue",
    redirect: "/dashboard",
  },
  {
    role: "instructor",
    name: "Giảng viên",
    email: "instructor@ailearning.com",
    password: "instructor123",
    icon: GraduationCap,
    color: "green",
    redirect: "/instructor",
  },
  {
    role: "admin",
    name: "Quản trị viên",
    email: "admin@ailearning.com",
    password: "admin123",
    icon: Shield,
    color: "purple",
    redirect: "/admin/users",
  },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setEmail("student@ailearning.com")
    setPassword("student123")
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const account = DEMO_ACCOUNTS.find((acc) => acc.email === email && acc.password === password)

    if (account) {
      // Lưu thông tin vai trò vào localStorage
      localStorage.setItem("userRole", account.role)
      localStorage.setItem("userEmail", account.email)
      localStorage.setItem("userName", account.name)

      // Chuyển hướng đến dashboard tương ứng
      router.push(account.redirect)
    } else {
      alert("Email hoặc mật khẩu không đúng. Vui lòng sử dụng một trong các tài khoản demo.")
    }
  }

  const fillCredentials = (account: (typeof DEMO_ACCOUNTS)[0]) => {
    setEmail(account.email)
    setPassword(account.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Quay lại trang chủ
        </Link>

        <div className="mb-6 space-y-3">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Tài khoản Demo - Chọn vai trò để xem:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {DEMO_ACCOUNTS.map((account) => {
              const Icon = account.icon
              const colorClasses = {
                blue: "border-blue-200 bg-blue-50 text-blue-700",
                green: "border-green-200 bg-green-50 text-green-700",
                purple: "border-purple-200 bg-purple-50 text-purple-700",
              }
              const buttonClasses = {
                blue: "border-blue-300 text-blue-700 hover:bg-blue-100",
                green: "border-green-300 text-green-700 hover:bg-green-100",
                purple: "border-purple-300 text-purple-700 hover:bg-purple-100",
              }

              return (
                <Card
                  key={account.role}
                  className={`border-2 ${colorClasses[account.color as keyof typeof colorClasses]}`}
                >
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-full ${colorClasses[account.color as keyof typeof colorClasses]}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <h4 className="font-semibold">{account.name}</h4>
                      </div>
                      <div className="text-xs space-y-1">
                        <p>Email: {account.email}</p>
                        <p>Mật khẩu: {account.password}</p>
                      </div>
                      <Button
                        onClick={() => fillCredentials(account)}
                        size="sm"
                        variant="outline"
                        className={`w-full ${buttonClasses[account.color as keyof typeof buttonClasses]} bg-transparent`}
                      >
                        Điền nhanh
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Brain className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Chào mừng trở lại!</CardTitle>
            <CardDescription className="text-base">Đăng nhập để tiếp tục hành trình học tập của bạn</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label htmlFor="remember" className="text-sm">
                    Ghi nhớ đăng nhập
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>

              <Button type="submit" className="w-full h-11 text-base">
                Đăng nhập
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-11 bg-transparent">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button variant="outline" className="h-11 bg-transparent">
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="text-gray-600">Chưa có tài khoản? </span>
              <Link href="/register" className="text-primary font-medium hover:underline">
                Đăng ký ngay
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
