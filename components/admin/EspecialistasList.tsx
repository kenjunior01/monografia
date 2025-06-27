import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, MessageSquare, Star, UserPlus } from "lucide-react";

interface Especialista {
  id: string;
  nome: string;
  email: string;
  status: string;
  pedidosAtivos: number;
  pedidosConcluidos: number;
  avaliacao: number;
  receita: string;
  especialidades: string[];
}

interface EspecialistasListProps {
  especialistas: Especialista[];
}

export default function EspecialistasList({ especialistas }: EspecialistasListProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Gestão de Especialistas</CardTitle>
            <CardDescription>Gerencie a equipe de especialistas e performance</CardDescription>
          </div>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Adicionar Especialista
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {especialistas.map((especialista) => (
            <Card key={especialista.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" />
                    <AvatarFallback>
                      {especialista.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-medium">{especialista.nome}</h3>
                    <p className="text-sm text-gray-600">{especialista.email}</p>
                  </div>
                  <Badge
                    className={
                      especialista.status === "ativo"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {especialista.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span>Pedidos Ativos:</span>
                    <span className="font-medium">{especialista.pedidosAtivos}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Concluídos:</span>
                    <span className="font-medium">{especialista.pedidosConcluidos}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avaliação:</span>
                    <span className="font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      {especialista.avaliacao}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Receita Gerada:</span>
                    <span className="font-medium text-green-600">{especialista.receita}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-1">
                    {especialista.especialidades.map((esp, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {esp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}