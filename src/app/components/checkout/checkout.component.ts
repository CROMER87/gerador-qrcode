import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router } from '@angular/router';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ]
})
export class CheckoutComponent implements OnInit {
  plan: Plan | null = null;
  loading = true;
  error: string | null = null;
  redirecting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPlan();
  }

  private loadPlan(): void {
    this.loading = true;
    this.error = null;

    // Simulando carregamento do plano
    setTimeout(() => {
      const planId = this.route.snapshot.paramMap.get('id');

      // Simulando dados do plano (em produção, isso viria de uma API)
      const plans: Plan[] = [
        {
          id: 'basic',
          name: 'Plano Básico',
          price: 29.90,
          features: [
            'Até 100 QR Codes por mês',
            'QR Codes personalizados',
            'Suporte por email',
            'Estatísticas básicas'
          ]
        },
        {
          id: 'pro',
          name: 'Plano Profissional',
          price: 49.90,
          features: [
            'QR Codes ilimitados',
            'QR Codes personalizados',
            'Suporte prioritário',
            'Estatísticas avançadas',
            'API de integração'
          ]
        }
      ];

      const selectedPlan = plans.find(p => p.id === planId);

      if (selectedPlan) {
        this.plan = selectedPlan;
        this.loading = false;
      } else {
        this.error = 'Plano não encontrado';
        this.loading = false;
      }
    }, 1500);
  }

  retry(): void {
    this.loadPlan();
  }

  proceedToPayment(): void {
    this.redirecting = true;

    // Simulando redirecionamento para gateway de pagamento
    setTimeout(() => {
      // Em produção, aqui seria redirecionado para o gateway de pagamento
      window.location.href = 'https://exemplo.com/pagamento';
    }, 2000);
  }
}
