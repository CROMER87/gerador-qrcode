import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
    selector: 'app-payment-pending',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    template: `
    <div class="payment-pending-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon class="pending-icon">hourglass_empty</mat-icon>
            Pagamento Pendente
          </mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <p>Seu pagamento está sendo processado.</p>
          <p>Assim que confirmarmos o pagamento, sua assinatura será ativada automaticamente.</p>
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
    .payment-pending-container {
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

    .pending-icon {
      color: #ff9800;
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
export class PaymentPendingComponent {
    constructor(private router: Router) { }

    goToDashboard(): void {
        this.router.navigate(['/dashboard']);
    }
} 