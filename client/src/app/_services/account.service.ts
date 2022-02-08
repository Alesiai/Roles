import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { RolesModalComponent } from '../modals/roles-modal/roles-modal.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl =environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  users: User[] = [];

  constructor(private http: HttpClient,private toastr: ToastrService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          if(user.isBlocked){
            this.logout();
          }
          else{
          this.toastr.info('Your status is: ' + user.roles[user.roles.length-1]); 
          this.toastr.success('Welcome, ' + user.username);
        }
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
         this.setCurrentUser(user);
         
        }
      })
    )
  }

  updateUser(user: User){
    return this.http.post(this.baseUrl + 'users/', user).pipe(
      map((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource.next(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getUser(username: string){
    const user = this.users.find(x => x.username === username);
    if (user !== undefined) return of(user);
    return this.http.get<User>(this.baseUrl + 'users/' + username);
  }

  getUsers(){
    return this.http.get<Partial<User[]>>(this.baseUrl + 'users');
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
