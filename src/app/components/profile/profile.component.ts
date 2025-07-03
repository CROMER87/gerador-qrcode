import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AuthService, AppUser } from '../../services/auth.service';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatDividerModule,
        MatChipsModule,
        MatProgressSpinnerModule
    ],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    currentUser: AppUser | null = null;
    subscription: any = null;
    loading = true;

    constructor(
        private authService: AuthService,
        private subscriptionService: SubscriptionService,
        private router: Router
    ) { }

    ngOnInit() {
        this.authService.currentUser$.subscribe(user => {
            this.currentUser = user;
            if (user) {
                this.loadSubscriptionData();
            } else {
                this.router.navigate(['/login']);
            }
        });
    }

    loadSubscriptionData() {
        if (this.currentUser) {
            this.subscriptionService.getCurrentSubscription().subscribe({
                next: (subscription) => {
                    this.subscription = subscription;
                    this.loading = false;
                },
                error: (error) => {
                    console.error('Erro ao carregar dados da assinatura:', error);
                    this.loading = false;
                }
            });
        }
    }

    getSubscriptionStatusColor(): string {
        if (!this.subscription) return 'default';

        switch (this.subscription.status) {
            case 'active': return 'primary';
            case 'trial': return 'accent';
            case 'inactive': return 'warn';
            default: return 'default';
        }
    }

    getSubscriptionStatusText(): string {
        if (!this.subscription) return 'Sem assinatura';

        switch (this.subscription.status) {
            case 'active': return 'Ativa';
            case 'trial': return 'Período de teste';
            case 'inactive': return 'Inativa';
            default: return 'Desconhecido';
        }
    }

    upgradeSubscription() {
        this.router.navigate(['/plans']);
    }

    manageSubscription() {
        // Aqui você pode implementar a lógica para gerenciar a assinatura
        alert('Funcionalidade de gerenciamento de assinatura será implementada em breve.');
    }
} 