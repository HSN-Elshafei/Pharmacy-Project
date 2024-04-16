import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private as: AuthService, private us: UserService, private router: Router) { }
  ngOnInit(): void {
  }

  myForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    userName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    address: new FormControl(null, Validators.required),
  });
  errorMass = ''
  onSubmit() {
    let data = this.myForm.value;
    this.as.signup(data.email, data.password)
      .then(result => {
        this.errorMass = ''
        this.us.addUser(result.user?.uid, data.name, data.address).then(() => this.router.navigate(['/'])).catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

}
