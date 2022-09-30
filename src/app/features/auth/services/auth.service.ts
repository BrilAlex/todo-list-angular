import {Injectable} from "@angular/core";
import {LoginRequestData, MeResponseData} from "../models/auth.models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BaseResponse} from "../../../core/models/core.models";
import {Router} from "@angular/router";
import {ResultCode} from "../../../core/enum/resultCode.enum";

@Injectable()
export class AuthService {
  isAuth = false;

  resolveAuthRequest: Function = () => {};
  authRequest = new Promise((resolve) => {
    this.resolveAuthRequest = resolve;
  });

  constructor(private http: HttpClient, private router: Router) {
  };

  me() {
    this.http
      .get<BaseResponse<MeResponseData>>(`${environment.baseURL}/auth/me`)
      .subscribe(response => {
        if (response.resultCode === ResultCode.success) {
          this.isAuth = true;
        }
        this.resolveAuthRequest();
      });
  };

  login(data: Partial<LoginRequestData>) {
    this.http
      .post<BaseResponse<{ userId: number }>>(`${environment.baseURL}/auth/login`, data)
      .subscribe(response => {
        if (response.resultCode === ResultCode.success) {
          this.router.navigate(["/"]);
        }
      });
  };

  logout() {
    this.http
      .delete<BaseResponse>(`${environment.baseURL}/auth/login`)
      .subscribe(response => {
        if (response.resultCode === ResultCode.success) {
          this.router.navigate(["/login"]);
        }
      });
  };
}
