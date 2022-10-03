import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Notification} from "../../shared/models/notification.models";

@Injectable()
export class NotificationService {
  private notification$ = new BehaviorSubject<null | Notification>(null);
  notification = this.notification$.asObservable();

  handleSuccess(message: string) {
    this.notification$.next({message, severity: "success"});
  };

  handleError(message: string) {
    this.notification$.next({message, severity: "error"});
  };

  clear() {
    this.notification$.next(null);
  };
}
