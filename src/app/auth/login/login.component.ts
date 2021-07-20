import { AuthService } from './../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    'email':['',[Validators.required,Validators.email]],
    'password':['',[Validators.required]]
  })
  loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authServeice: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.loading = true;
    const credentials = this.loginForm.value;
    this.authServeice.login(credentials).subscribe((user)=>{
      this.snackBar.open('User autntication sucess. Welcome '+user.firstname,'OK',{duration:5000});
      this.router.navigateByUrl('/');
      this.loading = false;
    },(err)=>{
      this.snackBar.open('Error registred: '+err.error.message,'OK',{duration:2000});
      this.loading = false;
    })
  }
}
