import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { AuthService, AppUser } from './auth.service';

export interface SubscriptionPlan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

export interface UserSubscription {
  id: string;
  planId: string;
  status: string;
  startDate: string;
  endDate: string;
}

export interface PaymentInfo {
  planId: string;
  paymentMethod: string;
  transactionId?: string;
}

export interface PaymentResponse {
  success: boolean;
  message?: string;
  transactionId?: string;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  description: string;
  qrCodes: number;
  isPopular?: boolean;
}

export interface Package {
  id: string;
  name: string;
  price: number;
  qrCodes: number;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getPlans(): Observable<Plan[]> {
    // Dados mockados para desenvolvimento
    const mockPlans: Plan[] = [
      {
        id: 'basic',
        name: 'Plano Básico',
        price: 29.90,
        description: 'Ideal para pequenos negócios',
        features: [
          'Até 100 QR Codes por mês',
          'QR Codes personalizados',
          'Suporte por email',
          'Estatísticas básicas'
        ],
        qrCodes: 100
      },
      {
        id: 'pro',
        name: 'Plano Profissional',
        price: 49.90,
        description: 'Para empresas em crescimento',
        features: [
          'QR Codes ilimitados',
          'QR Codes personalizados',
          'Suporte prioritário',
          'Estatísticas avançadas',
          'API de integração'
        ],
        qrCodes: 999999,
        isPopular: true
      },
      {
        id: 'enterprise',
        name: 'Plano Empresarial',
        price: 99.90,
        description: 'Solução completa para grandes empresas',
        features: [
          'QR Codes ilimitados',
          'QR Codes personalizados',
          'Suporte 24/7',
          'Estatísticas avançadas',
          'API de integração',
          'Gerenciamento de equipe',
          'Relatórios personalizados'
        ],
        qrCodes: 999999
      }
    ];

    return of(mockPlans);
  }

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`${this.apiUrl}/packages`);
  }

  getCurrentUserSubscription(): Observable<UserSubscription | null> {
    const user = this.authService.getCurrentAppUser();
    if (!user || !user.subscriptionId) {
      return of(null);
    }

    // Em produção, isso viria da API
    // Por enquanto, simulamos uma assinatura
    const subscription: UserSubscription = {
      id: user.subscriptionId,
      planId: 'pro', // Exemplo
      status: user.subscriptionStatus || 'inactive',
      startDate: new Date().toISOString(),
      endDate: user.subscriptionEndDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    };

    return of(subscription);
  }

  createCheckoutSession(params: { planId: string } | { packageId: string }): Observable<{ url: string }> {
    // Em produção, isso seria uma chamada à API do Mercado Pago
    // Exemplo de integração com o Mercado Pago:
    /*
    const checkoutData = {
      items: [{
        title: 'Plano Premium',
        quantity: 1,
        currency_id: 'BRL',
        unit_price: 49.90
      }],
      back_urls: {
        success: `${environment.appUrl}/payment/success`,
        failure: `${environment.appUrl}/payment/failure`,
        pending: `${environment.appUrl}/payment/pending`
      },
      auto_return: 'approved',
      notification_url: `${environment.apiUrl}/webhooks/mercadopago`
    };

    return this.http.post<{ init_point: string }>(`${this.apiUrl}/checkout`, checkoutData)
      .pipe(map(response => ({ url: response.init_point })));
    */

    // Por enquanto, simulamos a criação de uma sessão de checkout
    const id = 'planId' in params ? params.planId : params.packageId;
    return of({ url: `/checkout/${id}` });
  }

  processPayment(paymentInfo: PaymentInfo): Observable<PaymentResponse> {
    // Em produção, isso seria uma chamada à API do Mercado Pago
    // Exemplo de processamento de pagamento:
    /*
    const paymentData = {
      transaction_amount: 49.90,
      token: paymentInfo.token,
      installments: 1,
      payment_method_id: paymentInfo.paymentMethod,
      payer: {
        email: this.authService.getCurrentUser()?.email
      }
    };

    return this.http.post<PaymentResponse>(`${this.apiUrl}/payments`, paymentData);
    */

    // Por enquanto, simulamos um pagamento bem-sucedido
    const response: PaymentResponse = {
      success: true,
      transactionId: Math.random().toString(36).substring(2, 15),
      message: 'Pagamento processado com sucesso'
    };

    return of(response);
  }

  activateSubscription(planId: string): Observable<any> {
    // Em produção, isso seria uma chamada à API
    // Por enquanto, simulamos a ativação da assinatura
    const subscriptionId = Math.random().toString(36).substring(2, 15);
    const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    // Atualizar o status da assinatura do usuário
    this.authService.updateSubscriptionStatus(subscriptionId, 'active', endDate);

    return of({ success: true, subscriptionId, endDate });
  }

  getCurrentSubscription(): Observable<Plan | null> {
    const user = this.authService.getCurrentAppUser();
    if (!user || !user.subscriptionId) {
      return of(null);
    }

    return this.getPlans().pipe(
      map(plans => plans.find(p => p.id === 'pro') || null) // Exemplo, em produção viria da API
    );
  }

  cancelSubscription(): Observable<{ success: boolean }> {
    // Em produção, isso seria uma chamada à API
    // Por enquanto, simulamos o cancelamento da assinatura
    const user = this.authService.getCurrentAppUser();
    if (user && user.subscriptionId) {
      this.authService.updateSubscriptionStatus(user.subscriptionId, 'inactive');
    }

    return of({ success: true });
  }

  isFeatureAvailable(feature: string): Observable<boolean> {
    // Verificar se o usuário tem uma assinatura ativa
    if (!this.authService.hasActiveSubscription()) {
      return of(false);
    }

    // Em produção, isso seria uma verificação mais complexa
    // Por enquanto, simulamos que todas as features estão disponíveis para assinantes
    return of(true);
  }
}
