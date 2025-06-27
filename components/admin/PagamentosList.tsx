import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const getStatusVariant = (status) => {
    switch (status) {
        case 'Confirmado': return 'success';
        case 'Pendente': return 'secondary';
        case 'Falhou': return 'destructive';
        default: return 'default';
    }
};

const PagamentosList = ({ pagamentos }) => (
    <Card>
        <CardHeader>
            <CardTitle>Últimas Transações</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {pagamentos.map((pagamento) => (
                    <div key={pagamento.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                            <div>
                                <p className="font-semibold text-gray-800">{pagamento.descricao}</p>
                                <p className="text-sm text-gray-500">{pagamento.data} - ID: {pagamento.id}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold text-lg ${pagamento.valor.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                                {pagamento.valor}
                            </p>
                            <Badge variant={getStatusVariant(pagamento.status)}>{pagamento.status}</Badge>
                        </div>
                    </div>
                ))}
            </div>
            <Button variant="outline" className="w-full mt-4">Ver Histórico Completo</Button>
        </CardContent>
    </Card>
);

export default PagamentosList;