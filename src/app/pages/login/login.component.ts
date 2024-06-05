import { Component } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import * as firebase from 'firebase/app';
import { getAuth } from '@firebase/auth';
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
    public router: Router,
    private route: ActivatedRoute
  ) {}

  loading = false;

  login_form = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  loginSubmit() {
    console.log(this.login_form.value);

    if (this.login_form.invalid) {
      this.login_form.markAllAsTouched();
      return;
    }

    this.loading = true;

    console.log(this.login_form.value);

    const email: string = this.login_form.value.email as string;
    const password: string = this.login_form.value.password as string;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  loginGoogleSubmit() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);

        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential) return;

        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);

        // The email of the user's account used.
        const email = error.customData.email;
        console.log(email);

        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(credential);
        // ...
      });
    // this.authService.login(email, password).subscribe({
    //   next: (response) => {
    //     console.log(response);
    //   },
    //   error: () => {
    //     this.loading = false;
    //   },
    // });
  }
}
