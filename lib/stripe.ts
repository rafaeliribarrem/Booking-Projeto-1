type StripeCheckoutSession = {
  id: string;
  url: string | null;
  [key: string]: unknown;
};

type StripeInstance = {
  checkout: {
    sessions: {
      create: (params: {
        mode: string;
        line_items: Array<{ price: string; quantity: number }>;
        success_url: string;
        cancel_url: string;
        metadata?: Record<string, string>;
        customer_email?: string;
      }) => Promise<StripeCheckoutSession>;
    };
    webhooks: {
      constructEvent: (
        body: string,
        signature: string,
        secret: string
      ) => { type: string; data: { object: unknown } };
    };
  };
};

type StripeModule = {
  default: new (
    apiKey: string,
    config: { apiVersion: string }
  ) => StripeInstance;
};

export async function getStripe(): Promise<StripeInstance> {
  const mod = (await import("stripe")) as unknown as StripeModule;
  const Stripe = mod.default;
  return new Stripe(process.env.STRIPE_SECRET_KEY || "", {
    apiVersion: "2024-06-20",
  });
}
