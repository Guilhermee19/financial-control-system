import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  showFiller = false;

  toggleDrawer() {
    this.drawer.toggle();
  }

  openDrawer() {
    this.drawer.open();
  }

  closeDrawer() {
    this.drawer.close();
  }

}
