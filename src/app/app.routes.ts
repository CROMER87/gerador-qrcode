import { Routes } from '@angular/router';
import { BoxComponent } from './components/box/box.component';
import { HomeComponent } from './components/home/home.component';
import { TextFileViewerComponent } from './components/text-file-viewer/text-file-viewer.component';
import { QrGeneratorComponent } from './components/qr-generator/qr-generator.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';


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
  },
  {
    path: 'qr-generator',
    component: QrGeneratorComponent
  },
  {
    path: 'social',
    component: SocialLinksComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
