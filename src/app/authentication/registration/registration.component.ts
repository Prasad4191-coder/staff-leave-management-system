import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup | any;
  constructor(private fb: FormBuilder, private authServ: AuthService) { }

  departments: any[] = [
    { label: 'Department 1', value: 'dept1' },
    { label: 'Department 2', value: 'dept2' },
    { label: 'Department 3', value: 'dept3' },
  ];

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      role: this.fb.control('', Validators.required),
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      contact: this.fb.control('', Validators.required),
      dept: this.fb.control('', Validators.required),
      userName: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
    })
  }
  registerUser() {
    this.authServ.signUp(this.registrationForm.value).subscribe((data: any) => {
    })
    this.registrationForm.reset()

  }
}
