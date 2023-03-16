import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup | any;
  userInfo: any;
  constructor(private fb: FormBuilder, private authServ: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: this.fb.control(null, Validators.required),
      password: this.fb.control('', Validators.required)
    })
  }
  loginUser() {
    this.authServ.login().subscribe((data: any) => {
      for (const element of data) {
        if ((element.userName == this.loginForm.value.userName) && (element.password == this.loginForm.value.password)) {
          if (element.role == "Hod") {
            this.userInfo = element.role
            this.authServ.userCheck(element.role)
            this.router.navigate(['dashboard'],)
          } else if (element.role == "Staff") {
            this.userInfo = element
            this.authServ.userCheck(element)
            this.router.navigate(['dashboard'])
          }
        } else {
          console.log('your are not register user')
        }
      }
    })
  }

}
