import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as QRCode from 'qrcode';
import { CommonModule } from '@angular/common';
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

interface SocialMedia {
    platform: string;
    url: string;
    icon: string;
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
      <mat-tab-group>
        <mat-tab label="Gerar QR Code">
          <div class="tab-content">
            <mat-form-field appearance="fill">
              <mat-label>Tipo de QR Code</mat-label>
              <mat-select [(ngModel)]="selectedType" (selectionChange)="onTypeChange()">
                <mat-option value="text">Texto</mat-option>
                <mat-option value="whatsapp">WhatsApp</mat-option>
                <mat-option value="vcard">vCard</mat-option>
                <mat-option value="url">URL</mat-option>
                <mat-option value="email">Email</mat-option>
                <mat-option value="sms">SMS</mat-option>
                <mat-option value="wifi">Wi-Fi</mat-option>
                <mat-option value="geo">Localização</mat-option>
                <mat-option value="phone">Telefone</mat-option>
                <mat-option value="social">Redes Sociais</mat-option>
              </mat-select>
            </mat-form-field>

            <div *ngIf="selectedType === 'text'">
              <mat-form-field appearance="fill">
                <mat-label>Texto</mat-label>
                <input matInput [(ngModel)]="text" placeholder="Digite o texto">
              </mat-form-field>
            </div>

            <div *ngIf="selectedType === 'whatsapp'">
              <mat-form-field appearance="fill">
                <mat-label>Número do WhatsApp</mat-label>
                <input matInput [(ngModel)]="whatsappNumber" placeholder="Ex: 5511999999999">
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Mensagem</mat-label>
                <input matInput [(ngModel)]="whatsappMessage" placeholder="Digite a mensagem">
              </mat-form-field>
            </div>

            <div *ngIf="selectedType === 'vcard'">
              <mat-form-field appearance="fill">
                <mat-label>Nome</mat-label>
                <input matInput [(ngModel)]="vcardName" placeholder="Nome completo">
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Telefone</mat-label>
                <input matInput [(ngModel)]="vcardPhone" placeholder="Número de telefone">
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Email</mat-label>
                <input matInput [(ngModel)]="vcardEmail" placeholder="Email">
              </mat-form-field>
            </div>

            <div *ngIf="selectedType === 'url'">
              <mat-form-field appearance="fill">
                <mat-label>URL</mat-label>
                <input matInput [(ngModel)]="url" placeholder="https://exemplo.com">
              </mat-form-field>
            </div>

            <div *ngIf="selectedType === 'email'">
              <mat-form-field appearance="fill">
                <mat-label>Email</mat-label>
                <input matInput [(ngModel)]="emailAddress" placeholder="exemplo@dominio.com">
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Assunto</mat-label>
                <input matInput [(ngModel)]="emailSubject" placeholder="Assunto do email">
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Mensagem</mat-label>
                <input matInput [(ngModel)]="emailBody" placeholder="Corpo do email">
              </mat-form-field>
            </div>

            <div *ngIf="selectedType === 'sms'">
              <mat-form-field appearance="fill">
                <mat-label>Número de Telefone</mat-label>
                <input matInput [(ngModel)]="smsNumber" placeholder="Ex: 5511999999999">
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Mensagem</mat-label>
                <input matInput [(ngModel)]="smsMessage" placeholder="Digite a mensagem">
              </mat-form-field>
            </div>

            <div *ngIf="selectedType === 'wifi'">
              <mat-form-field appearance="fill">
                <mat-label>Nome da Rede (SSID)</mat-label>
                <input matInput [(ngModel)]="wifiSSID" placeholder="Nome da rede Wi-Fi">
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Senha</mat-label>
                <input matInput [(ngModel)]="wifiPassword" placeholder="Senha da rede">
              </mat-form-field>
              <mat-checkbox [(ngModel)]="wifiHidden">Rede oculta</mat-checkbox>
            </div>

            <div *ngIf="selectedType === 'geo'">
              <mat-form-field appearance="fill">
                <mat-label>Latitude</mat-label>
                <input matInput [(ngModel)]="geoLatitude" placeholder="Ex: -23.5505">
              </mat-form-field>
              <mat-form-field appearance="fill">
                <mat-label>Longitude</mat-label>
                <input matInput [(ngModel)]="geoLongitude" placeholder="Ex: -46.6333">
              </mat-form-field>
            </div>

            <div *ngIf="selectedType === 'phone'">
              <mat-form-field appearance="fill">
                <mat-label>Número de Telefone</mat-label>
                <input matInput [(ngModel)]="phoneNumber" placeholder="Ex: 5511999999999">
              </mat-form-field>
            </div>

            <div *ngIf="selectedType === 'social'">
              <mat-form-field appearance="fill">
                <mat-label>Nome</mat-label>
                <input matInput [(ngModel)]="socialName" placeholder="Seu nome ou apelido">
              </mat-form-field>
              
              <div class="social-media-list">
                <h3>Suas Redes Sociais</h3>
                
                <div *ngFor="let social of socialMediaList; let i = index" class="social-media-item">
                  <mat-form-field appearance="fill">
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
                  
                  <mat-form-field appearance="fill">
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
            </div>

            <button mat-raised-button color="primary" (click)="generateQRCode()">Gerar QR Code</button>
          </div>
        </mat-tab>
        
        <mat-tab label="Personalizar" [disabled]="!qrCodeUrl">
          <div class="tab-content">
            <div class="customization-section">
              <h3>Cores</h3>
              <div class="color-picker">
                <div class="color-option">
                  <label>Cor do QR Code</label>
                  <input type="color" [(ngModel)]="qrCodeColor" (change)="updateQRCode()">
                </div>
                <div class="color-option">
                  <label>Cor de Fundo</label>
                  <input type="color" [(ngModel)]="backgroundColor" (change)="updateQRCode()">
                </div>
              </div>
            </div>

