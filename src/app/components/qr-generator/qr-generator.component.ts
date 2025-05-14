import { Component, ViewChild, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as QRCode from 'qrcode';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import html2canvas from 'html2canvas';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
  customName?: string;
}

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTooltipModule
  ],
  template: `
    <div class="qr-container">
      <div class="qr-header">
        <h1>Gerador de QR Code</h1>
        <p>Selecione o tipo de QR Code que deseja gerar</p>
      </div>

      <div class="qr-type-selector">
        <div class="qr-type-grid">
          <div class="qr-type-card" [class.selected]="selectedType === 'text'" (click)="selectType('text')">
            <mat-icon>text_fields</mat-icon>
            <span>Texto</span>
          </div>
          <div class="qr-type-card" [class.selected]="selectedType === 'whatsapp'" (click)="selectType('whatsapp')">
            <img src="assets/img/whatsapp.avif" alt="WhatsApp" class="qr-type-icon">
            <span>WhatsApp</span>
          </div>
          <div class="qr-type-card" [class.selected]="selectedType === 'vcard'" (click)="selectType('vcard')">
            <mat-icon>badge</mat-icon>
            <span>vCard</span>
          </div>
          <div class="qr-type-card" [class.selected]="selectedType === 'url'" (click)="selectType('url')">
            <mat-icon>link</mat-icon>
            <span>URL</span>
          </div>
          <div class="qr-type-card" [class.selected]="selectedType === 'email'" (click)="selectType('email')">
            <mat-icon>email</mat-icon>
            <span>Email</span>
          </div>
          <div class="qr-type-card" [class.selected]="selectedType === 'sms'" (click)="selectType('sms')">
            <mat-icon>sms</mat-icon>
            <span>SMS</span>
          </div>
          <div class="qr-type-card" [class.selected]="selectedType === 'wifi'" (click)="selectType('wifi')">
            <mat-icon>wifi</mat-icon>
            <span>Wi-Fi</span>
          </div>
          <div class="qr-type-card" [class.selected]="selectedType === 'geo'" (click)="selectType('geo')">
            <mat-icon>location_on</mat-icon>
            <span>Localização</span>
          </div>
          <div class="qr-type-card" [class.selected]="selectedType === 'phone'" (click)="selectType('phone')">
            <mat-icon>phone</mat-icon>
            <span>Telefone</span>
          </div>
          <div class="qr-type-card" [class.selected]="selectedType === 'social'" (click)="selectType('social')">
            <mat-icon>share</mat-icon>
            <span>Redes Sociais</span>
          </div>
        </div>
      </div>

      <div class="qr-form-container">
        <div *ngIf="selectedType === 'text'" class="qr-form">
          <mat-form-field appearance="outline">
            <mat-label>Texto</mat-label>
            <input matInput [(ngModel)]="text" placeholder="Digite o texto">
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="generateQRCode()">Gerar QR Code</button>
        </div>

        <div *ngIf="selectedType === 'whatsapp'" class="qr-form">
          <mat-form-field appearance="outline">
            <mat-label>Número do WhatsApp</mat-label>
            <input matInput [(ngModel)]="whatsappNumber" placeholder="Ex: 5511999999999">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Mensagem</mat-label>
            <input matInput [(ngModel)]="whatsappMessage" placeholder="Digite a mensagem">
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="generateQRCode()">Gerar QR Code</button>
        </div>

        <div *ngIf="selectedType === 'vcard'" class="qr-form">
          <mat-form-field appearance="outline">
            <mat-label>Nome</mat-label>
            <input matInput [(ngModel)]="vcardName" placeholder="Nome completo">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Telefone</mat-label>
            <input matInput [(ngModel)]="vcardPhone" placeholder="Número de telefone">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="vcardEmail" placeholder="Email">
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="generateQRCode()">Gerar QR Code</button>
        </div>

        <div *ngIf="selectedType === 'url'" class="qr-form">
          <mat-form-field appearance="outline">
            <mat-label>URL</mat-label>
            <input matInput [(ngModel)]="url" placeholder="https://exemplo.com">
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="generateQRCode()">Gerar QR Code</button>
        </div>

        <div *ngIf="selectedType === 'email'" class="qr-form">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="emailAddress" placeholder="exemplo@dominio.com">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Assunto</mat-label>
            <input matInput [(ngModel)]="emailSubject" placeholder="Assunto do email">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Mensagem</mat-label>
            <input matInput [(ngModel)]="emailBody" placeholder="Corpo do email">
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="generateQRCode()">Gerar QR Code</button>
        </div>

        <div *ngIf="selectedType === 'sms'" class="qr-form">
          <mat-form-field appearance="outline">
            <mat-label>Número de Telefone</mat-label>
            <input matInput [(ngModel)]="smsNumber" placeholder="Ex: 5511999999999">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Mensagem</mat-label>
            <input matInput [(ngModel)]="smsMessage" placeholder="Digite a mensagem">
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="generateQRCode()">Gerar QR Code</button>
        </div>

        <div *ngIf="selectedType === 'wifi'" class="qr-form">
          <mat-form-field appearance="outline">
            <mat-label>Nome da Rede (SSID)</mat-label>
            <input matInput [(ngModel)]="wifiSSID" placeholder="Nome da rede Wi-Fi">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Senha</mat-label>
            <input matInput [(ngModel)]="wifiPassword" placeholder="Senha da rede">
          </mat-form-field>
          <mat-checkbox [(ngModel)]="wifiHidden">Rede oculta</mat-checkbox>
          <button mat-raised-button color="primary" (click)="generateQRCode()">Gerar QR Code</button>
        </div>

        <div *ngIf="selectedType === 'geo'" class="qr-form">
          <mat-form-field appearance="outline">
            <mat-label>Latitude</mat-label>
            <input matInput [(ngModel)]="geoLatitude" placeholder="Ex: -23.5505">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Longitude</mat-label>
            <input matInput [(ngModel)]="geoLongitude" placeholder="Ex: -46.6333">
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="generateQRCode()">Gerar QR Code</button>
        </div>

        <div *ngIf="selectedType === 'phone'" class="qr-form">
          <mat-form-field appearance="outline">
            <mat-label>Número de Telefone</mat-label>
            <input matInput [(ngModel)]="phoneNumber" placeholder="Ex: 5511999999999">
          </mat-form-field>
          <button mat-raised-button color="primary" (click)="generateQRCode()">Gerar QR Code</button>
        </div>

        <div *ngIf="selectedType === 'social'" class="qr-form">
          <mat-form-field appearance="outline">
            <mat-label>Nome</mat-label>
            <input matInput [(ngModel)]="socialName" placeholder="Seu nome ou apelido">
          </mat-form-field>

          <div class="photo-upload">
            <h3>Foto de Perfil</h3>
            <div class="photo-preview" [style.background-image]="socialPhoto ? 'url(' + socialPhoto + ')' : 'none'" (click)="triggerPhotoUpload()">
              <mat-icon *ngIf="!socialPhoto">add_a_photo</mat-icon>
            </div>
            <input type="file" #photoInput (change)="onPhotoUpload($event)" accept="image/*" class="photo-input">
            <button mat-button color="warn" (click)="removePhoto()" *ngIf="socialPhoto">
              <mat-icon>delete</mat-icon> Remover foto
            </button>
          </div>
          
          <div class="social-media-list">
            <h3>Suas Redes Sociais</h3>
            
            <div *ngFor="let social of socialMediaList; let i = index" class="social-media-item">
              <mat-form-field appearance="outline">
                <mat-label>Plataforma</mat-label>
                <mat-select [(ngModel)]="social.platform" (selectionChange)="updateSocialIcon(i)">
                  <mat-option value="facebook">Facebook</mat-option>
                  <mat-option value="instagram">Instagram</mat-option>
                  <mat-option value="twitter">Twitter</mat-option>
                  <mat-option value="tiktok">TikTok</mat-option>
                  <mat-option value="youtube">YouTube</mat-option>
                  <mat-option value="linkedin">LinkedIn</mat-option>
                  <mat-option value="pinterest">Pinterest</mat-option>
                  <mat-option value="snapchat">Snapchat</mat-option>
                  <mat-option value="reddit">Reddit</mat-option>
                  <mat-option value="twitch">Twitch</mat-option>
                  <mat-option value="github">GitHub</mat-option>
                  <mat-option value="behance">Behance</mat-option>
                  <mat-option value="dribbble">Dribbble</mat-option>
                  <mat-option value="medium">Medium</mat-option>
                  <mat-option value="vimeo">Vimeo</mat-option>
                  <mat-option value="soundcloud">SoundCloud</mat-option>
                  <mat-option value="spotify">Spotify</mat-option>
                  <mat-option value="custom">Personalizado</mat-option>
                </mat-select>
              </mat-form-field>
              
              <mat-form-field appearance="outline" *ngIf="social.platform === 'custom'">
                <mat-label>Nome Personalizado</mat-label>
                <input matInput [(ngModel)]="social.customName" placeholder="Ex: Meu Blog, Minha Loja, etc.">
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>URL</mat-label>
                <input matInput [(ngModel)]="social.url" placeholder="https://...">
              </mat-form-field>
              
              <button mat-icon-button color="warn" (click)="removeSocialMedia(i)" matTooltip="Remover">
                <mat-icon>delete</mat-icon>
              </button>
            </div>
            
            <button mat-raised-button color="primary" (click)="addSocialMedia()">
              <mat-icon>add</mat-icon> Adicionar Rede Social
            </button>
          </div>
          
          <button mat-raised-button color="primary" (click)="generateQRCode()">Gerar QR Code</button>
        </div>
      </div>

      <div *ngIf="qrCodeUrl" class="qr-result" #qrResult>
        <div class="qr-content">
          <img [src]="qrCodeUrl" alt="QR Code" #qrImage>
          <div *ngIf="selectedType === 'vcard'" class="vcard-info">
            <h3>{{ vcardName }}</h3>
            <p><mat-icon>phone</mat-icon> {{ vcardPhone }}</p>
            <p><mat-icon>email</mat-icon> {{ vcardEmail }}</p>
          </div>
          <div *ngIf="selectedType === 'whatsapp'" class="whatsapp-info">
            <h3>WhatsApp</h3>
            <div class="social-media-item">
              <img src="assets/img/whatsapp.avif" alt="WhatsApp" class="social-media-icon">
              <div class="social-media-info">
                <p><mat-icon>phone</mat-icon> {{ whatsappNumber }}</p>
                <p *ngIf="whatsappMessage"><mat-icon>message</mat-icon> {{ whatsappMessage }}</p>
              </div>
            </div>
          </div>
          <div *ngIf="selectedType === 'wifi'" class="wifi-info">
            <h3>Wi-Fi</h3>
            <p><mat-icon>wifi</mat-icon> {{ wifiSSID }}</p>
            <p><mat-icon>lock</mat-icon> {{ wifiPassword }}</p>
          </div>
          <div *ngIf="selectedType === 'social'" class="social-info">
            <h3>{{ socialName }}</h3>
            <p><mat-icon>share</mat-icon> Redes Sociais</p>
            <div class="social-chips">
              <mat-chip *ngFor="let social of socialMediaList" [matTooltip]="social.url">
                <mat-icon>{{ social.icon }}</mat-icon>
                {{ social.platform === 'custom' ? social.customName : social.platform }}
              </mat-chip>
            </div>
          </div>
        </div>
        <div class="download-options">
          <button mat-raised-button color="accent" (click)="downloadQRCode()">Download</button>
          <button mat-raised-button color="primary" (click)="downloadQRCodeWithInfo()">Download com Informações</button>
        </div>
        <div *ngIf="selectedType === 'social' && socialLink" class="social-link">
          <h3>Link para sua página de redes sociais:</h3>
          <div class="link-container">
            <input matInput [value]="socialLink" readonly>
            <button mat-icon-button (click)="copyLink()" matTooltip="Copiar link">
              <mat-icon>content_copy</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .qr-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Roboto', sans-serif;
    }

    .qr-header {
      text-align: center;
      margin-bottom: 20px;
    }

    .qr-header h1 {
      font-size: 28px;
      font-weight: 500;
      color: #333;
      margin-bottom: 10px;
    }

    .qr-header p {
      font-size: 16px;
      color: #666;
    }

    .qr-type-selector {
      margin-bottom: 30px;
    }

    .qr-type-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      gap: 15px;
    }

    .qr-type-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
    }

    .qr-type-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .qr-type-card.selected {
      background: #e3f2fd;
      border: 2px solid #2196f3;
    }

    .qr-type-card mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      margin-bottom: 10px;
      color: #333;
    }

    .qr-type-card span {
      font-size: 14px;
      color: #333;
      font-weight: 500;
    }

    .qr-form-container {
      background-color: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }

    .qr-form {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .qr-result {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      margin-top: 20px;
    }

    .qr-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }

    .qr-result img {
      max-width: 300px;
      margin: 20px 0;
    }

    .vcard-info, .whatsapp-info, .wifi-info, .social-info {
      text-align: center;
      margin: 20px 0;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 12px;
      width: 100%;
    }

    .whatsapp-info {
      background: #e8f5e9;
    }

    .wifi-info {
      background: #e3f2fd;
    }

    .social-info {
      background: #f3e5f5;
    }

    .vcard-info h3, .whatsapp-info h3, .wifi-info h3, .social-info h3 {
      margin: 0 0 10px 0;
      color: #333;
    }

    .vcard-info p, .whatsapp-info p, .wifi-info p, .social-info p {
      margin: 5px 0;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      color: #666;
    }

    mat-form-field {
      width: 100%;
    }

    .social-media-list {
      margin-top: 20px;
      width: 100%;
    }

    .social-media-item {
      display: flex;
      gap: 10px;
      margin-bottom: 10px;
      align-items: center;
    }

    .social-media-item mat-form-field {
      flex: 1;
    }

    .social-chips {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 8px;
      margin-top: 10px;
    }

    .social-chips mat-chip {
      background-color: #e0e0e0;
    }

    .photo-upload {
      margin: 20px 0;
      text-align: center;
    }

    .photo-preview {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      background-color: #f0f0f0;
      margin: 10px auto;
      display: flex;
      align-items: center;
      justify-content: center;
      background-size: cover;
      background-position: center;
      border: 3px solid #e0e0e0;
      cursor: pointer;
    }

    .photo-preview mat-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: #757575;
    }

    .photo-input {
      display: none;
    }

    .photo-preview:hover {
      border-color: #2196f3;
    }

    .download-options {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }

    .social-link {
      margin-top: 20px;
      padding: 15px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    .link-container {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .link-container input {
      flex: 1;
    }

    .social-media-icon {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }

    .qr-type-icon {
      width: 24px;
      height: 24px;
      object-fit: contain;
    }

    @media (max-width: 600px) {
      .qr-type-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      }

      .social-media-item {
        flex-direction: column;
        align-items: flex-start;
      }

      .social-media-item mat-form-field {
        width: 100%;
      }

      .social-info p {
        max-width: 100%;
      }

      a[mat-raised-button] {
        width: 100%;
      }
    }
  `]
})
export class QrGeneratorComponent {
  @ViewChild('qrResult') qrResult!: ElementRef;
  @ViewChild('qrImage') qrImage!: ElementRef;
  @ViewChild('photoInput') photoInput!: ElementRef;
  private isBrowser: boolean;

