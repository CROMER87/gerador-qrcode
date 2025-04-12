import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';

interface SocialMedia {
    platform: string;
    url: string;
    icon: string;
}

interface SocialData {
    name: string;
    socials: SocialMedia[];
}

@Component({
    selector: 'app-social-links',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatTooltipModule
    ],
    template: `
    <div class="social-links-container">
      <div class="profile-header">
        <div class="profile-avatar">
          <mat-icon>person</mat-icon>
        </div>
        <h1>{{ socialData?.name || 'Redes Sociais' }}</h1>
      </div>

      <div class="social-links">
        <mat-card *ngFor="let social of socialData?.socials" class="social-card">
          <mat-card-content>
            <div class="social-icon">
              <mat-icon>{{ getSocialIcon(social.platform) }}</mat-icon>
            </div>
            <div class="social-info">
              <h2>{{ formatPlatformName(social.platform) }}</h2>
              <p>{{ social.url }}</p>
            </div>
            <a mat-raised-button color="primary" [href]="social.url" target="_blank" rel="noopener noreferrer">
              Acessar
            </a>
          </mat-card-content>
        </mat-card>
      </div>

      <div *ngIf="!socialData?.socials?.length" class="no-links">
        <p>Nenhuma rede social encontrada.</p>
      </div>

      <div class="footer">
        <p>Gerado com QR Code Generator</p>
        <a mat-button color="accent" routerLink="/">Voltar para o gerador</a>
      </div>
    </div>
  `,
    styles: [`
    .social-links-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Roboto', sans-serif;
    }

    .profile-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
    }

    .profile-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
    }

    .profile-avatar mat-icon {
      font-size: 60px;
      width: 60px;
      height: 60px;
      color: #757575;
    }

    h1 {
      font-size: 24px;
      font-weight: 500;
      color: #333;
      margin: 0;
    }

    .social-links {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .social-card {
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .social-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    .social-card mat-card-content {
      display: flex;
      align-items: center;
      padding: 15px;
    }

    .social-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
    }

    .social-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: #333;
    }

    .social-info {
      flex: 1;
    }

    .social-info h2 {
      font-size: 18px;
      font-weight: 500;
      margin: 0 0 5px 0;
      color: #333;
    }

    .social-info p {
      font-size: 14px;
      color: #666;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 200px;
    }

    .no-links {
      text-align: center;
      padding: 30px;
      background-color: #f9f9f9;
      border-radius: 8px;
      color: #666;
    }

    .footer {
      margin-top: 40px;
      text-align: center;
      color: #666;
      font-size: 14px;
    }

    .footer p {
      margin-bottom: 10px;
    }

    @media (max-width: 600px) {
      .social-card mat-card-content {
        flex-direction: column;
        align-items: flex-start;
      }

      .social-icon {
        margin-right: 0;
        margin-bottom: 10px;
      }

      .social-info {
        margin-bottom: 10px;
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
export class SocialLinksComponent implements OnInit {
    socialData: SocialData | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['data']) {
                try {
                    this.socialData = JSON.parse(decodeURIComponent(params['data']));
                } catch (error) {
                    console.error('Erro ao decodificar dados das redes sociais:', error);
                }
            }
        });
    }

    getSocialIcon(platform: string): string {
        switch (platform) {
            case 'facebook':
                return 'facebook';
            case 'instagram':
                return 'photo_camera';
            case 'twitter':
                return 'chat';
            case 'tiktok':
                return 'music_note';
            case 'youtube':
                return 'play_circle';
            case 'linkedin':
                return 'business';
            case 'pinterest':
                return 'image';
            case 'snapchat':
                return 'camera_alt';
            case 'reddit':
                return 'forum';
            case 'twitch':
                return 'live_tv';
            case 'github':
                return 'code';
            case 'behance':
                return 'palette';
            case 'dribbble':
                return 'sports_basketball';
            case 'medium':
                return 'article';
            case 'vimeo':
                return 'videocam';
            case 'soundcloud':
                return 'audiotrack';
            case 'spotify':
                return 'music_note';
            case 'custom':
                return 'link';
            default:
                return 'link';
        }
    }

    formatPlatformName(platform: string): string {
        switch (platform) {
            case 'facebook':
                return 'Facebook';
            case 'instagram':
                return 'Instagram';
            case 'twitter':
                return 'Twitter';
            case 'tiktok':
                return 'TikTok';
            case 'youtube':
                return 'YouTube';
            case 'linkedin':
                return 'LinkedIn';
            case 'pinterest':
                return 'Pinterest';
            case 'snapchat':
                return 'Snapchat';
            case 'reddit':
                return 'Reddit';
            case 'twitch':
                return 'Twitch';
            case 'github':
                return 'GitHub';
            case 'behance':
                return 'Behance';
            case 'dribbble':
                return 'Dribbble';
            case 'medium':
                return 'Medium';
            case 'vimeo':
                return 'Vimeo';
            case 'soundcloud':
                return 'SoundCloud';
            case 'spotify':
                return 'Spotify';
            case 'custom':
                return 'Link Personalizado';
            default:
                return platform.charAt(0).toUpperCase() + platform.slice(1);
        }
    }
} 