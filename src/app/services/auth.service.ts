import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, User } from '@angular/fire/auth';
import { from, Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface AppUser {
    id: string;
    email: string;
    name: string;
    photoURL?: string;
    subscriptionId?: string;
    subscriptionStatus?: 'active' | 'inactive' | 'trial';
    subscriptionEndDate?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<AppUser | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private auth: Auth) {
        console.log('AuthService inicializado');
        console.log('Auth object:', this.auth);

        // Observar mudanças no usuário do Firebase
        this.auth.onAuthStateChanged((user) => {
            if (user) {
                const appUser: AppUser = {
                    id: user.uid,
                    email: user.email || '',
                    name: user.displayName || '',
                    photoURL: user.photoURL || undefined,
                    subscriptionStatus: 'inactive'
                };
                this.currentUserSubject.next(appUser);
            } else {
                this.currentUserSubject.next(null);
            }
        });
    }

    // Login/Cadastro com Google
    loginWithGoogle(): Observable<any> {
        console.log('Chamando loginWithGoogle...');
        console.log('Auth object no método:', this.auth);
        return from(signInWithPopup(this.auth, new GoogleAuthProvider()));
    }

    // Métodos para compatibilidade com outros componentes
    register(email: string, password: string, name: string): Observable<AppUser> {
        // Simular registro para compatibilidade
        const newUser: AppUser = {
            id: Math.random().toString(36).substring(2, 15),
            email,
            name,
            subscriptionStatus: 'inactive'
        };
        return of(newUser).pipe(
            tap(user => {
                this.currentUserSubject.next(user);
            })
        );
    }

    login(email: string, password: string): Observable<AppUser> {
        // Simular login para compatibilidade
        const user: AppUser = {
            id: 'user123',
            email,
            name: 'Usuário Teste',
            subscriptionStatus: 'inactive'
        };
        return of(user).pipe(
            tap(user => {
                this.currentUserSubject.next(user);
            })
        );
    }

    // Obter usuário atual (Firebase)
    getCurrentUser(): User | null {
        return this.auth.currentUser;
    }

    // Obter usuário da aplicação
    getCurrentAppUser(): AppUser | null {
        return this.currentUserSubject.value;
    }

    // Verificar se está logado
    isLoggedIn(): boolean {
        return !!this.auth.currentUser;
    }

    // Para compatibilidade com outros componentes
    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    // Verificar se tem assinatura ativa
    hasActiveSubscription(): boolean {
        const user = this.currentUserSubject.value;
        return user?.subscriptionStatus === 'active';
    }

    // Atualizar status da assinatura
    updateSubscriptionStatus(subscriptionId: string, status: 'active' | 'inactive' | 'trial', endDate?: string): void {
        const user = this.currentUserSubject.value;
        if (user) {
            const updatedUser = {
                ...user,
                subscriptionId,
                subscriptionStatus: status,
                subscriptionEndDate: endDate
            };
            this.currentUserSubject.next(updatedUser);
        }
    }

    // Fazer logout
    logout(): Observable<void> {
        return from(this.auth.signOut()).pipe(
            tap(() => {
                this.currentUserSubject.next(null);
            })
        );
    }
} 