import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { take } from 'rxjs/operators';
import { ProductListComponent } from 'src/app/product-list/product-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-modal',
  templateUrl: './pay-modal.component.html',
  styleUrls: ['./pay-modal.component.css']
})
export class PayModalComponent implements OnInit {
  roles: any[]; 
  page: ProductListComponent;
  user: User;

  constructor(public bsModalRef: BsModalRef, 
    private accountService: AccountService, 
    private router: Router,) { }

  ngOnInit(): void {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.loadUser();
  }
  
  loadUser() {
    this.accountService.getUser(this.user.username).subscribe(user => {
      this.user = user;
    })
  }

  updateMember() {
    this.user.orderCount++;
    this.accountService.updateUser(this.user).subscribe();
    this.bsModalRef.hide();

    this.router.navigateByUrl('home', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl('/thanks');
    });
  }
}
