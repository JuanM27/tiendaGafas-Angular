import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../guard/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(response => {
        const role = this.authService.getUserRole(); // Obtén el rol del servicio AuthService
          console.log("token:", response.token);

          // Redirigir según el rol del usuario
          if (role === 'ADMIN') {
            this.router.navigate(['/admin-home']); // Ruta para admin
          } else if (role === 'USER') {
            this.router.navigate(['/user/home']); // Ruta para usuario
          } else {
            console.error('Rol desconocido');
          }
      }, error => {
        console.error('Error during login', error);  // Manejo de errores
      });
    }
  }
}
