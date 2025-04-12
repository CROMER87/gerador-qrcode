import { Component } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) { }

  abrirBox() {
    this.router.navigate(['/gerar-qrcode']);
  }

  abrirQrGenerator() {
    this.router.navigate(['/qr-generator']);
  }
}
