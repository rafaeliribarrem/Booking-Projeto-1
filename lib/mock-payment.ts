/**
 * Sistema de pagamento simulado para desenvolvimento/aprendizado
 * Simula o fluxo completo de pagamento sem processar transações reais
 */

// Preços simulados (em centavos)
export const MOCK_PRICES = {
  DROPIN: 1500, // $15.00
  PACK_5: 6500, // $65.00
  UNLIMITED_MONTH: 12000, // $120.00
} as const;

export type MockPaymentType = keyof typeof MOCK_PRICES;

/**
 * Simula a criação de uma sessão de checkout
 * Em produção real, isso seria Stripe/PayPal/etc
 */
export function createMockCheckoutSession(params: {
  bookingId: string;
  priceType: MockPaymentType;
  userId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const sessionId = `mock_session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  const amount = MOCK_PRICES[params.priceType];

  return {
    id: sessionId,
    url: `/booking/mock-checkout?session=${sessionId}&bookingId=${params.bookingId}&amount=${amount}`,
    amountCents: amount,
    currency: "usd",
  };
}

/**
 * Simula o processamento de um pagamento
 * Em produção real, isso seria confirmado via webhook do provedor de pagamento
 */
export async function processMockPayment(sessionId: string) {
  // Simula delay de processamento
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simula 95% de sucesso, 5% de falha para tornar realista
  const success = Math.random() > 0.05;

  return {
    success,
    sessionId,
    timestamp: new Date(),
  };
}

/**
 * Formata valores monetários para exibição
 */
export function formatCurrency(cents: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
  }).format(cents / 100);
}
