import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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
  customName?: string;
}

interface SocialData {
  name: string;
  socials: SocialMedia[];
  photo?: string;
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
        <div class="profile-avatar" [style.background-image]="socialData?.photo ? 'url(' + socialData?.photo + ')' : 'none'">
          <mat-icon *ngIf="!socialData?.photo">person</mat-icon>
        </div>
        <h1>{{ socialData?.name || 'Redes Sociais' }}</h1>
      </div>

      <div class="social-links">
        <mat-card *ngFor="let social of socialData?.socials" class="social-card" [class]="'social-card-' + social.platform">
          <mat-card-content>
            <div class="social-icon">
              <mat-icon>{{ getSocialIcon(social.platform) }}</mat-icon>
            </div>
            <div class="social-info">
              <h2>{{ social.platform === 'custom' && social.customName ? social.customName : formatPlatformName(social.platform) }}</h2>
              <p>{{ social.url }}</p>
            </div>
            <a mat-raised-button [color]="getSocialColor(social.platform)" [href]="social.url" target="_blank" rel="noopener noreferrer">
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
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #f6f9fc 0%, #e9f2f9 100%);
    }

    .social-links-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Roboto', sans-serif;
      min-height: 100vh;
    }

    .profile-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
      padding: 30px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .profile-avatar {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;
      background-size: cover;
      background-position: center;
      border: 4px solid rgba(255, 255, 255, 0.8);
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .profile-avatar:hover {
      transform: scale(1.05);
      box-shadow: 0 12px 40px rgba(31, 38, 135, 0.2);
    }

    .profile-avatar mat-icon {
      font-size: 70px;
      width: 70px;
      height: 70px;
      color: #757575;
    }

    h1 {
      font-size: 32px;
      font-weight: 600;
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0;
      text-align: center;
    }

    .social-links {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .social-card {
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
      transition: all 0.4s ease;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      overflow: hidden;
    }

    .social-card:hover {
      transform: translateY(-6px) scale(1.02);
      box-shadow: 0 12px 40px rgba(31, 38, 135, 0.15);
    }

    .social-card mat-card-content {
      display: flex;
      align-items: center;
      padding: 25px;
      position: relative;
      overflow: hidden;
    }

    .social-card mat-card-content::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
      pointer-events: none;
    }

    .social-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .social-card:hover .social-icon {
      transform: scale(1.1);
    }

    .social-icon mat-icon {
      font-size: 28px;
      width: 28px;
      height: 28px;
      color: white;
    }

    .social-info {
      flex: 1;
    }

    .social-info h2 {
      font-size: 20px;
      font-weight: 600;
      margin: 0 0 8px 0;
      background: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .social-info p {
      font-size: 14px;
      color: #666;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 250px;
    }

    .no-links {
      text-align: center;
      padding: 40px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
      border-radius: 16px;
      color: #666;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .footer {
      margin-top: 50px;
      text-align: center;
      color: #666;
      font-size: 14px;
      padding: 30px;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .footer p {
      margin-bottom: 15px;
      font-size: 16px;
      color: #2c3e50;
    }

    /* Cores específicas para cada rede social com degrades */
    .social-card-facebook .social-icon {
      background: linear-gradient(135deg, #1877f2 0%, #0d5ab9 100%);
    }

    .social-card-instagram .social-icon {
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    }

    .social-card-twitter .social-icon {
      background: linear-gradient(135deg, #1da1f2 0%, #0d8ecf 100%);
    }

    .social-card-tiktok .social-icon {
      background: linear-gradient(135deg, #000000 0%, #333333 100%);
    }

    .social-card-youtube .social-icon {
      background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
    }

    .social-card-linkedin .social-icon {
      background: linear-gradient(135deg, #0077b5 0%, #005582 100%);
    }

    .social-card-pinterest .social-icon {
      background: linear-gradient(135deg, #e60023 0%, #b3001c 100%);
    }

    .social-card-snapchat .social-icon {
      background: linear-gradient(135deg, #fffc00 0%, #e6e300 100%);
    }

    .social-card-reddit .social-icon {
      background: linear-gradient(135deg, #ff4500 0%, #cc3700 100%);
    }

    .social-card-twitch .social-icon {
      background: linear-gradient(135deg, #9146ff 0%, #7a3cd6 100%);
    }

    .social-card-github .social-icon {
      background: linear-gradient(135deg, #333333 0%, #1a1a1a 100%);
    }

    .social-card-behance .social-icon {
      background: linear-gradient(135deg, #1769ff 0%, #0d4fc2 100%);
    }

    .social-card-dribbble .social-icon {
      background: linear-gradient(135deg, #ea4c89 0%, #c73a6e 100%);
    }

    .social-card-medium .social-icon {
      background: linear-gradient(135deg, #000000 0%, #333333 100%);
    }

    .social-card-vimeo .social-icon {
      background: linear-gradient(135deg, #1ab7ea 0%, #0d8cb3 100%);
    }

    .social-card-soundcloud .social-icon {
      background: linear-gradient(135deg, #ff3300 0%, #cc2900 100%);
    }

    .social-card-spotify .social-icon {
      background: linear-gradient(135deg, #1db954 0%, #169c46 100%);
    }

    .social-card-custom .social-icon {
      background: linear-gradient(135deg, #666666 0%, #444444 100%);
    }

    @media (max-width: 600px) {
      .social-card mat-card-content {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 20px;
      }

      .social-icon {
        margin-right: 0;
        margin-bottom: 15px;
      }

      .social-info {
        margin-bottom: 15px;
        width: 100%;
      }

      .social-info p {
        max-width: 100%;
      }

      a[mat-raised-button] {
        width: 100%;
      }

      .profile-header {
        padding: 20px;
      }

      .profile-avatar {
        width: 120px;
        height: 120px;
      }

      h1 {
        font-size: 24px;
      }
    }
  `]
})
export class SocialLinksComponent implements OnInit {
  socialData: SocialData | null = null;
  private isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        try {
          const decodedData = decodeURIComponent(params['data']);

          try {
            this.socialData = JSON.parse(decodedData);

            // Verificar se os dados são válidos
            if (!this.socialData || !this.socialData.name || !this.socialData.socials || !Array.isArray(this.socialData.socials)) {
              this.socialData = {
                name: 'Redes Sociais',
                socials: []
              };
            }
          } catch (parseError) {
            this.socialData = {
              name: 'Redes Sociais',
              socials: []
            };
          }
        } catch (decodeError) {
          this.socialData = {
            name: 'Redes Sociais',
            socials: []
          };
        }
      } else {
        this.socialData = {
          name: 'Redes Sociais',
          socials: []
        };
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

  getSocialColor(platform: string): string {
    switch (platform) {
      case 'facebook':
        return 'primary';
      case 'instagram':
        return 'accent';
      case 'twitter':
        return 'primary';
      case 'tiktok':
        return 'primary';
      case 'youtube':
        return 'warn';
      case 'linkedin':
        return 'primary';
      case 'pinterest':
        return 'warn';
      case 'snapchat':
        return 'accent';
      case 'reddit':
        return 'warn';
      case 'twitch':
        return 'accent';
      case 'github':
        return 'primary';
      case 'behance':
        return 'primary';
      case 'dribbble':
        return 'warn';
      case 'medium':
        return 'primary';
      case 'vimeo':
        return 'primary';
      case 'soundcloud':
        return 'warn';
      case 'spotify':
        return 'accent';
      default:
        return 'primary';
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