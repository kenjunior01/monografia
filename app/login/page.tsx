"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Sparkles, Shield, Users, Award, UserCheck, Building, GraduationCap } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [tipoUsuario, setTipoUsuario] = useState("cliente")
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, tipoUsuario }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || 'Email ou senha inválidos.');
      }
      // Redirecionamento baseado no tipo de usuário
      switch (tipoUsuario) {
        case "admin":
          router.push("/admin/dashboard")
          break
        case "especialista":
          router.push("/especialista/dashboard")
          break
        case "afiliado":
          router.push("/afiliado/dashboard")
          break
        default:
          router.push("/cliente/dashboard")
          break
      }
    } catch (err: any) {
      setError(err.message || "Erro desconhecido.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">MonografiaPlus</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
            <CardDescription>Entre na sua conta para acompanhar seus pedidos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Sua senha"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Tipo de Acesso:</Label>
                <RadioGroup value={tipoUsuario} onValueChange={setTipoUsuario} className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="cliente" id="cliente" />
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                      <Label htmlFor="cliente" className="text-xs md:text-sm cursor-pointer">Cliente</Label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="especialista" id="especialista" />
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-green-600" />
                      <Label htmlFor="especialista" className="text-xs md:text-sm cursor-pointer">Especialista</Label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="afiliado" id="afiliado" />
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <Label htmlFor="afiliado" className="text-xs md:text-sm cursor-pointer">Afiliado</Label>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                    <RadioGroupItem value="admin" id="admin" />
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-red-600" />
                      <Label htmlFor="admin" className="text-xs md:text-sm cursor-pointer">Admin</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/esqueci-senha" className="text-sm text-blue-600 hover:underline">
                  Esqueci minha senha
                </Link>
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button className="w-full" size="lg" type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Não tem uma conta?{" "}
                <Link href="/cadastro" className="text-blue-600 hover:underline font-medium">
                  Cadastre-se grátis
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Ao entrar, você concorda com nossos</p>
          <div className="space-x-4">
            <Link href="/termos" className="hover:underline">
              Termos de Uso
            </Link>
            <Link href="/privacidade" className="hover:underline">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
