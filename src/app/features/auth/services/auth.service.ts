import {Injectable} from "@angular/core";
import {LoginRequestData} from "../models/auth.models";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {BaseResponse} from "../../../core/models/core.models";
import {Router} from "@angular/router";
import {ResultCode} from "../../../core/enum/resultCode.enum";

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
  };

  login(data: Partial<LoginRequestData>) {
    this.http
      .post<BaseResponse<{ userId: number }>>(`${environment.baseURL}/auth/login`, data)
      .subscribe(response => {
        console.log(response);
        if (response.resultCode === ResultCode.success) {
          this.router.navigate(["/"]);
        }
      });
  };

  logout() {
    this.http
      .delete<BaseResponse>(`${environment.baseURL}/auth/login`)
      .subscribe(response => {
        console.log(response);
        if (response.resultCode === ResultCode.success) {
          this.router.navigate(["/login"]);
        }
      });
  };
}
