import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    // 'options'
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
}
