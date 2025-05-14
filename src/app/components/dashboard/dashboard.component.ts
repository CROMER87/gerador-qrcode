import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule
    ],
    template: `
    <div class="dashboard-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Bem-vindo, {{ user?.name }}!</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="subscription-status">
            <h3>Status da Assinatura</h3>
            <p *ngIf="subscription">
              Plano: {{ subscription.planId }}<br>
              Status: {{ subscription.status }}<br>
              Válido até: {{ subscription.endDate | date }}
            </p>
            <p *ngIf="!subscription">
              Você ainda não tem uma assinatura ativa.
            </p>
            <button mat-raised-button color="primary" (click)="goToSubscription()">
              {{ subscription ? 'Gerenciar Assinatura' : 'Assinar Agora' }}
            </button>
          </div>

          <div class="quick-actions">
            <h3>Ações Rápidas</h3>
            <button mat-raised-button (click)="goToQrGenerator()">
              <mat-icon>qr_code</mat-icon>
              Gerar QR Code
            </button>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .dashboard-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    mat-card {
      margin-bottom: 2rem;
    }

    .subscription-status {
      margin: 2rem 0;
    }

    .quick-actions {
      margin-top: 2rem;
    }

    button {
      margin: 0.5rem;
    }

    mat-icon {
      margin-right: 0.5rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
    user: any;
    subscription: any;

    constructor(
        private authService: AuthService,
        private subscriptionService: SubscriptionService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.user = this.authService.getCurrentUser();
        this.loadSubscription();
    }

    loadSubscription(): void {
        this.subscriptionService.getCurrentUserSubscription().subscribe({
            next: (subscription) => {
                this.subscription = subscription;
            },
            error: (error) => {
                console.error('Erro ao carregar assinatura:', error);
            }
        });
    }

    goToSubscription(): void {
        this.router.navigate(['/subscription']);
    }

    goToQrGenerator(): void {
        this.router.navigate(['/qr-generator']);
    }
} 