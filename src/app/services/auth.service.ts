import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
    id: string;
    email: string;
    name: string;
    subscriptionId?: string;
    subscriptionStatus?: 'active' | 'inactive' | 'trial';
    subscriptionEndDate?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) {
        // Verificar se há um usuário salvo no localStorage
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            this.currentUserSubject.next(JSON.parse(savedUser));
        }
    }

    register(email: string, password: string, name: string): Observable<User> {
        // Em produção, isso seria uma chamada à API
        // Por enquanto, simulamos o registro
        const newUser: User = {
            id: Math.random().toString(36).substring(2, 15),
            email,
            name,
            subscriptionStatus: 'inactive'
        };

        return of(newUser).pipe(
            tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            })
        );
    }

    login(email: string, password: string): Observable<User> {
        // Em produção, isso seria uma chamada à API
        // Por enquanto, simulamos o login
        const user: User = {
            id: 'user123',
            email,
            name: 'Usuário Teste',
            subscriptionStatus: 'inactive'
        };

        return of(user).pipe(
            tap(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            })
        );
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }

    isAuthenticated(): boolean {
        return !!this.currentUserSubject.value;
    }

    hasActiveSubscription(): boolean {
        const user = this.currentUserSubject.value;
        return user?.subscriptionStatus === 'active';
    }

    updateSubscriptionStatus(subscriptionId: string, status: 'active' | 'inactive' | 'trial', endDate?: string): void {
        const user = this.currentUserSubject.value;
        if (user) {
            const updatedUser = {
                ...user,
                subscriptionId,
                subscriptionStatus: status,
                subscriptionEndDate: endDate
            };

            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            this.currentUserSubject.next(updatedUser);
        }
    }
} 