import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface SubscriptionPlan {
    id: string;
    name: string;
    price: number;
    description: string;
    features: string[];
}

export interface PaymentResponse {
    id: string;
    status: string;
    status_detail: string;
    payment_method_id: string;
    payment_type_id: string;
    transaction_amount: number;
    installments: number;
    description: string;
    external_reference: string;
    date_created: string;
}

@Injectable({
    providedIn: 'root'
})
export class MercadoPagoService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    // Obter planos de assinatura disponíveis
    getSubscriptionPlans(): Observable<SubscriptionPlan[]> {
        return this.http.get<SubscriptionPlan[]>(`${this.apiUrl}/subscription-plans`);
    }

    // Criar uma assinatura
    createSubscription(planId: string, paymentData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/subscriptions`, {
            plan_id: planId,
            payment_data: paymentData
        });
    }

    // Processar pagamento
    processPayment(paymentData: any): Observable<PaymentResponse> {
        return this.http.post<PaymentResponse>(`${this.apiUrl}/payments`, paymentData);
    }

    // Cancelar assinatura
    cancelSubscription(subscriptionId: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/subscriptions/${subscriptionId}/cancel`, {});
    }

    // Obter status da assinatura
    getSubscriptionStatus(subscriptionId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/subscriptions/${subscriptionId}/status`);
    }
} 