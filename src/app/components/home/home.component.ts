import { Component } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 constructor(private router: Router) {}

   abrirBox() {
    this.router.navigate(['/gerar-qrcode']);
  }
}
