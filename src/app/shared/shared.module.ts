import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {NotificationComponent} from "./components/notification/notification.component";

@NgModule({
  declarations: [
    NavbarComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    NavbarComponent,
    NotificationComponent,
  ],
})
export class SharedModule {
}
