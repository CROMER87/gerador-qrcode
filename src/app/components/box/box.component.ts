import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as QRCode from 'qrcode';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-box',
  imports: [FormsModule, CommonModule,  MatButtonModule,
    MatIconModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'

})
export class BoxComponent {
    constructor(private router: Router) {}
text!: string;
qrcode!: string;

async onSubmit(){
  this.qrcode = await this.generateQrCode(this.text);
  console.log(this.text);
  this.text = '';
}

  async generateQrCode(text: string): Promise<string> {
    try {
      return await QRCode.toDataURL(text);
    } catch (error) {
      console.error('Erro ao gerar o QR Code:', error);
      alert('Por favor, insira um texto válido.');
      throw error;
    }
  }

   salvarQrCode(): void {
    if (this.qrcode) {
      const link = document.createElement('a');
      link.href = this.qrcode;
      link.download = 'qrcode.png';
      link.click();
    } else {
      alert('Por favor, gere um QR Code primeiro.');
    }
  }

    voltarHome() {
    this.router.navigate(['']);
  }
}






