import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Role, User } from './user.model';
import { environment } from 'src/environments/environment';



@Injectable({ providedIn: 'root' })
export class AuthService {
  private user: User | undefined;
    constructor(private http: HttpClient) {
      let registered = localStorage.getItem("user");
      if(registered){
        this.user = JSON.parse(registered);
      }
    }


    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/authenticate`, { email:email, password:password })
            .pipe(map(res => {
                let user =res;
                localStorage.setItem("user",JSON.stringify(user));
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.user = user;
                }
                return res;
            }));
    }

    logout(){
      localStorage.clear();
      this.user = undefined;
    }
    isAuthorized(roles: Role[] | undefined){
      if(this.user) {
        if(roles && roles.indexOf(this.user.userInfo.userType)=== -1){
          return false;
        }
        return true;
      }
      return false;
    }
    getRole(): string | undefined{
      if(this.user){
        return this.user.userInfo.userType;
      }
      return undefined;
    }
    isAuthenticated():boolean{
      if(this.user){
        return true;
      }
      return false;
    }
    getToken():string{
      if(this.user){
        return this.user.token;
      }
      return '';
    }
}
