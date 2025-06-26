import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { AuthService } from '../../../State/Auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule,MatInputModule,
    HttpClientModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
@Input() changeTemplate:any;

loginForm : FormGroup;

constructor(private formBuilder: FormBuilder, private store: Store, private authService:AuthService) {
  this.loginForm = this.formBuilder.group({
    firstName:["",[Validators.required]],
    lastName:["",[Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });
}

submitForm():void{
  if(this.loginForm.valid){
    
    console.log("login req data ", this.loginForm.value)
    this.authService.register(this.loginForm.value);
  }
}
}
