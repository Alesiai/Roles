import { Component, OnInit} from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router, 
    private toastr: ToastrService) { }
  count:number = 1;
  

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/products');
    })
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

  private log(msg: string) {
    console.log(this.count + ". " + msg);
    this.count++;
  }

  reload(){
     
  }
}
