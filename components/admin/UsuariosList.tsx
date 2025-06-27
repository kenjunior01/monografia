import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Usuario {
  id: string;
  nome: string;
  email: string;
  telefone: string;
}

interface UsuariosListProps {
  usuarios: Usuario[];
  setUsuarios: React.Dispatch<React.SetStateAction<Usuario[]>>;
}

export default function UsuariosList({ usuarios, setUsuarios }: UsuariosListProps) {
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [novoTelefone, setNovoTelefone] = useState("");

  const handleSave = (usuarioId: string) => {
    setUsuarios(us => us.map(u => u.id === usuarioId ? { ...u, telefone: novoTelefone } : u));
    setEditandoId(null);
  };

  const handleEdit = (usuario: Usuario) => {
    setEditandoId(usuario.id);
    setNovoTelefone(usuario.telefone);
  };

  const handleCancel = () => {
    setEditandoId(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usuários (Clientes)</CardTitle>
        <CardDescription>Edite o número de WhatsApp dos clientes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Nome</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Telefone/WhatsApp</th>
                <th className="p-2 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-b">
                  <td className="p-2">{usuario.nome}</td>
                  <td className="p-2">{usuario.email}</td>
                  <td className="p-2">
                    {editandoId === usuario.id ? (
                      <Input
                        value={novoTelefone}
                        onChange={e => setNovoTelefone(e.target.value)}
                        className="w-40"
                      />
                    ) : (
                      usuario.telefone
                    )}
                  </td>
                  <td className="p-2">
                    {editandoId === usuario.id ? (
                      <>
                        <Button size="sm" className="mr-2" onClick={() => handleSave(usuario.id)}>Salvar</Button>
                        <Button size="sm" variant="outline" onClick={handleCancel}>Cancelar</Button>
                      </>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => handleEdit(usuario)}>Editar</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}