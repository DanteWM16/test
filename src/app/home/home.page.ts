import { Component, OnInit } from '@angular/core';
import { HttpService } from '../core/http/http.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  message = '';

  constructor(
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.http.getTest().subscribe((resp) => {
      console.log(resp);
      this.message = String(resp.data.message);
    });
  }
}
