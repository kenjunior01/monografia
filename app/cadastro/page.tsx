"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { GraduationCap, User, Mail, Lock, Eye, EyeOff, Phone, Users } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function CadastroPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    confirmPassword: ""
  })
  const [tipoUsuario, setTipoUsuario] = useState("cliente")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (form.password !== form.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          password: form.password,
          tipo: tipoUsuario,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.error || 'Ocorreu um erro ao registar.');
      }
      // Redireciona para o painel correto
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
            <CardTitle className="text-2xl">Criar conta</CardTitle>
            <CardDescription>Cadastre-se para começar a fazer seus pedidos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nome">Nome completo</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="nome" placeholder="Seu nome completo" className="pl-10" value={form.nome} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" value={form.email} onChange={handleChange} />
                </div>
              </div>

              {/* Exibe telefone/whatsapp apenas se não for cliente */}
              {tipoUsuario !== "cliente" && (
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone/WhatsApp</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="telefone" placeholder="(11) 99999-9999" className="pl-10" value={form.telefone} onChange={handleChange} />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Mínimo 8 caracteres"
                    className="pl-10 pr-10"
                    value={form.password}
                    onChange={handleChange}
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

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirme sua senha"
                    className="pl-10 pr-10"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Tipo de Conta:</Label>
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
                      <User className="h-4 w-4 text-green-600" />
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
                      <Lock className="h-4 w-4 text-red-600" />
                      <Label htmlFor="admin" className="text-xs md:text-sm cursor-pointer">Admin</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  Concordo com os{" "}
                  <Link href="/termos" className="text-blue-600 hover:underline">
                    Termos de Uso
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacidade" className="text-blue-600 hover:underline">
                    Política de Privacidade
                  </Link>
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="newsletter" />
                <Label htmlFor="newsletter" className="text-sm">
                  Quero receber ofertas e novidades por email
                </Label>
              </div>

              {error && <div className="text-red-600 text-sm">{error}</div>}
              <Button className="w-full" size="lg" type="submit" disabled={loading}>
                {loading ? "Criando conta..." : "Criar conta"}
              </Button>
            </form>

            <Separator />

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link href="/login" className="text-blue-600 hover:underline font-medium">
                  Faça login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
