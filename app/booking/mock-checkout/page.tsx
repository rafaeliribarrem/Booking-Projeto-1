"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function MockCheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const sessionId = searchParams.get("session");
  const amount = parseInt(searchParams.get("amount") || "1500");

  const [processing, setProcessing] = useState(false);

  const handlePay = async () => {
    setProcessing(true);

    // Simula processamento de pagamento
    try {
      const response = await fetch("/api/booking/confirm-mock-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingId, sessionId, amount }),
      });

      if (response.ok) {
        // Simula delay de processamento
        setTimeout(() => {
          router.push("/account?paid=1");
        }, 1500);
      } else {
        alert("Erro ao processar pagamento. Tente novamente.");
        setProcessing(false);
      }
    } catch (error) {
      alert("Erro ao processar pagamento. Tente novamente.");
      setProcessing(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const formattedAmount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800 font-medium">
          🎓 Modo de Desenvolvimento
        </p>
        <p className="text-xs text-yellow-700 mt-1">
          Este é um sistema de pagamento simulado. Nenhuma transação real será processada.
          Use qualquer informação nos campos abaixo.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pagamento Seguro (Simulado)</CardTitle>
          <CardDescription>
            Complete os dados abaixo para finalizar sua reserva
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cardNumber">Número do Cartão</Label>
            <Input
              id="cardNumber"
              placeholder="4242 4242 4242 4242"
              defaultValue="4242 4242 4242 4242"
              disabled={processing}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Validade</Label>
              <Input
                id="expiry"
                placeholder="MM/AA"
                defaultValue="12/25"
                disabled={processing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                defaultValue="123"
                disabled={processing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nome no Cartão</Label>
            <Input
              id="name"
              placeholder="João Silva"
              defaultValue="João Silva"
              disabled={processing}
            />
          </div>

          <Separator className="my-6" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Aula Drop-in</span>
              <span>{formattedAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Taxa de processamento</span>
              <span className="text-green-600">R$ 0,00</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>{formattedAmount}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={processing}
            className="flex-1"
          >
            Cancelar
          </Button>
          <Button
            onClick={handlePay}
            disabled={processing}
            className="flex-1"
          >
            {processing ? "Processando..." : `Pagar ${formattedAmount}`}
          </Button>
        </CardFooter>
      </Card>

      <p className="text-xs text-center text-muted-foreground mt-4">
        Ambiente de teste - Nenhum cartão real será cobrado
      </p>
    </div>
  );
}
