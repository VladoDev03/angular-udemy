import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../alert/alert.component';
import { AuthResponseData, AuthService } from '../services/auth.service';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true
  isLoading: boolean = false
  error: string = null
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective

  private closeSub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

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
        this.router.navigate(['/recipes'])
      },
      error: (errorMessage) => {
        console.log(errorMessage)
        this.error = errorMessage
        this.isLoading = false
        this.showErrorAlert(errorMessage)
      }
    })

    form.reset()
  }

  onHandleError() {
    this.error = null
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe()
    }
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef

    hostViewContainerRef.clear()
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)

    componentRef.instance.message = message
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe()
      hostViewContainerRef.clear()
    })
  }
}
