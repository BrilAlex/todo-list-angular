import {Injectable} from "@angular/core";
import {LoginRequestData, MeResponseData} from "../../features/auth/models/auth.models";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BaseResponse} from "../models/core.models";
import {Router, UrlTree} from "@angular/router";
import {ResultCode} from "../enum/resultCode.enum";
import {BehaviorSubject, catchError, EMPTY, map, Observable, tap} from "rxjs";
import {NotificationService} from "./notification.service";

@Injectable()
export class AuthService {
  private isAuth$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService,
  ) {
  };

  me(): Observable<boolean | UrlTree> {
    return this.http
      .get<BaseResponse<MeResponseData>>(`${environment.baseURL}/auth/me`)
      .pipe(
        catchError(this.errorHandler.bind(this)),
        map((response): boolean => response.resultCode === ResultCode.success),
        tap((isAuth): void => this.isAuth$.next(isAuth)),
        map((isAuth): boolean | UrlTree => isAuth || this.router.createUrlTree(["/login"])),
      );
  };

  login(data: Partial<LoginRequestData>) {
    this.http
      .post<BaseResponse<{ userId: number }>>(`${environment.baseURL}/auth/login`, data)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(response => {
        if (response.resultCode === ResultCode.success) {
          this.router.navigate(["/"]);
        } else {
          this.notificationService.handleError(response.messages[0]);
        }
      });
  };

  logout() {
    this.http
      .delete<BaseResponse>(`${environment.baseURL}/auth/login`)
      .pipe(catchError(this.errorHandler.bind(this)))
      .subscribe(response => {
        if (response.resultCode === ResultCode.success) {
          this.notificationService.handleSuccess("You successfully singed out");
          this.router.navigate(["/login"]);
        } else {
          this.notificationService.handleError(response.messages[0]);
        }
      });
  };

  private errorHandler(error: HttpErrorResponse) {
    this.notificationService.handleError(error.message);
    return EMPTY;
  };
}
