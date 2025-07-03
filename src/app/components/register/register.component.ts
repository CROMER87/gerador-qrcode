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
  selector: 'app-register',
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
    <div class="register-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Criar Conta</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
            <mat-form-field appearance="outline">
              <mat-label>Nome</mat-label>
              <input matInput [(ngModel)]="name" name="name" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput [(ngModel)]="email" name="email" type="email" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Senha</mat-label>
              <input matInput [(ngModel)]="password" name="password" type="password" required>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Confirmar Senha</mat-label>
              <input matInput [(ngModel)]="confirmPassword" name="confirmPassword" type="password" required>
            </mat-form-field>

            <div class="button-container">
              <button mat-raised-button color="primary" type="submit" [disabled]="loading">
                {{ loading ? 'Criando conta...' : 'Criar conta' }}
              </button>
              <button mat-button type="button" (click)="goToLogin()">
                Já tenho conta
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
    .register-container {
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
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    if (!this.email || !this.password || !this.name) {
      this.error = 'Por favor, preencha todos os campos';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register(this.email, this.password, this.name).subscribe({
      next: (user: any) => {
        this.loading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (err: any) => {
        this.loading = false;
        this.error = 'Erro ao criar conta';
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
} 