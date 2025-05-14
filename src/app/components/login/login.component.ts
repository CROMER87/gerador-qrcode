import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule
    ],
    template: `
    <div class="login-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="email" name="email" type="email" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Senha</mat-label>
              <input matInput [(ngModel)]="password" name="password" type="password" required>
            </mat-form-field>

            <div class="button-container">
              <button mat-raised-button color="primary" type="submit" [disabled]="loading">
                {{ loading ? 'Entrando...' : 'Entrar' }}
              </button>
              <button mat-button type="button" (click)="goToRegister()">
                Criar conta
              </button>
            </div>

            <div *ngIf="error" class="error-message">
              {{ error }}
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
    styles: [`
    .login-container {
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
    }

    mat-card-header {
      justify-content: center;
      margin-bottom: 2rem;
    }

    mat-form-field {
      width: 100%;
      margin-bottom: 1rem;
    }

    .button-container {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
    }

    .error-message {
      color: #f44336;
      margin-top: 1rem;
      text-align: center;
    }
  `]
})
export class LoginComponent {
    email: string = '';
    password: string = '';
    loading: boolean = false;
    error: string = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    onSubmit(): void {
        if (!this.email || !this.password) {
            this.error = 'Por favor, preencha todos os campos';
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.login(this.email, this.password).subscribe({
            next: (user) => {
                this.loading = false;
                this.router.navigate(['/dashboard']);
            },
            error: (err) => {
                this.loading = false;
                this.error = 'Email ou senha inválidos';
            }
        });
    }

    goToRegister(): void {
        this.router.navigate(['/register']);
    }
} 