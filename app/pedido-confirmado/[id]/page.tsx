"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, ArrowLeft } from 'lucide-react'

// Simulação de um tipo de Pedido
type Pedido = {
  id: string;
  numero_pedido: string;
  titulo: string;
  valor_total: number;
  data_pedido: string;
};

export default function PedidoConfirmadoPage() {
  const params = useParams()
  const id = params.id as string
  const [pedido, setPedido] = useState<Pedido | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (id) {
      // Em um cenário real, você buscaria os detalhes do pedido da sua API
      // Aqui, vamos simular a busca para exibir os dados
      const fetchPedido = async () => {
        try {
          // Simulação de chamada à API
          const response = await fetch(`/api/pedidos`)
          const result = await response.json()

          if (result.success) {
            const pedidoEncontrado = result.data.find((p: any) => p.id === id)
            if (pedidoEncontrado) {
              setPedido(pedidoEncontrado)
            } else {
              setError('Pedido não encontrado.')
            }
          } else {
            setError('Erro ao buscar detalhes do pedido.')
          }
        } catch (err) {
          setError('Erro de rede ao buscar o pedido.')
        } finally {
          setLoading(false)
        }
      }

      fetchPedido()
    }
  }, [id])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full text-center shadow-lg">
        <CardHeader className="bg-green-500 text-white p-6 rounded-t-lg">
          <div className="mx-auto bg-white rounded-full h-16 w-16 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <CardTitle className="text-2xl mt-4">Pedido Confirmado com Sucesso!</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-gray-600 mb-4">
            Obrigado! Recebemos o seu pedido e entraremos em contato em breve.
          </p>
          {pedido && (
            <div className="text-left bg-gray-50 p-4 rounded-lg border">
              <h3 className="font-bold mb-2">Detalhes do Pedido:</h3>
              <p><strong>Nº do Pedido:</strong> {pedido.numero_pedido}</p>
              <p><strong>Título:</strong> {pedido.titulo}</p>
              <p><strong>Valor Total:</strong> {pedido.valor_total ? `${pedido.valor_total.toLocaleString()} MT` : 'N/A'}</p>
              <p><strong>Data:</strong> {new Date(pedido.data_pedido).toLocaleDateString()}</p>
            </div>
          )}
          <Link href="/dashboard">
            <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
              Acompanhar Meus Pedidos
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="mt-2 w-full">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar à Página Inicial
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
