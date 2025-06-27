import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart } from 'lucide-react'; // Assuming you have a chart component

const Analytics = ({ kpis, topAfiliados }) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>Receita Mensal</CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Placeholder for a chart */}
                    <div className="h-64 bg-gray-100 flex items-center justify-center rounded-md">
                        <LineChart className="h-12 w-12 text-gray-400" />
                        <p className="text-gray-500 ml-4">Gráfico de Receita Mensal</p>
                    </div>
                </CardContent>
            </Card>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Performance de Afiliados</CardTitle>
                </CardHeader>
                <CardContent>
                     {/* Placeholder for a chart */}
                    <div className="h-64 bg-gray-100 flex items-center justify-center rounded-md">
                        <BarChart className="h-12 w-12 text-gray-400" />
                        <p className="text-gray-500 ml-4">Gráfico de Performance</p>
                    </div>
                </CardContent>
            </Card>
        </div>

        {/* KPIs */}
        <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {kpis.map((kpi, index) => (
                <Card key={index}>
                    <CardContent className="p-4">
                        <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Top Afiliados */}
        <div className="lg:col-span-3">
            <Card>
                <CardHeader>
                    <CardTitle>Top Afiliados</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {topAfiliados.map((afiliado) => (
                            <div key={afiliado.id} className="flex items-center justify-between">
                                <div className="font-semibold">{afiliado.nome}</div>
                                <div className="text-right">
                                    <div className="font-bold">{afiliado.indicacoes} indicações</div>
                                    <div className="text-sm text-green-600">{afiliado.comissaoTotal}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
);

export default Analytics;