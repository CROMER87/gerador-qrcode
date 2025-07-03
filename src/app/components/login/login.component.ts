import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
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
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  senha: string = '';
  hide: boolean = true;
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    console.log('LoginComponent inicializado');
    console.log('AuthService:', this.authService);
  }

  login() {
    // Aqui você pode implementar a lógica de autenticação tradicional
    alert(`Email: ${this.email}\nSenha: ${this.senha}`);
  }

  loginWithGoogle() {
    this.loading = true;
    console.log('Iniciando login com Google...');
    console.log('Domínio atual:', window.location.origin);

    this.authService.loginWithGoogle().subscribe({
      next: (result) => {
        this.loading = false;
        console.log('Login com Google realizado com sucesso:', result);
        alert('Login realizado com sucesso!');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        console.error('Erro detalhado no login com Google:', error);
        console.log('Domínio que causou erro:', window.location.origin);

        let errorMessage = 'Erro ao fazer login com Google.';

        if (error.code === 'auth/popup-closed-by-user') {
          errorMessage = 'Login cancelado pelo usuário.';
        } else if (error.code === 'auth/popup-blocked') {
          errorMessage = 'Popup bloqueado pelo navegador. Permita popups para este site.';
        } else if (error.code === 'auth/unauthorized-domain') {
          errorMessage = `Domínio não autorizado: ${window.location.origin}. Verifique a configuração do Firebase.`;
        } else if (error.code) {
          errorMessage = `Erro: ${error.code} - ${error.message}`;
        }

        alert(errorMessage);
      }
    });
  }

  testFirebase() {
    console.log('Testando Firebase...');
    const currentUser = this.authService.getCurrentUser();
    console.log('Usuário atual:', currentUser);
    console.log('Está logado:', this.authService.isLoggedIn());
  }
} 