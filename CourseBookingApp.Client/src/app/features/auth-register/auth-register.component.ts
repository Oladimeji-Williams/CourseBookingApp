import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './auth-register.component.html',
  styleUrl: './auth-register.component.css',
})
export class RegisterComponent {
  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ){
    this.form = this.fb.group(
      {
        email: ["", [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    );
  }
  submit(): void{
    if(this.form.valid){
      const{email, password} = this.form.getRawValue();
      this.auth.register(email, password).subscribe(
        {
          next: () =>{
            this.router.navigate(["/courses"])
          },
          error: (error) =>{
            console.error(error);
          }
        }
      )
    }
  }
}
