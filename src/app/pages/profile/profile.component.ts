import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EMPTY, expand, map } from 'rxjs';
import { IUser } from 'src/app/models/user';
import { CompressorService } from 'src/app/services/compressor.service';
import { BodyJson } from 'src/app/services/http.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
    private compressor: CompressorService,
    private userService: UserService
  ) {}

  loading = false;

  user$: IUser = this.storage.myself;

  profile_form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    profile_image: ['']
  });

  compressed_image = [];


  ngOnInit() {
    this.profile_form.patchValue({
      name: this.user$.name,
      email: this.user$.email,
      profile_image: this.user$.profile_image,
    })
  }

  profileSubmit(){
    this.loading = true;

    const value = this.profile_form.getRawValue();

    const user: any = {
      name: value.name,
      email: value.email,
    };

    if (value.profile_image) {
      user.profile_image = value.profile_image;
    }

    this.userService.updateUser(user as BodyJson).subscribe({
      next: () => {
        this.storage.changeUser();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  async onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {
      const target = event.target.files;
      const compress = this.recursiveCompress(target[0], 0, target).pipe(
        expand((res: any) => {
          return res.index > res.array.length - 1
            ? EMPTY
            : this.recursiveCompress(target[res.index], res.index, target);
        })
      );
      compress.subscribe((res: any) => {
        if (res.index > res.array.length - 1) {
          this.profile_form
            .get('profile_image')
            ?.patchValue(this.compressed_image[0]);
          this.compressed_image = [];
        }
      });
    }
  }

  recursiveCompress = (image: File, index: number, array: string[]) => {
    return this.compressor.compress(image).pipe(
      map((response) => {
        this.compressed_image.push(response as never);
        return {
          data: response,
          index: index + 1,
          array,
        };
      })
    );
  };
}
