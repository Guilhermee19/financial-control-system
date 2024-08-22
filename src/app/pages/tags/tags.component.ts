import { Component, OnInit } from '@angular/core';
import { ITag } from 'src/app/models/tag';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent implements OnInit {
  constructor(private tagService: TagService) {}

  loading = false;

  displayedColumns: string[] = ['icon', 'name', 'porcent', 'options'];
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
    console.log('');
  }
}
