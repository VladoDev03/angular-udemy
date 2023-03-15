import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('f') signupForm: NgForm
  defaultQuestion: string = 'pet'
  answer: string = ''
  genders = ['male', 'female']
  submitted: boolean = false
  user = {
    username: '',
    email: '',
    secretQuestion: '',
    answer: '',
    gender: ''
  }

  suggestUserName() {
    const suggestedName = 'Superuser';
    //not the best
    // this.signupForm.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: ''
    //   },
    //   secret: this.defaultQuestion,
    //   questionAnswer: '',
    //   gender: 'male'
    // })
    this.signupForm.form.patchValue({
      userData: {
        username: suggestedName
      }
    })
  }

  // onSubmit(form: NgForm) {
  //   console.log(form.value)
  // }

  onSubmit() {
    // console.log(this.signupForm)
    this.submitted = true
    this.user.username = this.signupForm.value.userData.username
    this.user.email = this.signupForm.value.userData.email
    this.user.secretQuestion = this.signupForm.value.secret
    this.user.answer = this.signupForm.value.questionAnswer
    this.user.gender = this.signupForm.value.gender

    this.signupForm.reset()
  }
}
