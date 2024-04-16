import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private as: AuthService, private router: Router) { }
  ngOnInit(): void {
  }

  myForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
  });

  errorMass = ''
  onSubmit() {
    let data = this.myForm.value;
    this.as.login(data.email, data.password)
      .then(_result => {
        this.errorMass = '';
        this.router.navigate(['/']);
      })
      .catch(err => {
        if (err.code === 'auth/invalid-login-credentials') {
          this.errorMass = 'Invalid email or password.';
        } else {
          this.errorMass = 'An error occurred during login.';
        }
        console.log(this.errorMass);
      });
  }
}
