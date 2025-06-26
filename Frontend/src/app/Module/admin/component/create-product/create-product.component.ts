import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-product',
  imports:[CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      category: [''],
      image: [null]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be under 5MB');
        return;
      }

      this.selectedFile = file;
      this.productForm.patchValue({ image: this.selectedFile });

      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('category', this.productForm.get('category')?.value);
      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.http.post('/api/products', formData).subscribe({
        next: res => {
          console.log('Product created successfully', res);
          alert('Product created!');
          this.productForm.reset();
          this.selectedFile = null;
          this.imagePreview = null;
        },
        error: err => {
          console.error('Product creation failed', err);
        }
      });
    }
  }
}
