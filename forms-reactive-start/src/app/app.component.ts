import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup
  forbiddenUsernames = ['Chris', 'Anna']

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [
          Validators.required,
          this.forbiddenNames.bind(this)
        ]),
        'email': new FormControl(null, [
          Validators.required,
          Validators.email
        ], this.forbiddenEmails)
      }),
      'gender': new FormControl(this.genders[0]),
      'hobbies': new FormArray([])
    })

    this.signupForm.statusChanges.subscribe(
      (status) => console.log(status)
    )
    
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // )

    // this.signupForm.setValue({
    //   'userData': {
    //     'username': 'Name',
    //     'email': 'email@email.com'
    //   },
    //   'gender': 'male',
    //   'hobbies': []
    // })

    this.signupForm.patchValue({
      'userData': {
        'username': 'Name',
        'email': 'email@email.com'
      }
    })
  }

  // getControls() {
  //   return (<FormArray>this.signupForm.get('hobbies')).controls;
  // }

  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control)
  }

  onSubmit() {
    console.log(this.signupForm)
    this.signupForm.reset()
    // this.signupForm.reset({
    //   'gender': 'male',
    //   'hobbies': []
    // })
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true}
    }

    return null
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true})
        } else {
          resolve(null)
        }
      }, 1500)
    })

    return promise
  }
}
