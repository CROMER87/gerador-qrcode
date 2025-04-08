import { Routes } from '@angular/router';
import { BoxComponent } from './components/box/box.component';
import { HomeComponent } from './components/home/home.component';
import { TextFileViewerComponent } from './components/text-file-viewer/text-file-viewer.component';


export const routes: Routes = [
    {
    path: '',
    component: HomeComponent
  },
  {
    path: 'gerar-qrcode',
    component: BoxComponent
  },
    {
    path: 'ads.txt',
    component: TextFileViewerComponent
  }
];
