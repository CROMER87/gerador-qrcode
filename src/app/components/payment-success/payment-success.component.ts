import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
    selector: 'app-payment-success',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    template: `
    <div class="payment-success-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon class="success-icon">check_circle</mat-icon>
            Pagamento Confirmado
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Seu pagamento foi processado com sucesso!</p>
          <p>A sua assinatura foi ativada e você já tem acesso a todos os recursos do plano.</p>
          <div class="button-container">
            <button mat-raised-button color="primary" (click)="goToDashboard()">
              Ir para o Dashboard
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .payment-success-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    mat-card {
      width: 100%;
      max-width: 400px;
      padding: 2rem;
      text-align: center;
    }

    .success-icon {
      color: #4caf50;
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-right: 1rem;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      margin-bottom: 2rem;
    }

    p {
      margin: 1rem 0;
      font-size: 16px;
    }

    .button-container {
      margin-top: 2rem;
    }
  `]
})
export class PaymentSuccessComponent implements OnInit {
    constructor(
        private subscriptionService: SubscriptionService,
        private router: Router
    ) { }

    ngOnInit(): void {
        // Ativar a assinatura após o pagamento bem-sucedido
        this.subscriptionService.activateSubscription('pro').subscribe({
            next: (response) => {
                console.log('Assinatura ativada com sucesso:', response);
            },
            error: (error) => {
                console.error('Erro ao ativar assinatura:', error);
            }
        });
    }

    goToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }
} 