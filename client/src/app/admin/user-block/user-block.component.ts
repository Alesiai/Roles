import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-user-block',
  templateUrl: './user-block.component.html',
  styleUrls: ['./user-block.component.css']
})
export class UserBlockComponent implements OnInit {
  users: Partial<User[]>;
  bsModalRef: BsModalRef;
  
  constructor(private modalService: BsModalService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.getAllInfoUsers();
  }

  getAllInfoUsers() {
    this.accountService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  blockedUser(user){
    if(user.isBlocked){
      user.isBlocked = false;
    }
    else{
      user.isBlocked = true;
    }

    console.log(user);
    this.accountService.updateUser(user).subscribe();
  }
  

}
