import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';

interface Plan {
    id: string;
    name: string;
    price: number;
    features: string[];
    recommended?: boolean;
}

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.component.html',
    styleUrls: ['./subscription.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatRadioModule,
        FormsModule
    ]
})
export class SubscriptionComponent implements OnInit {
    plans: Plan[] = [
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
            ],
            recommended: true
        }
    ];

    constructor(private router: Router) { }

    ngOnInit() {
        // No need to load packages as plans are used instead
    }

    selectPlan(planId: string): void {
        this.router.navigate(['/checkout', planId]);
    }
} 