            <div class="customization-section">
              <h3>Logo</h3>
              <div class="logo-upload">
                <input type="file" (change)="onLogoUpload($event)" accept="image/*">
                <button mat-raised-button (click)="removeLogo()" *ngIf="hasLogo">Remover Logo</button>
              </div>
            </div>

            <div class="customization-section">
              <h3>Estilo</h3>
              <div class="style-options">
                <mat-checkbox [(ngModel)]="roundedCorners" (change)="updateQRCode()">Cantos arredondados</mat-checkbox>
                <mat-checkbox [(ngModel)]="quietZone" (change)="updateQRCode()">Zona silenciosa</mat-checkbox>
              </div>
              <div class="slider-option">
                <label>Tamanho do QR Code</label>
                <mat-slider min="100" max="500" step="10" [(ngModel)]="qrCodeSize" (change)="updateQRCode()">
                  <input matSliderThumb>
                </mat-slider>
              </div>
            </div>

            <button mat-raised-button color="accent" (click)="applyCustomization()">Aplicar Personalização</button>
          </div>
        </mat-tab>
      </mat-tab-group>

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
            <p><mat-icon>phone</mat-icon> {{ whatsappNumber }}</p>
            <p *ngIf="whatsappMessage"><mat-icon>message</mat-icon> {{ whatsappMessage }}</p>
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
                {{ social.platform }}
              </mat-chip>
            </div>
          </div>
        </div>
        <div class="download-options">
          <button mat-raised-button color="accent" (click)="downloadQRCode()">Download</button>
          <button mat-raised-button color="primary" (click)="downloadQRCodeWithInfo()">Download com Informações</button>
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
    }

    .tab-content {
      padding: 20px 0;
    }

    .qr-result {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
      border-radius: 8px;
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

    .customization-section {
      margin-bottom: 20px;
      padding: 15px;
      background: #f9f9f9;
      border-radius: 8px;
    }

    .color-picker {
      display: flex;
      gap: 20px;
      margin-top: 10px;
    }

    .color-option {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .logo-upload {
      margin-top: 10px;
    }

    .style-options {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
    }

    .slider-option {
      margin-top: 20px;
    }

    .download-options {
      display: flex;
      gap: 10px;
      margin-top: 10px;
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
  `]
})
export class QrGeneratorComponent {
    @ViewChild('qrResult') qrResult!: ElementRef;
    @ViewChild('qrImage') qrImage!: ElementRef;

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

    constructor() {
        this.addSocialMedia();
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
        let content = '';

        switch (this.selectedType) {
            case 'text':
                content = this.text;
                break;
            case 'whatsapp':
                content = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(this.whatsappMessage)}`;
                break;
            case 'vcard':
                content = `BEGIN:VCARD\nVERSION:3.0\nFN:${this.vcardName}\nTEL:${this.vcardPhone}\nEMAIL:${this.vcardEmail}\nEND:VCARD`;
                break;
            case 'url':
                content = this.url;
                break;
            case 'email':
                content = `mailto:${this.emailAddress}?subject=${encodeURIComponent(this.emailSubject)}&body=${encodeURIComponent(this.emailBody)}`;
                break;
            case 'sms':
                content = `smsto:${this.smsNumber}:${this.smsMessage}`;
                break;
            case 'wifi':
                content = `WIFI:T:WPA;S:${this.wifiSSID};P:${this.wifiPassword};${this.wifiHidden ? 'H:true;' : ''};`;
                break;
            case 'geo':
                content = `geo:${this.geoLatitude},${this.geoLongitude}`;
                break;
            case 'phone':
                content = `tel:${this.phoneNumber}`;
                break;
            case 'social':
                const socialData = {
                    name: this.socialName,
                    socials: this.socialMediaList.filter(social => social.url.trim() !== '')
                };

                content = `${window.location.origin}/social-links?data=${encodeURIComponent(JSON.stringify(socialData))}`;
                break;
        }

        try {
            this.updateQROptions();
            this.qrCodeUrl = await QRCode.toDataURL(content, this.qrOptions);
        } catch (error) {
            console.error('Erro ao gerar QR Code:', error);
            alert('Erro ao gerar QR Code. Por favor, verifique os dados inseridos.');
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
        if (this.qrCodeUrl) {
            const link = document.createElement('a');
            link.href = this.qrCodeUrl;
            link.download = `qrcode-${this.selectedType}.png`;
            link.click();
        }
    }

    async downloadQRCodeWithInfo() {
        if (this.qrCodeUrl) {
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

                    ctx.fillStyle = '#f3e5f5';
                    ctx.fillRect(20, qrY + qrSize + 20, canvas.width - 40, 120);

                    ctx.fillStyle = '#333';
                    ctx.font = 'bold 20px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'top';
                    ctx.fillText(this.socialName, canvas.width / 2, qrY + qrSize + 60);

                    ctx.font = '16px Arial';
                    ctx.fillText('Redes Sociais', canvas.width / 2, qrY + qrSize + 100);

                    const link = document.createElement('a');
                    link.href = canvas.toDataURL('image/png');
                    link.download = `qrcode-social-${this.socialName}.png`;
                    link.click();
                } catch (error) {
                    console.error('Erro ao gerar imagem com dados:', error);
                    alert('Erro ao gerar imagem com dados. Tentando download do QR Code apenas.');
                    this.downloadQRCode();
                }
            } else {
                this.downloadQRCode();
            }
        }
    }
} 