// Types para el frontend
export interface User {
  id: string;
  email: string;
  planStatus: string;
}

export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  renewalDate: string;
  createdAt: string;
}

export interface CreateSubscriptionDto {
  name: string;
  price: number;
  currency?: string;
  category?: string;
  renewalDate: string;
}

export interface DashboardSummary {
  totalSubscriptions: number;
  totalMonthlyCost: number;
  totalYearlyCost: number;
  categoryBreakdown: Record<string, number>;
  currencyBreakdown: Record<string, number>;
  upcomingRenewals: number;
  subscriptions: Subscription[];
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface PreloadedSubscription {
  id: number;
  name: string;
  category: string;
  logoUrl?: string;
}
