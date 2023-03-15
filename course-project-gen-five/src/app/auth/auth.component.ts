import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode: boolean = true
  isLoading: boolean = false
  error: string = null

  constructor(private authService: AuthService) { }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm) {
    // console.log(form.value)

    // Deprecated
    // this.authService.signup(email, password)
    //   .subscribe(resData => {
    //     console.log(resData)
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )

    if (!form.valid) {
      return
    }

    const email = form.value.email
    const password = form.value.password

    let authObs: Observable<AuthResponseData>

    this.isLoading = true

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    } else {
      authObs = this.authService.signup(email, password)
    }

    authObs.subscribe({
      next: (resData) => {
        console.log(resData)
        this.isLoading = false
      },
      error: (errorMessage) => {
        console.log(errorMessage)
        this.error = errorMessage
        this.isLoading = false
      }
    })

    form.reset()
  }
}
