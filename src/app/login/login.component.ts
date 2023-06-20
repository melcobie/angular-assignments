import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {email:'', password: ''};
  inputValidation:any= {};
  error: string | undefined;
  hidePassword = true;
  constructor(private route: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.route.navigate(['/']);
    }
  }
  validateInput(){
    this.inputValidation = {};
    if(!!this.user.email){
      this.inputValidation.email = "Email obligatoire";
    }
    if(!!this.user.password){
      this.inputValidation.password = "Mot de passe obligatoire";
    }
  }
  login(){
    this.validateInput();

    let okay = (data:any)=>{
        this.navigateAccordingToRole();
    }
    let notokay = (err:any)=>{
        this.error = err.error.message;
    }
    this.authService.login(this.user.email,this.user.password).subscribe(okay,notokay);
  }
  navigateAccordingToRole(){
    this.route.navigateByUrl("/");
  }
}
