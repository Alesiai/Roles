import { Component, OnInit} from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from '../_models/product';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';
import { ProductService } from '../_services/product.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PayModalComponent } from '../modals/pay-modal/pay-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  user: User;
  bsModalRef: BsModalRef;

  constructor(private productService: ProductService, private accountService: AccountService, 
    private toastr: ToastrService, private modalService: BsModalService, private router: Router, ) { }

  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
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
  }

  PayModalOpen() {
    this.bsModalRef = this.modalService.show(PayModalComponent);
  }
}