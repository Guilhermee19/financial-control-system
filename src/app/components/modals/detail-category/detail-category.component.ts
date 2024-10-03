import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ICategory } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { BodyJson } from 'src/app/services/http.service';

export interface IDialogActions {
  action: 'yes' | 'no';
}

export interface IData {
  category: ICategory;
}

@Component({
  selector: 'app-detail-category',
  templateUrl: './detail-category.component.html',
  styleUrls: ['./detail-category.component.scss']
})
export class DetailCategoryComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<IDialogActions>,
    @Inject(MAT_DIALOG_DATA) public data: IData,
    private categoryService: CategoryService
  ) {}

  loading = false;

  category_form = this.fb.group({
    name: ['', [Validators.required]],
    color: ['#00838f', [Validators.required]],
    bg_color: ['#b2ebf2', [Validators.required]],
    percent: [10, [Validators.required]],
    type: ['ENTRY', [Validators.required]],
  });

  text_button = 'Adicionar'

  ngOnInit(){
    console.log(this.data);

    if(this.data?.category){
      this.text_button = "Salvar"
      this.category_form.patchValue({
        name: this.data.category.name,
        bg_color: this.data.category.bg_color,
        color: this.data.category.color,
        percent: Number(this.data.category.percent),
      })
    }
  }

  logEvent(event: string, trigger: string) {
    this.category_form.get(trigger)?.patchValue(event)
  }

  saveSubmitHandler() {
    if (this.loading) return;

    if (this.category_form.invalid) {
      this.category_form.markAllAsTouched();
      return;
    }

    this.loading = true;

    if(this.data?.category){
      this.patchTag()
    }
    else{
      this.postTag();
    }
  }

  postTag() {
    const body = {
      ...this.category_form.value,
    } as BodyJson;

    this.categoryService.postCategory(body).subscribe({
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
      ...this.category_form.value,
    } as BodyJson;

    this.categoryService.patchCategory(this.data.category.id, body).subscribe({
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
    this.dialogRef.close({ action: chance, finance: this.category_form.value });
  }
}
