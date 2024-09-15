import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountsService } from 'src/app/services/accounts.service';
import { BodyJson } from 'src/app/services/http.service';
import { TagService } from 'src/app/services/tag.service';

export interface IDialogActions {
  action: 'yes' | 'no';
}

export interface IData {
  action: 'yes' | 'no';
}

@Component({
  selector: 'app-detail-tag',
  templateUrl: './detail-tag.component.html',
  styleUrls: ['./detail-tag.component.scss']
})
export class DetailTagComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<IDialogActions>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
    private tagService: TagService
  ) {}

  loading = false;

  tag_form = this.fb.group({
    name: ['', [Validators.required]],
    color: ['', [Validators.required]],
    bg_color: ['', [Validators.required]],
    percent: [0, [Validators.required]],
    type: ['', [Validators.required]],
  });

  ngOnInit() {
    this.tag_form.reset();
  }

  logEvent(event: string, trigger: string) {

    this.tag_form.get(trigger)?.patchValue(event)
  }

  saveSubmitHandler() {
    if (this.loading) return;

    if (this.tag_form.invalid) {
      this.tag_form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.postAccount();
  }

  postAccount() {
    const body = {
      ...this.tag_form.value,
    } as BodyJson;

    this.tagService.postTag(body).subscribe({
      next: (data) => {
        console.log(data);
        this.chance('yes');
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  chance(chance: 'yes' | 'no'): void {
    this.dialogRef.close({ action: chance, finance: this.tag_form.value });
  }
}
