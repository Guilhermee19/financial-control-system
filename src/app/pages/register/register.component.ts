import { Component } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { getAuth } from '@firebase/auth';
import { UserService } from 'src/app/services/user.service';
import { BodyJson } from 'src/app/services/http.service';
import { Md5 } from 'md5-typescript';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent  {
  constructor(
    private fb: FormBuilder,
    public storage: StorageService,
    private authService: AuthService,
    private userService: UserService,
    public router: Router
  ) {}

  loading = false;

  register_form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirm_password: ['', Validators.required],
  });

  view_pass = false;
  view_conf = false;

  registerSubmit() {
    if (this.loading) return;

    if (this.register_form.invalid) {
      this.register_form.markAllAsTouched();
      return;
    }
    this.loading = true;

    const user = {
      name: this.register_form.value.name,
      email: this.register_form.value.email,
      password: Md5.init(this.register_form.value.password).toUpperCase(),
    }

    this.userService.createUser(user as unknown as BodyJson).subscribe(
      (data) => {
        this.loading = false;
        this.loginUser(user);
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

  loginUser(user: any) {
    this.loading = true;

    this.authService.login(user as BodyJson).subscribe({
      next: (data) => {
        this.storage.setToken(data.token, false);
        this.storage.changeUser();
      },
    });
  }
}
