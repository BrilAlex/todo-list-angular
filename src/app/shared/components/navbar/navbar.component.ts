import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../../core/services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: "tdl-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  isAuth!: Observable<boolean>;

  constructor(private authService: AuthService) {};

  ngOnInit() {
    this.isAuth = this.authService.isAuth;
  };

  logout() {
    this.authService.logout();
  };
}
