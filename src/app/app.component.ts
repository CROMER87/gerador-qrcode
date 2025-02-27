import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { BoxComponent } from "./components/box/box.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, BoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gerador-qrcode';
}
