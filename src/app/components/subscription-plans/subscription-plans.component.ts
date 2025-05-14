import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SubscriptionService, Plan } from '../../services/subscription.service';

@Component({
  selector: 'app-subscription-plans',
  templateUrl: './subscription-plans.component.html',
  styleUrls: ['./subscription-plans.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ]
})
export class SubscriptionPlansComponent implements OnInit {
  plans: Plan[] = [];

  constructor(private subscriptionService: SubscriptionService) { }

  ngOnInit(): void {
    this.loadPlans();
  }

  private loadPlans(): void {
    this.subscriptionService.getPlans().subscribe(
      plans => {
        console.log('Planos carregados:', plans);
        this.plans = plans;
      },
      error => console.error('Erro ao carregar planos:', error)
    );
  }

  selectPlan(plan: Plan): void {
    window.location.href = `/checkout/${plan.id}`;
  }
}
