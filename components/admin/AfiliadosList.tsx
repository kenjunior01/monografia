import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal, UserPlus, DollarSign } from 'lucide-react';

export default function AfiliadosList({ afiliados, onAprovar, onPagar }: any) {
  if (!afiliados || afiliados.length === 0) {
    return <div>A carregar afiliados...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerir Afiliados</CardTitle>
        <CardDescription>Aprove, pague e monitorize os seus afiliados.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Afiliado</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Comissão Pendente</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {afiliados.map((afiliado: any) => (
              <TableRow key={afiliado.id}>
                <TableCell>
                  <div className="font-medium">{afiliado.nome}</div>
                  <div className="text-sm text-muted-foreground">{afiliado.email}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={afiliado.status === 'ativo' ? 'default' : 'destructive'}>{afiliado.status}</Badge>
                </TableCell>
                <TableCell>{afiliado.comissaoPendente}</TableCell>
                <TableCell className="text-right">
                  {afiliado.status !== 'ativo' && (
                    <Button size="sm" onClick={() => onAprovar(afiliado.id)}>
                      <UserPlus className="mr-2 h-4 w-4" /> Aprovar
                    </Button>
                  )}
                  {afiliado.comissaoPendente !== '0 MT' && (
                    <Button size="sm" variant="secondary" className="ml-2" onClick={() => onPagar(afiliado.id)}>
                      <DollarSign className="mr-2 h-4 w-4" /> Pagar
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}