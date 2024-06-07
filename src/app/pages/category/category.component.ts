import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  displayedColumns: string[] = ['icon', 'name', 'tag', 'options'];
  dataSource = [
    // { icon: 'streming', name: 'Streming', tag: 'G' }
  ];

  craateCategory() {
    console.log('');
  }
}
