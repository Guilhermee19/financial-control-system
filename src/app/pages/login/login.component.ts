import { Component, OnInit } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { getAuth } from '@firebase/auth';
import { IUser } from 'src/app/models/user';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public storage: StorageService,
    private authService: AuthService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  loading = false;

  login_form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  ngOnInit() {
    this.storage.logout();
  }

  loginSubmit() {
    this.authService.login(this.login_form.value).subscribe(
      (data) => {
        this.storage.setToken(data.token, true);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.loading = false;

        if (error?.error?.non_field_errors != null) {
          // this.notifier.show({
          //   type: 'error',
          //   message:
          //     'Não é possível fazer login com as credenciais fornecidas.',
          // });
        } else {
          // this.notifier.show({
          //   type: 'error',
          //   message:
          //     'Não foi possível fazer login, por favor verifique as informações inseridas.',
          // });
        }
      }
    );
  }

  loginGoogleSubmit() {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/user.birthday.read');

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);

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
        this.router.navigate(['/home']);
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
