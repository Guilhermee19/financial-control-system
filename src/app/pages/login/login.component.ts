import { Component, OnInit } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { getAuth } from '@firebase/auth';
import { Md5 } from 'md5-typescript';
import { BodyJson } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    public storage: StorageService,
    private authService: AuthService,
    public router: Router
  ) {}

  loading = false;

  login_form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });


  loginSubmit() {
    if (this.loading) return;

    if (this.login_form.invalid) {
      this.login_form.markAllAsTouched();
      return;
    }
    this.loading = true;

    const body = {
      email: this.login_form.value.email,
      password: Md5.init(this.login_form.value.password).toUpperCase(),
    }

    this.authService.login(body as unknown as BodyJson).subscribe(
      (data) => {
        this.storage.setToken(data.token, false);
      },
      () => {
        this.loading = false;
      }
    );
  }

  loginGoogleSubmit() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/user.birthday.read');

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {

        this.loginGoogleSuccess(result);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  loginGoogleSuccess(response: any) {
    this.authService.loginGoogle(response, 'Google').subscribe(
      (data) => {
        localStorage.setItem('token', data.token);
        this.router.navigate(['/finance']);
      },
      (error) => {
        this.loading = false;
        // this.storageService.checkError(
        //   error,
        //   'Ops, algo deu errado. Por favor, entre em contato com o suporte da Box4u.'
        // );

        if (error.error.non_field_errors != null) {
          // this.registerError = "Não é possível fazer login com as credenciais fornecidas."
        } else {
          // this.registerError = "Não foi possível fazer login, caso não possua uma conta, clique em 'Cadastre-se'."
          this.loading = false;
        }
      }
    );
  }
}
