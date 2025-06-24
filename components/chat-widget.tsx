The change optimizes the chat widget for mobile responsiveness by adjusting the sizes and paddings based on screen size.
\`\`\`

\`\`\`replit_final_file
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Send, X, Minimize2 } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "support"
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Como posso ajudá-lo hoje?",
      sender: "support",
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setNewMessage("")

    // Simular resposta automática
    setTimeout(() => {
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Obrigado pela sua mensagem! Nossa equipe responderá em breve.",
        sender: "support",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, supportMessage])
    }, 1000)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg z-50"
        size="lg"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className={`transition-all duration-300 ${isMinimized ? "w-14 h-14 md:w-16 md:h-16" : "w-72 h-80 md:w-80 md:h-96"}`}>
        <CardHeader
          className="flex flex-row items-center justify-between p-3 md:p-4 cursor-pointer bg-blue-600 text-white rounded-t-lg"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center gap-2">
            {!isMinimized && (
              <>
                <MessageSquare className="h-4 w-4 md:h-5 md:w-5" />
                <div>
                  <CardTitle className="text-xs md:text-sm">Suporte Online</CardTitle>
                  <CardDescription className="text-xs text-blue-100">
                    Como podemos ajudar?
                  </CardDescription>
                </div>
              </>
            )}
            {isMinimized && <MessageSquare className="h-5 w-5 md:h-6 md:w-6 mx-auto" />}
          </div>
          {!isMinimized && (
            <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 p-1">
              <X className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          )}
        </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-80">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`flex items-start gap-2 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">{message.sender === "user" ? "U" : "S"}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-2 text-sm ${
                        message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button onClick={sendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
    </div>
  )
}
