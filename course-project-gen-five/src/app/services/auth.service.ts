import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

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
    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAICcaiTA2qfZc3VJVnnkoJYryYvTa-YDI',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(errorRes => {
            let errorMessage = 'The Internet connection seems to have disappeared :('

            const error = new Error(errorMessage)

            if (!errorRes.error || !errorRes.error.error) {
                return throwError(() => error)
            }

            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    error.message = 'This email already exists!'
                    break
                default:
                    error.message = 'An error occured!'
                    break
            }

            return throwError(() => error)
        }))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAICcaiTA2qfZc3VJVnnkoJYryYvTa-YDI',
            {
                email: email,
                password: password,
                returnSercureToken: true
            }
        )
    }
}
