import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { AddressCardComponent } from '../../../../shared/component/address-card/address-card.component';
import { FormGroup, FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { OrderService } from '../../../../../State/Order/order.service';

@Component({
  selector: 'app-address-form',
  imports: [CommonModule,MatDividerModule,AddressCardComponent,FormsModule,ReactiveFormsModule,
    MatRadioModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.css'
})
export class AddressFormComponent {

  addresses=[1,1,1];
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private orderService:OrderService
  ){
    this.myForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lasttName: ["", Validators.required],
      streetAddress: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      zipCode: ["", Validators.required],
      mobile: ["", Validators.required],
    });
  }

  

  handleSubmit=()=>{
    const formValue=this.myForm.value
    this.orderService.createOrder(formValue)
    console.log("form data ",formValue)
  }

  handleCreateOrder(item:any){

  }
}
