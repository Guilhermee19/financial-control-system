import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from 'src/app/components/modals/confirmation-popup/confirmation-popup.component';
import { DetailCategoryComponent } from 'src/app/components/modals/detail-category/detail-category.component';
import { configModals } from 'src/app/constants/utils';
import { ICategory } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog
  ) {}

  loading = false;

  displayedColumns: string[] = [
    'icon',
    'name',
    'percent',
    'options'
  ];

  dataSource: ICategory[] = [];

  ngOnInit() {
    this.getAlltags();
  }

  getAlltags() {
    this.loading = true;

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        // this.backupFinancias = data.results;
        // console.log(this.backupFinancias);

        // this.changeMonth('today');
        this.dataSource = data.results;
        this.loading = false;
      },
    });
  }

  craateCategory() {
    const dialogRef = this.dialog.open(DetailCategoryComponent, {
      ...configModals,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'yes') this.getAlltags();
      }
    });
  }

  editTag(tag: ICategory){
    const dialogRef = this.dialog.open(DetailCategoryComponent, {
      ...configModals,
      data: { tag }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'yes') this.getAlltags();
      }
    });
  }

  popupDelete(tag: ICategory){
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      ...configModals,
      data: {
        title: `Deletar Tag`,
        description: `Deseja mesmo apagar a tag ${tag.name} ?`,
        btn_cancel: `Cancelar`,
        btn_confirm: `Deletar`,
       }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'yes') this.deletTag(tag);
      }
    });
  }

  deletTag(tag: ICategory){
    this.categoryService.deletCategory(tag.id).subscribe({
      next: (data) => {
        this.getAlltags()
      },
    });
  }
}
