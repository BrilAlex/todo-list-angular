import {Component, OnInit} from '@angular/core';
import {AuthService} from "./core/services/auth.service";

@Component({
  selector: 'tdl-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'todo-list-angular';

  constructor(private authService: AuthService) {};

  ngOnInit(): void {
    this.authService.me();
  };
}
