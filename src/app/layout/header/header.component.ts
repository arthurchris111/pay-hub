import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pay-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  show: boolean = false;

  toggleMenu() {
    this.show = !this.show;
    document.getElementById('navbarSupportedContent')?.classList.toggle('show');
  }

  constructor() {}

  ngOnInit(): void {}
}
