import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css']
})
export class StartPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    this.startTime();
  }

  async startTime() {
    const today = new Date();
      setTimeout(document.getElementById('time').innerText = today.getHours()
        + ':' + today.getMinutes() + ':' + today.getSeconds(), 1000);
  }

}
