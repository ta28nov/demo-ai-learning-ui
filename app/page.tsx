import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, BookOpen, MessageCircle, Trophy, Users, Zap, ArrowRight, Play, Star } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">AI Learning</span>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost">Đăng nhập</Button>
            </Link>
            <Link href="/register">
              <Button>Đăng ký</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-accent text-accent-foreground">Được hỗ trợ bởi AI tiên tiến</Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Học thông minh hơn với
            <span className="text-primary"> trợ lý AI</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty leading-relaxed">
            Trải nghiệm học tập cá nhân hóa với gia sư AI thông minh. Nhận phản hồi tức thì, bài kiểm tra tương tác, và
            theo dõi tiến độ của bạn theo thời gian thực.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/login">
              <Button size="lg" className="text-lg px-8 py-6">
                Bắt đầu học ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
              <Play className="mr-2 h-5 w-5" />
              Xem Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">10,000+</div>
              <div className="text-muted-foreground">Học viên tích cực</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-muted-foreground">Khóa học chất lượng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-muted-foreground">Tỷ lệ hài lòng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Tính năng mạnh mẽ</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Khám phá các công cụ giúp việc học trở nên hiệu quả và hấp dẫn hơn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-border bg-card">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-foreground">Gia sư AI</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Trợ lý AI cá nhân hóa luôn sẵn sàng 24/7 để giúp bạn học tập hiệu quả
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-border bg-card">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-foreground">Khóa học đa dạng</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Hàng trăm khóa học từ cơ bản đến nâng cao trong nhiều lĩnh vực khác nhau
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-border bg-card">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-foreground">Chat tương tác</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Trò chuyện trực tiếp với AI, đặt câu hỏi và nhận câu trả lời ngay lập tức
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-border bg-card">
              <CardHeader>
                <Trophy className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-foreground">Bài kiểm tra thông minh</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Bài kiểm tra được tạo bởi AI với phản hồi chi tiết và giải thích rõ ràng
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-border bg-card">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-foreground">Cộng đồng học tập</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Kết nối với hàng nghìn học viên có cùng mục tiêu học tập
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow border-border bg-card">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-foreground">Theo dõi tiến độ</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Dashboard chi tiết để theo dõi hành trình học tập của bạn
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Học viên nói gì về chúng tôi</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Gia sư AI đã thay đổi hoàn toàn cách tôi học. Phản hồi tức thì và sự trợ giúp cá nhân hóa giúp tôi
                  tiến bộ nhanh chóng."
                </p>
                <div className="font-semibold text-foreground">Nguyễn Thị Hương</div>
                <div className="text-sm text-muted-foreground">Sinh viên Khoa học Máy tính</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Giao diện thân thiện, nội dung chất lượng. Tôi đã hoàn thành 5 khóa học trong 3 tháng."
                </p>
                <div className="font-semibold text-foreground">Trần Minh Tuấn</div>
                <div className="text-sm text-muted-foreground">Quản lý Marketing</div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Hệ thống bài kiểm tra và theo dõi tiến độ rất chi tiết. Tôi luôn biết mình đang ở đâu trong hành
                  trình học tập."
                </p>
                <div className="font-semibold text-foreground">Lê Thị Mai</div>
                <div className="text-sm text-muted-foreground">Chuyên viên Phân tích Dữ liệu</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Sẵn sàng bắt đầu hành trình học tập?</h2>
          <p className="text-xl mb-8 opacity-90">Tham gia cùng hàng nghìn học viên tin tưởng AI Learning</p>
          <Link href="/register">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Bắt đầu miễn phí
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold text-foreground">AI Learning</span>
              </div>
              <p className="text-muted-foreground">
                Nền tảng học tập AI tiên tiến, mang đến trải nghiệm học tập tốt nhất.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Sản phẩm</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/login" className="hover:text-foreground transition-colors">
                    Gia sư AI
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-foreground transition-colors">
                    Bài kiểm tra
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-foreground transition-colors">
                    Theo dõi tiến độ
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-foreground transition-colors">
                    Tài nguyên
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Hỗ trợ</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Trung tâm trợ giúp
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Liên hệ
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-foreground transition-colors">
                    Câu hỏi thường gặp
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-foreground">Công ty</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-foreground transition-colors">
                    Tuyển dụng
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Chính sách bảo mật
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Điều khoản dịch vụ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 AI Learning. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
