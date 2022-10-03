import {Component} from "@angular/core";
import {AuthService} from "../../../core/services/auth.service";

@Component({
  selector: "tdl-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {};

  logout() {
    this.authService.logout();
  };
}
