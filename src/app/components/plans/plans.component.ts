import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { SubscriptionService, SubscriptionPlan } from '../../services/subscription.service';

@Component({
    selector: 'app-plans',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule
    ],
    template: `
    <div class="plans-container">
      <h1>Escolha seu plano</h1>
      <p class="subtitle">Selecione o plano ideal para suas necessidades</p>

      <div class="plans-grid">
        <mat-card *ngFor="let plan of plans" [class.popular]="plan.id === 'pro'" class="plan-card">
          <mat-card-header>
            <mat-card-title>{{ plan.name }}</mat-card-title>
            <mat-card-subtitle>{{ plan.description }}</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content>
            <div class="price">
              <span class="currency">R$</span>
              <span class="amount">{{ plan.price.toFixed(2) }}</span>
              <span class="period">/mês</span>
            </div>

            <mat-divider></mat-divider>

            <ul class="features">
              <li *ngFor="let feature of plan.features">
                <mat-icon>check</mat-icon>
                {{ feature }}
              </li>
            </ul>
          </mat-card-content>

          <mat-card-actions>
            <button mat-raised-button 
                    [color]="plan.id === 'pro' ? 'primary' : 'basic'"
                    [routerLink]="['/checkout']" 
                    [queryParams]="{plan: plan.id}">
              {{ plan.id === 'free' ? 'Começar Grátis' : 'Assinar Agora' }}
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
    styles: [`
    .plans-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    h1 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #333;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #666;
      margin-bottom: 3rem;
    }

    .plans-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }

    .plan-card {
      padding: 2rem;
      transition: transform 0.3s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }

    .plan-card:hover {
      transform: translateY(-5px);
    }

    .plan-card.popular {
      border: 2px solid #1976d2;
      position: relative;
    }

    .plan-card.popular::before {
      content: 'Mais Popular';
      position: absolute;
      top: -12px;
      left: 50%;
      transform: translateX(-50%);
      background: #1976d2;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
    }

    .price {
      margin: 2rem 0;
      font-size: 2.5rem;
      color: #333;
    }

    .currency {
      font-size: 1.5rem;
      vertical-align: super;
    }

    .period {
      font-size: 1rem;
      color: #666;
    }

    .features {
      list-style: none;
      padding: 0;
      margin: 2rem 0;
      text-align: left;
    }

    .features li {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      color: #444;
    }

    .features mat-icon {
      color: #4caf50;
      margin-right: 0.5rem;
    }

    mat-card-actions {
      margin-top: auto;
      padding: 1rem;
    }

    button {
      width: 100%;
    }

    @media (max-width: 768px) {
      .plans-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PlansComponent implements OnInit {
    plans: SubscriptionPlan[] = [];

    constructor(private subscriptionService: SubscriptionService) { }

    ngOnInit(): void {
        this.subscriptionService.getPlans().subscribe(plans => {
            this.plans = plans;
        });
    }
} 