  selectedType: string = 'text';
  text: string = '';
  whatsappNumber: string = '';
  whatsappMessage: string = '';
  vcardName: string = '';
  vcardPhone: string = '';
  vcardEmail: string = '';
  url: string = '';
  qrCodeUrl: string = '';

  emailAddress: string = '';
  emailSubject: string = '';
  emailBody: string = '';
  smsNumber: string = '';
  smsMessage: string = '';
  wifiSSID: string = '';
  wifiPassword: string = '';
  wifiHidden: boolean = false;
  geoLatitude: string = '';
  geoLongitude: string = '';
  phoneNumber: string = '';

  socialName: string = '';
  socialMediaList: SocialMedia[] = [];
  socialPhoto: string = '';

  qrCodeColor: string = '#000000';
  backgroundColor: string = '#FFFFFF';
  logoUrl: string = '';
  hasLogo: boolean = false;
  roundedCorners: boolean = false;
  quietZone: boolean = true;
  qrCodeSize: number = 300;

  qrOptions: QRCode.QRCodeToDataURLOptions = {
    errorCorrectionLevel: 'H',
    margin: 1,
    width: 300,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  };

  socialLink: string = '';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.addSocialMedia();
    }
  }

  selectType(type: string) {
    this.selectedType = type;
    this.qrCodeUrl = '';
  }

  onTypeChange() {
    this.qrCodeUrl = '';
  }

  addSocialMedia() {
    this.socialMediaList.push({
      platform: 'facebook',
      url: '',
      icon: 'facebook'
    });
  }

  removeSocialMedia(index: number) {
    this.socialMediaList.splice(index, 1);
    if (this.socialMediaList.length === 0) {
      this.addSocialMedia();
    }
  }

  updateSocialIcon(index: number) {
    const social = this.socialMediaList[index];
    switch (social.platform) {
      case 'facebook':
        social.icon = 'facebook';
        break;
      case 'instagram':
        social.icon = 'photo_camera';
        break;
      case 'twitter':
        social.icon = 'chat';
        break;
      case 'tiktok':
        social.icon = 'music_note';
        break;
      case 'youtube':
        social.icon = 'play_circle';
        break;
      case 'linkedin':
        social.icon = 'business';
        break;
      case 'pinterest':
        social.icon = 'image';
        break;
      case 'snapchat':
        social.icon = 'camera_alt';
        break;
      case 'reddit':
        social.icon = 'forum';
        break;
      case 'twitch':
        social.icon = 'live_tv';
        break;
      case 'github':
        social.icon = 'code';
        break;
      case 'behance':
        social.icon = 'palette';
        break;
      case 'dribbble':
        social.icon = 'sports_basketball';
        break;
      case 'medium':
        social.icon = 'article';
        break;
      case 'vimeo':
        social.icon = 'videocam';
        break;
      case 'soundcloud':
        social.icon = 'audiotrack';
        break;
      case 'spotify':
        social.icon = 'music_note';
        break;
      case 'custom':
        social.icon = 'link';
        break;
      default:
        social.icon = 'link';
    }
  }

  async generateQRCode() {
    if (!this.isBrowser) return;

    let qrData = '';
    switch (this.selectedType) {
      case 'text':
        qrData = this.text;
        break;
      case 'whatsapp':
        qrData = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
        break;
      case 'vcard':
        qrData = `BEGIN:VCARD\nVERSION:3.0\nFN:${this.vcardName}\nTEL:${this.vcardPhone}\nEMAIL:${this.vcardEmail}\nEND:VCARD`;
        break;
      case 'url':
        qrData = this.url;
        break;
      case 'email':
        qrData = `mailto:${this.emailAddress}?subject=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(this.emailBody)}`;
        break;
      case 'sms':
        qrData = `smsto:${this.smsNumber}:${this.smsMessage}`;
        break;
      case 'wifi':
        qrData = `WIFI:T:WPA;S:${this.wifiSSID};P:${this.wifiPassword};${this.wifiHidden ? 'H:true;' : ''};`;
        break;
      case 'geo':
        qrData = `geo:${this.geoLatitude},${this.geoLongitude}`;
        break;
      case 'phone':
        qrData = `tel:${this.phoneNumber}`;
        break;
      case 'social':
        if (!this.socialName || this.socialMediaList.length === 0) {
          alert('Por favor, preencha seu nome e adicione pelo menos uma rede social.');
          return;
        }

        // Verificar se todas as redes sociais têm URLs válidas
        const validSocials = this.socialMediaList.filter(social => social.url && social.url.trim() !== '');
        if (validSocials.length === 0) {
          alert('Por favor, adicione pelo menos uma URL válida para suas redes sociais.');
          return;
        }

        const socialData = {
          name: this.socialName,
          photo: this.socialPhoto,
          socials: validSocials
        };

        try {
          const encodedData = encodeURIComponent(JSON.stringify(socialData));
          const baseUrl = window.location.origin;
          this.socialLink = `${baseUrl}/social?data=${encodedData}`;
          qrData = this.socialLink;

          // Limitar o tamanho dos dados para evitar problemas com QR codes muito grandes
          if (qrData.length > 2048) {
            console.warn('Dados muito grandes para o QR code, tentando reduzir...');
            // Remover a foto se estiver presente para reduzir o tamanho
            if (socialData.photo) {
              socialData.photo = '';
              const newEncodedData = encodeURIComponent(JSON.stringify(socialData));
              this.socialLink = `${baseUrl}/social?data=${newEncodedData}`;
              qrData = this.socialLink;
            }
          }
        } catch (error) {
          console.error('Erro ao preparar dados para QR code:', error);
          alert('Erro ao preparar dados para o QR code. Por favor, tente novamente.');
          return;
        }
        break;
      default:
        throw new Error(`Tipo de QR Code não suportado: ${this.selectedType}`);
    }

    try {
      this.updateQROptions();
      this.qrCodeUrl = await QRCode.toDataURL(qrData, this.qrOptions);
      console.log('QR Code gerado com sucesso');

      // Verificar o QR code apenas se não for do tipo social
      if (this.selectedType !== 'social') {
        const isValid = await this.verifyQRCode();
        if (!isValid) {
          throw new Error('O QR Code foi gerado, mas não pôde ser carregado corretamente');
        }
      }
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
      alert(`Erro ao gerar QR Code: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      this.qrCodeUrl = '';
    }
  }

  updateQROptions() {
    this.qrOptions = {
      ...this.qrOptions,
      width: this.qrCodeSize,
      color: {
        dark: this.qrCodeColor,
        light: this.backgroundColor
      },
      margin: this.quietZone ? 1 : 0
    };
  }

  updateQRCode() {
    if (this.qrCodeUrl) {
      this.generateQRCode();
    }
  }

  onLogoUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.logoUrl = e.target?.result as string;
        this.hasLogo = true;
        this.applyCustomization();
      };
      reader.readAsDataURL(file);
    }
  }

  removeLogo() {
    this.logoUrl = '';
    this.hasLogo = false;
    this.applyCustomization();
  }

  applyCustomization() {
    if (this.qrCodeUrl) {
      this.generateQRCode();
    }
  }

  async downloadQRCode() {
    if (!this.qrCodeUrl) {
      alert('Nenhum QR Code gerado para download');
      return;
    }

    try {
      console.log('Iniciando download do QR Code');
      const link = document.createElement('a');
      link.href = this.qrCodeUrl;
      link.download = `qrcode-${this.selectedType}.png`;
      link.click();
      console.log('Download do QR Code iniciado com sucesso');
    } catch (error) {
      console.error('Erro ao fazer download do QR Code:', error);
      alert(`Erro ao fazer download do QR Code: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  async downloadQRCodeWithInfo() {
    if (!this.qrCodeUrl) {
      alert('Nenhum QR Code gerado para download');
      return;
    }

    try {
      if (this.selectedType === 'vcard') {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Não foi possível obter o contexto do canvas');
          }

          canvas.width = 500;
          canvas.height = 600;

          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const qrImage = new Image();
          qrImage.crossOrigin = 'anonymous';

          await new Promise((resolve, reject) => {
            qrImage.onload = resolve;
            qrImage.onerror = reject;
            qrImage.src = this.qrCodeUrl;
          });

          const qrSize = 300;
          const qrX = (canvas.width - qrSize) / 2;
          const qrY = 50;
          ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

          ctx.fillStyle = '#f5f5f5';
          ctx.fillRect(20, qrY + qrSize + 20, canvas.width - 40, 150);

          ctx.fillStyle = '#333';
          ctx.font = 'bold 20px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(this.vcardName, canvas.width / 2, qrY + qrSize + 60);

          ctx.font = '16px Arial';
          ctx.fillText(this.vcardPhone, canvas.width / 2, qrY + qrSize + 100);

          ctx.fillText(this.vcardEmail, canvas.width / 2, qrY + qrSize + 130);

          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `qrcode-${this.vcardName}.png`;
          link.click();
        } catch (error) {
          console.error('Erro ao gerar imagem com dados:', error);
          alert('Erro ao gerar imagem com dados. Tentando download do QR Code apenas.');
          this.downloadQRCode();
        }
      } else if (this.selectedType === 'whatsapp') {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Não foi possível obter o contexto do canvas');
          }

          canvas.width = 500;
          canvas.height = 600;

          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const qrImage = new Image();
          qrImage.crossOrigin = 'anonymous';

          await new Promise((resolve, reject) => {
            qrImage.onload = resolve;
            qrImage.onerror = reject;
            qrImage.src = this.qrCodeUrl;
          });

          const qrSize = 300;
          const qrX = (canvas.width - qrSize) / 2;
          const qrY = 50;
          ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

          ctx.fillStyle = '#e8f5e9';
          ctx.fillRect(20, qrY + qrSize + 20, canvas.width - 40, 120);

          ctx.fillStyle = '#333';
          ctx.font = 'bold 20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText('WhatsApp', canvas.width / 2, qrY + qrSize + 60);

          ctx.font = '16px Arial';
          ctx.fillText(this.whatsappNumber, canvas.width / 2, qrY + qrSize + 100);

          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `qrcode-whatsapp-${this.whatsappNumber}.png`;
          link.click();
        } catch (error) {
          console.error('Erro ao gerar imagem com dados:', error);
          alert('Erro ao gerar imagem com dados. Tentando download do QR Code apenas.');
          this.downloadQRCode();
        }
      } else if (this.selectedType === 'wifi') {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Não foi possível obter o contexto do canvas');
          }

          canvas.width = 500;
          canvas.height = 600;

          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const qrImage = new Image();
          qrImage.crossOrigin = 'anonymous';

          await new Promise((resolve, reject) => {
            qrImage.onload = resolve;
            qrImage.onerror = reject;
            qrImage.src = this.qrCodeUrl;
          });

          const qrSize = 300;
          const qrX = (canvas.width - qrSize) / 2;
          const qrY = 50;
          ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

          ctx.fillStyle = '#e3f2fd';
          ctx.fillRect(20, qrY + qrSize + 20, canvas.width - 40, 120);

          ctx.fillStyle = '#333';
          ctx.font = 'bold 20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText('Wi-Fi', canvas.width / 2, qrY + qrSize + 60);

          ctx.font = '16px Arial';
          ctx.fillText(this.wifiSSID, canvas.width / 2, qrY + qrSize + 100);

          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `qrcode-wifi-${this.wifiSSID}.png`;
          link.click();
        } catch (error) {
          console.error('Erro ao gerar imagem com dados:', error);
          alert('Erro ao gerar imagem com dados. Tentando download do QR Code apenas.');
          this.downloadQRCode();
        }
      } else if (this.selectedType === 'social') {
        try {
          console.log('Iniciando geração de imagem com QR Code e informações sociais');

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            throw new Error('Não foi possível obter o contexto do canvas');
          }

          canvas.width = 500;
          canvas.height = 600;

          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          console.log('Carregando QR Code para o canvas');
          const qrImage = new Image();
          qrImage.crossOrigin = 'anonymous';

          await new Promise((resolve, reject) => {
            qrImage.onload = resolve;
            qrImage.onerror = (e) => {
              console.error('Erro ao carregar QR Code para o canvas:', e);
              reject(e);
            };
            qrImage.src = this.qrCodeUrl;
          });

          console.log('QR Code carregado com sucesso');

          const qrSize = 300;
          const qrX = (canvas.width - qrSize) / 2;
          const qrY = 50;
          ctx.drawImage(qrImage, qrX, qrY, qrSize, qrSize);

          if (this.socialPhoto) {
            try {
              console.log('Tentando desenhar foto de perfil no canvas');

              let imageSource = this.socialPhoto;

              if (!this.socialPhoto.startsWith('data:image')) {
                const fileName = this.socialPhoto.split('/').pop();
                if (fileName) {
                  const storedImage = localStorage.getItem(`profile_${fileName}`);
                  if (storedImage) {
                    imageSource = storedImage;
                    console.log('Foto carregada do localStorage para o canvas');
                  } else {
                    console.warn('Foto não encontrada no localStorage, tentando usar o caminho original');
                  }
                }
              }

              const profileImage = new Image();

              await new Promise((resolve, reject) => {
                profileImage.onload = resolve;
                profileImage.onerror = (e) => {
                  console.error('Erro ao carregar imagem para o canvas:', e);
                  reject(e);
                };
                profileImage.src = imageSource;
              });

              console.log('Foto carregada com sucesso para o canvas');

              ctx.save();

              ctx.beginPath();
              ctx.arc(canvas.width / 2, qrY + qrSize + 80, 40, 0, Math.PI * 2);
              ctx.closePath();
              ctx.clip();

              ctx.drawImage(profileImage, canvas.width / 2 - 40, qrY + qrSize + 40, 80, 80);

              ctx.restore();

              console.log('Foto desenhada com sucesso no canvas');
            } catch (error) {
              console.error('Erro ao carregar foto de perfil para o canvas:', error);
            }
          }

          ctx.fillStyle = '#f3e5f5';
          ctx.fillRect(20, qrY + qrSize + 20, canvas.width - 40, 120);

          ctx.fillStyle = '#333';
          ctx.font = 'bold 20px Arial';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'top';
          ctx.fillText(this.socialName, canvas.width / 2, qrY + qrSize + 60);

          ctx.font = '16px Arial';
          ctx.fillText('Redes Sociais', canvas.width / 2, qrY + qrSize + 100);

          console.log('Gerando link de download');
          const link = document.createElement('a');
          link.href = canvas.toDataURL('image/png');
          link.download = `qrcode-social-${this.socialName}.png`;
          link.click();
          console.log('Download iniciado com sucesso');
        } catch (error) {
          console.error('Erro ao gerar imagem com dados:', error);
          alert(`Erro ao gerar imagem com dados: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
          console.log('Tentando download do QR Code apenas');
          this.downloadQRCode();
        }
      } else {
        this.downloadQRCode();
      }
    } catch (error) {
      console.error('Erro ao fazer download do QR Code:', error);
      alert(`Erro ao fazer download do QR Code: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  }

  onPhotoUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      try {
        console.log('Iniciando upload de foto:', file.name);

        if (file.size > 500 * 1024) {
          alert('A imagem é muito grande. Por favor, escolha uma imagem menor que 500KB.');
          return;
        }

        const timestamp = new Date().getTime();
        const fileName = `profile_${timestamp}.${file.name.split('.').pop()}`;

        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const base64Image = e.target?.result as string;

            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');

              const maxSize = 200;
              let width = img.width;
              let height = img.height;

              if (width > height) {
                if (width > maxSize) {
                  height *= maxSize / width;
                  width = maxSize;
                }
              } else {
                if (height > maxSize) {
                  width *= maxSize / height;
                  height = maxSize;
                }
              }

              canvas.width = width;
              canvas.height = height;

              if (ctx) {
                ctx.drawImage(img, 0, 0, width, height);
                const compressedImage = canvas.toDataURL('image/jpeg', 0.7);

                this.socialPhoto = compressedImage;
                console.log('Foto de perfil comprimida com sucesso');

                try {
                  if (this.isBrowser) {
                    localStorage.setItem(`profile_${fileName}`, compressedImage);
                    console.log('Foto armazenada no localStorage com a chave:', `profile_${fileName}`);
                  }
                } catch (storageError: any) {
                  if (storageError?.name === 'QuotaExceededError') {
                    console.warn('Armazenamento local excedido. Tentando limpar dados antigos...');
                    this.clearOldProfileImages();
                    try {
                      if (this.isBrowser) {
                        localStorage.setItem(`profile_${fileName}`, compressedImage);
                      }
                    } catch (retryError) {
                      console.error('Não foi possível salvar a imagem mesmo após limpeza:', retryError);
                      alert('Não foi possível salvar a imagem no armazenamento local. A imagem será exibida apenas temporariamente.');
                    }
                  } else {
                    throw storageError;
                  }
                }
              }
            };
            img.src = base64Image;
          } catch (error) {
            console.error('Erro ao processar a foto:', error);
            alert('Erro ao processar a foto. Por favor, tente novamente.');
          }
        };

        reader.onerror = (error) => {
          console.error('Erro ao ler o arquivo:', error);
          alert('Erro ao ler o arquivo. Por favor, tente novamente.');
        };

        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Erro ao fazer upload da foto:', error);
        alert('Erro ao fazer upload da foto. Por favor, tente novamente.');
      }
    }
  }

  clearOldProfileImages() {
    try {
      if (this.isBrowser) {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('profile_')) {
            localStorage.removeItem(key);
          }
        }
        console.log('Dados antigos de imagens de perfil removidos com sucesso');
      }
    } catch (error) {
      console.error('Erro ao limpar dados antigos:', error);
    }
  }

  removePhoto() {
    this.socialPhoto = '';
  }

  triggerPhotoUpload() {
    this.photoInput.nativeElement.click();
  }

  async verifyQRCode() {
    if (!this.qrCodeUrl) {
      console.error('QR Code não gerado');
      return false;
    }

    try {
      console.log('Verificando QR Code...');

      const img = new Image();

      await new Promise((resolve, reject) => {
        img.onload = () => {
          console.log('QR Code carregado com sucesso, dimensões:', img.width, 'x', img.height);
          resolve(true);
        };

        img.onerror = (error) => {
          console.error('Erro ao carregar QR Code:', error);
          reject(error);
        };

        img.src = this.qrCodeUrl;
      });

      return true;
    } catch (error) {
      console.error('Erro ao verificar QR Code:', error);
      return false;
    }
  }

  copyLink() {
    if (this.socialLink) {
      navigator.clipboard.writeText(this.socialLink).then(() => {
        alert('Link copiado para a área de transferência!');
      }).catch(err => {
        console.error('Erro ao copiar o link:', err);
        alert('Erro ao copiar o link. Por favor, tente novamente.');
      });
    }
  }
} 