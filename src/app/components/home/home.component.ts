import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule
  ],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>Gerador de QR Code</h1>
        <p class="subtitle">Crie QR codes personalizados para suas redes sociais, contatos e muito mais</p>
        <div class="hero-buttons">
          <button mat-raised-button color="primary" (click)="abrirQrGenerator()">
            <mat-icon>qr_code_2</mat-icon>
            Criar QR Code
          </button>
          <button mat-stroked-button color="accent" (click)="abrirDashboard()">
            <mat-icon>dashboard</mat-icon>
            Dashboard
          </button>
        </div>
      </div>

      <div class="features-grid">
        <mat-card class="feature-card" (click)="abrirQrGenerator()">
          <mat-card-content>
            <div class="feature-icon">
              <mat-icon>qr_code</mat-icon>
            </div>
            <h2>QR Code Personalizado</h2>
            <p>Crie QR codes únicos com suas cores e estilo</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="feature-card" (click)="abrirQrGenerator()">
          <mat-card-content>
            <div class="feature-icon">
              <mat-icon>share</mat-icon>
            </div>
            <h2>Compartilhe nas Redes</h2>
            <p>Gere QR codes para suas redes sociais</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="feature-card" (click)="abrirQrGenerator()">
          <mat-card-content>
            <div class="feature-icon">
              <mat-icon>badge</mat-icon>
            </div>
            <h2>Cartão de Visitas</h2>
            <p>Crie QR codes para seus cartões de visita</p>
          </mat-card-content>
        </mat-card>

        <mat-card class="feature-card" (click)="abrirQrGenerator()">
          <mat-card-content>
            <div class="feature-icon whatsapp-icon-container">
              <img src="assets/img/whatsapp.png" alt="WhatsApp" class="whatsapp-icon">
            </div>
            <h2>WhatsApp</h2>
            <p>Gere QR codes para seu WhatsApp</p>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="cta-section">
        <h2>Crie seu primeiro QR code agora mesmo!</h2>
        <button mat-raised-button color="primary" (click)="abrirQrGenerator()">
          Começar
        </button>
      </div>

      <div class="info-section">
        <mat-divider></mat-divider>
        <div class="info-grid">
          <div class="info-item">
            <mat-icon>speed</mat-icon>
            <h3>Rápido</h3>
            <p>Geração instantânea de QR codes</p>
          </div>
          <div class="info-item">
            <mat-icon>security</mat-icon>
            <h3>Seguro</h3>
            <p>Seus dados estão protegidos</p>
          </div>
          <div class="info-item">
            <mat-icon>devices</mat-icon>
            <h3>Responsivo</h3>
            <p>Funciona em qualquer dispositivo</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 60px;
    }

    .hero-section h1 {
      font-size: 48px;
      font-weight: 700;
      color: #333;
      margin-bottom: 20px;
    }

    .subtitle {
      font-size: 20px;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      margin-bottom: 60px;
    }

    .feature-card {
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .feature-card mat-card-content {
      padding: 20px;
      text-align: center;
    }

    .feature-icon {
      width: 60px;
      height: 60px;
      background: #f5f5f5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
    }

    .feature-icon mat-icon {
      font-size: 30px;
      width: 30px;
      height: 30px;
      color: #333;
    }

    .feature-icon.whatsapp-icon-container {
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      margin: 0 auto 20px auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      overflow: hidden;
    }

    .whatsapp-icon {
      width: 32px;
      height: 32px;
      object-fit: contain;
      display: block;
      filter: grayscale(100%);
    }

    .feature-card h2 {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
      color: #333;
    }

    .feature-card p {
      color: #666;
      margin: 0;
    }

    .cta-section {
      text-align: center;
      margin-bottom: 60px;
      padding: 40px;
      background: #f5f5f5;
      border-radius: 12px;
    }

    .cta-section h2 {
      font-size: 32px;
      font-weight: 500;
      margin-bottom: 10px;
      color: #333;
    }

    .cta-section p {
      color: #666;
      margin-bottom: 20px;
    }

    .cta-section button {
      padding: 12px 24px;
      font-size: 16px;
    }

    .cta-section button mat-icon {
      margin-right: 8px;
    }

    .info-section {
      margin-top: 60px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 30px;
      margin-top: 40px;
    }

    .info-item {
      text-align: center;
    }

    .info-item mat-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: #333;
      margin-bottom: 15px;
    }

    .info-item h3 {
      font-size: 18px;
      font-weight: 500;
      margin-bottom: 10px;
      color: #333;
    }

    .info-item p {
      color: #666;
      margin: 0;
    }

    .hero-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin-top: 30px;
    }

    .hero-buttons button {
      padding: 12px 24px;
      font-size: 16px;
    }

    .hero-buttons button mat-icon {
      margin-right: 8px;
    }

    @media (max-width: 600px) {
      .hero-section h1 {
        font-size: 36px;
      }

      .subtitle {
        font-size: 18px;
      }

      .features-grid {
        grid-template-columns: 1fr;
      }

      .cta-section {
        padding: 20px;
      }

      .cta-section h2 {
        font-size: 24px;
      }

      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) { }

  abrirQrGenerator() {
    this.router.navigate(['/qr-generator']);
  }

  abrirDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
