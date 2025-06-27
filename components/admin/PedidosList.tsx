import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'em-andamento':
      return 'bg-blue-100 text-blue-800';
    case 'concluido':
      return 'bg-green-100 text-green-800';
    case 'revisao':
      return 'bg-yellow-100 text-yellow-800';
    case 'aguardando-especialista':
      return 'bg-red-100 text-red-800';
    case 'aguardando-pagamento':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'em-andamento':
      return 'Em Desenvolvimento';
    case 'concluido':
      return 'Concluído';
    case 'revisao':
      return 'Em Revisão';
    case 'aguardando-especialista':
      return 'Aguardando Especialista';
    case 'aguardando-pagamento':
      return 'Aguardando Pagamento';
    default:
      return 'Pendente';
  }
};

export default function PedidosList({ pedidos }: any) {
  if (!pedidos || pedidos.length === 0) {
    return <div>A carregar pedidos...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Últimos Pedidos</CardTitle>
        <CardDescription>Acompanhe os pedidos mais recentes da plataforma.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden md:table-cell">Tema</TableHead>
              <TableHead className="hidden lg:table-cell">Nível/Área</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Valor</TableHead>
              <TableHead className="hidden lg:table-cell">Prazo</TableHead>
              <TableHead className="hidden md:table-cell">Especialista</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pedidos.map((pedido: any) => (
              <TableRow key={pedido.id}>
                <TableCell>
                  <div className="font-medium">{pedido.cliente}</div>
                  <div className="text-sm text-muted-foreground truncate">{pedido.clienteEmail}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="max-w-[200px] truncate" title={pedido.titulo}>{pedido.titulo}</div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="font-medium">{pedido.nivelCurso}</div>
                  <div className="text-sm text-muted-foreground">{pedido.areaEstudo}</div>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(pedido.status)}>{getStatusText(pedido.status)}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{pedido.valor}</TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="font-medium">{pedido.prazo}</div>
                  <div className="text-xs text-muted-foreground">{pedido.numeroPaginas} páginas</div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="font-medium">{pedido.especialista || 'Não atribuído'}</div>
                </TableCell>
                <TableCell className="text-right">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}