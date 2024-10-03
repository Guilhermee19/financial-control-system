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

  current_page = 1;
  count_page = 1;
  users_total_count = 0;
  prev = false;
  next = false;

  ngOnInit() {
    this.getAlltags(1);
  }

  getAlltags(page: number) {
    this.loading = true;

    this.categoryService.getAllCategories(page).subscribe({
      next: (data) => {
        this.dataSource = data.results;

        this.next = data.next != null;
        this.prev = data.previous != null;
        this.count_page = Math.ceil(data.count / 10);
        this.loading = false;
      },
    });
  }

  // Pagination
  backOrNextPage(event: any) {
    this.loading = true;
    this.current_page = event;
    this.getAlltags(this.current_page);
  }

  craateCategory() {
    const dialogRef = this.dialog.open(DetailCategoryComponent, {
      ...configModals,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'yes') this.getAlltags(1);
      }
    });
  }

  editCategory(category: ICategory){
    const dialogRef = this.dialog.open(DetailCategoryComponent, {
      ...configModals,
      data: { category }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'yes') this.getAlltags(this.current_page);
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
        this.getAlltags(1)
      },
    });
  }
}
