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
    .social-links-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      font-family: 'Roboto', sans-serif;
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .profile-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 30px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 16px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .profile-avatar {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      background-size: cover;
      background-position: center;
      border: 4px solid white;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .profile-avatar mat-icon {
      font-size: 60px;
      width: 60px;
      height: 60px;
      color: #757575;
    }

    h1 {
      font-size: 28px;
      font-weight: 500;
      color: #333;
      margin: 0;
      text-align: center;
    }

    .social-links {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }

    .social-card {
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.9);
      border: none;
    }

    .social-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }

    .social-card mat-card-content {
      display: flex;
      align-items: center;
      padding: 20px;
    }

    .social-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
    }

    .social-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: white;
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
      background: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      color: #666;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .footer {
      margin-top: 40px;
      text-align: center;
      color: #666;
      font-size: 14px;
      padding: 20px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .footer p {
      margin-bottom: 10px;
    }

    /* Cores específicas para cada rede social */
    .social-card-facebook .social-icon {
      background: #1877f2;
    }

    .social-card-instagram .social-icon {
      background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
    }

    .social-card-twitter .social-icon {
      background: #1da1f2;
    }

    .social-card-tiktok .social-icon {
      background: #000000;
    }

    .social-card-youtube .social-icon {
      background: #ff0000;
    }

    .social-card-linkedin .social-icon {
      background: #0077b5;
    }

    .social-card-pinterest .social-icon {
      background: #e60023;
    }

    .social-card-snapchat .social-icon {
      background: #fffc00;
    }

    .social-card-reddit .social-icon {
      background: #ff4500;
    }

    .social-card-twitch .social-icon {
      background: #9146ff;
    }

    .social-card-github .social-icon {
      background: #333;
    }

    .social-card-behance .social-icon {
      background: #1769ff;
    }

    .social-card-dribbble .social-icon {
      background: #ea4c89;
    }

    .social-card-medium .social-icon {
      background: #000000;
    }

    .social-card-vimeo .social-icon {
      background: #1ab7ea;
    }

    .social-card-soundcloud .social-icon {
      background: #ff3300;
    }

    .social-card-spotify .social-icon {
      background: #1db954;
    }

    .social-card-custom .social-icon {
      background: #666;
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
  private isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        try {
          // Carregar dados do localStorage usando o ID
          const socialId = params['id'];

          if (this.isBrowser) {
            const storedData = localStorage.getItem(socialId);

            if (storedData) {
              this.socialData = JSON.parse(storedData);

              // Verificar se há uma foto de perfil e tentar carregá-la do localStorage
              if (this.socialData?.photo) {
                // Se a foto já estiver em formato base64, usar diretamente
                if (this.socialData.photo.startsWith('data:image')) {
                  console.log('Foto em formato base64 encontrada');
                } else {
                  // Tentar extrair o nome do arquivo e carregar do localStorage
                  const fileName = this.socialData.photo.split('/').pop();
                  if (fileName) {
                    const storedImage = localStorage.getItem(`profile_${fileName}`);
                    if (storedImage) {
                      console.log('Foto carregada do localStorage');
                      this.socialData.photo = storedImage;
                    } else {
                      console.error('Foto não encontrada no localStorage:', fileName);
                    }
                  }
                }
              }
            } else {
              console.error('Dados sociais não encontrados para o ID:', socialId);
            }
          } else {
            console.log('Executando no servidor, não é possível acessar localStorage');
            // No servidor, podemos definir dados padrão ou deixar vazio
            this.socialData = {
              name: 'Redes Sociais',
              socials: []
            };
          }
        } catch (error) {
          console.error('Erro ao carregar dados das redes sociais:', error);
        }
      } else if (params['data']) {
        // Mantendo compatibilidade com o formato anterior
        try {
          if (this.isBrowser) {
            this.socialData = JSON.parse(decodeURIComponent(params['data']));

            // Verificar se há uma foto de perfil e tentar carregá-la do localStorage
            if (this.socialData?.photo) {
              // Se a foto já estiver em formato base64, usar diretamente
              if (this.socialData.photo.startsWith('data:image')) {
                console.log('Foto em formato base64 encontrada');
              } else {
                // Tentar extrair o nome do arquivo e carregar do localStorage
                const fileName = this.socialData.photo.split('/').pop();
                if (fileName) {
                  const storedImage = localStorage.getItem(`profile_${fileName}`);
                  if (storedImage) {
                    console.log('Foto carregada do localStorage');
                    this.socialData.photo = storedImage;
                  } else {
                    console.error('Foto não encontrada no localStorage:', fileName);
                  }
                }
              }
            }
          } else {
            console.log('Executando no servidor, não é possível acessar localStorage');
            // No servidor, podemos definir dados padrão ou deixar vazio
            this.socialData = {
              name: 'Redes Sociais',
              socials: []
            };
          }
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