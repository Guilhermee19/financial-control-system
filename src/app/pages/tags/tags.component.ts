import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationPopupComponent } from 'src/app/components/modals/confirmation-popup/confirmation-popup.component';
import { DetailTagComponent } from 'src/app/components/modals/detail-tag/detail-tag.component';
import { configModals } from 'src/app/constants/utils';
import { ITag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  constructor(
    private tagService: TagService,
    private dialog: MatDialog
  ) {}

  loading = false;

  displayedColumns: string[] = [
    'icon',
    'name',
    'percent',
    'options'
  ];

  dataSource: ITag[] = [];

  ngOnInit() {
    this.getAlltags();
  }

  getAlltags() {
    this.loading = true;

    this.tagService.getAlltags().subscribe({
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
    const dialogRef = this.dialog.open(DetailTagComponent, {
      ...configModals,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'yes') this.getAlltags();
      }
    });
  }

  editTag(tag: ITag){
    const dialogRef = this.dialog.open(DetailTagComponent, {
      ...configModals,
      data: { tag }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.action === 'yes') this.getAlltags();
      }
    });
  }

  popupDelete(tag: ITag){
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

  deletTag(tag: ITag){
    this.tagService.deletTag(tag.id).subscribe({
      next: (data) => {
        this.getAlltags()
      },
    });
  }
}
