"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  BookOpen,
  MessageCircle,
  Trophy,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  Upload,
  Users,
  GraduationCap,
  Target,
  BookMarked,
} from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

interface SidebarProps {
  className?: string
}

const studentNavigation = [
  { name: "Trang chủ", href: "/dashboard", icon: Home },
  { name: "Khóa học", href: "/dashboard/courses", icon: BookOpen },
  { name: "Khóa học của tôi", href: "/dashboard/my-courses", icon: BookMarked },
  { name: "AI Tutor", href: "/dashboard/chat", icon: MessageCircle },
  { name: "Quiz", href: "/dashboard/quiz", icon: Trophy },
  { name: "Đánh giá năng lực", href: "/dashboard/assessment", icon: Target },
  { name: "Tải lên", href: "/dashboard/upload", icon: Upload },
  { name: "Tiến độ", href: "/dashboard/progress", icon: BarChart3 },
  { name: "Cài đặt", href: "/dashboard/settings", icon: Settings },
]

const instructorNavigation = [
  { name: "Trang chủ", href: "/instructor", icon: Home },
  { name: "Khóa học của tôi", href: "/instructor/courses", icon: BookOpen },
  { name: "Học viên", href: "/instructor/students", icon: Users },
  { name: "Tạo khóa học", href: "/instructor/courses/create", icon: GraduationCap },
  { name: "Cài đặt", href: "/dashboard/settings", icon: Settings },
]

const adminNavigation = [
  { name: "Quản lý người dùng", href: "/admin/users", icon: Users },
  { name: "Quản lý khóa học", href: "/admin/courses", icon: BookOpen },
  { name: "Cài đặt", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar({ className }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState<string>("student")
  const [userName, setUserName] = useState<string>("Người dùng")
  const [userEmail, setUserEmail] = useState<string>("user@example.com")
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const role = localStorage.getItem("userRole") || "student"
    const name = localStorage.getItem("userName") || "Người dùng"
    const email = localStorage.getItem("userEmail") || "user@example.com"
    setUserRole(role)
    setUserName(name)
    setUserEmail(email)
  }, [])

  const navigation =
    userRole === "instructor" ? instructorNavigation : userRole === "admin" ? adminNavigation : studentNavigation

  const isActive = (href: string) => {
    if (href === "/dashboard" || href === "/instructor" || href === "/admin/users") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    localStorage.removeItem("userName")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white shadow-md"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } ${className}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200">
            <Brain className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-primary">AI Learning</span>
          </div>

          {/* User Profile */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/user-avatar.jpg" />
                <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                <p className="text-xs text-gray-500 truncate">{userEmail}</p>
              </div>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  userRole === "admin"
                    ? "bg-purple-100 text-purple-700"
                    : userRole === "instructor"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                }`}
              >
                {userRole === "admin" ? "Admin" : userRole === "instructor" ? "GV" : "HS"}
              </Badge>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="px-4 py-4 border-t border-gray-200">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:text-gray-900"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
