import { Routes } from '@angular/router';
import { BoxComponent } from './components/box/box.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    {
    path: '',
    component: HomeComponent
  },
  {
    path: 'gerar-qrcode',
    component: BoxComponent
  }
];
