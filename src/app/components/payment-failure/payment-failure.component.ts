import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-failure',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    template: `
    <div class="payment-failure-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon class="failure-icon">error</mat-icon>
            Falha no Pagamento
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Desculpe, ocorreu um erro ao processar seu pagamento.</p>
          <p>Por favor, verifique os dados e tente novamente.</p>
          <div class="button-container">
            <button mat-raised-button color="primary" (click)="goToSubscription()">
              Tentar Novamente
            </button>
            <button mat-button (click)="goToDashboard()">
              Voltar ao Dashboard
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .payment-failure-container {
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

    .failure-icon {
      color: #f44336;
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
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `]
})
export class PaymentFailureComponent {
    constructor(private router: Router) { }

    goToSubscription(): void {
        this.router.navigate(['/subscription']);
    }

    goToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }
} 