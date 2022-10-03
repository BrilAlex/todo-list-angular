import {Component, OnInit} from "@angular/core";
import {NotificationService} from "../../../core/services/notification.service";
import {Observable} from "rxjs";
import {Notification} from "../../models/notification.models";

@Component({
  selector: "tdl-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
})
export class NotificationComponent implements OnInit {
  notification!: Observable<null | Notification>;

  constructor(private notificationService: NotificationService) {};

  ngOnInit(): void {
    this.notification = this.notificationService.notification;
  };

  closeNotification() {
    this.notificationService.clear();
  };
}
