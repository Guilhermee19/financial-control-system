import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITag } from 'src/app/models/tag';
import { BodyJson } from 'src/app/services/http.service';
import { TagService } from 'src/app/services/tag.service';

export interface IDialogActions {
  action: 'yes' | 'no';
}

export interface IData {
  tag: ITag;
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
    color: ['#b2ebf2', [Validators.required]],
    bg_color: ['#00838f', [Validators.required]],
    percent: [10, [Validators.required]],
    type: ['ENTRY', [Validators.required]],
  });

  text_button = 'Adicionar'

  ngOnInit(){
    if(this.data?.tag){
      this.text_button = "Salvar"
      this.tag_form.patchValue({
        name: this.data.tag.name,
        bg_color: this.data.tag.bg_color,
        color: this.data.tag.color,
        percent: Number(this.data.tag.percent),
        type: this.data.tag.type,
      })
    }
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

    if(this.data?.tag){
      this.patchTag()
    }
    else{
      this.postTag();
    }
  }

  postTag() {
    const body = {
      ...this.tag_form.value,
    } as BodyJson;

    this.tagService.postTag(body).subscribe({
      next: (data) => {
        console.log(data);
        this.chance('yes');
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  patchTag() {
    const body = {
      ...this.tag_form.value,
    } as BodyJson;

    this.tagService.patchTag(this.data.tag.id, body).subscribe({
      next: (data) => {
        console.log(data);
        this.chance('yes');
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      }
    });
  }

  chance(chance: 'yes' | 'no'): void {
    this.dialogRef.close({ action: chance, finance: this.tag_form.value });
  }
}
