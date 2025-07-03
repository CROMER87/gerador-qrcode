import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BoxComponent } from './components/box/box.component';
import { HomeComponent } from './components/home/home.component';
import { TextFileViewerComponent } from './components/text-file-viewer/text-file-viewer.component';
import { SocialLinksComponent } from './components/social-links/social-links.component';
import { SubscriptionPlansComponent } from './components/subscription-plans/subscription-plans.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentFailureComponent } from './components/payment-failure/payment-failure.component';
import { PaymentPendingComponent } from './components/payment-pending/payment-pending.component';
import { QrGeneratorComponent } from './components/qr-generator/qr-generator.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'qr-generator',
    component: QrGeneratorComponent
  },
  {
    path: 'subscription',
    component: SubscriptionComponent
  },
  {
    path: 'checkout/:id',
    component: CheckoutComponent
  },
  {
    path: 'payment/success',
    component: PaymentSuccessComponent
  },
  {
    path: 'payment/failure',
    component: PaymentFailureComponent
  },
  {
    path: 'payment/pending',
    component: PaymentPendingComponent
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
    path: 'social',
    component: SocialLinksComponent
  },
  {
    path: 'plans',
    component: SubscriptionPlansComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
