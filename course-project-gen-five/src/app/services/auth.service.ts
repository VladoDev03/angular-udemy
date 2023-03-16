import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "../shared/user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    kind: string
    idToken: string
    email: string
    refreshToken: string
    expiresIn: string
    localId: string
    registered?: boolean
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null)

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAICcaiTA2qfZc3VJVnnkoJYryYvTa-YDI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
            )
        }))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAICcaiTA2qfZc3VJVnnkoJYryYvTa-YDI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
            )
        }))
    }

    logout() {
        this.user.next(null)
        this.router.navigate(['/auth'])
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000
        )

        const user = new User(
            email,
            userId,
            token,
            expirationDate
        )

        this.user.next(user)
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'The Internet connection seems to have disappeared :('

        const error = new Error(errorMessage)

        if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => error)
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                error.message = 'This email already exists!'
                break
            case 'EMAIL_NOT_FOUND':
                error.message = 'This email doest not exist!'
                break
            case 'INVALID_PASSWORD':
                error.message = 'This password is not correct!'
                break
            default:
                error.message = 'An error occured!'
                break
        }

        // return throwError(() => error.message)
        return throwError(() => error)
    }
}
