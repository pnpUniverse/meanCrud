import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { AccountService } from '@app/_services';
import { User } from '@app/_models';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users: any;
    fileUrl = environment.fileUrl;
    userId: any ;
    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.userId = JSON.parse(localStorage.getItem('user'))._id;
        // this.accountService.getAll().pipe(first()).subscribe(users => {
        this.accountService.getAll().subscribe(users => {
            this.users = users['data'];
        });
    }

    deleteUser(id: string, i) {
        const user = this.users.find(x => x._id === id);
        user.isDeleting = true;
        this.accountService.delete(id).pipe(first()).subscribe(() => {
            this.users.splice(i, 1);
            // this.users = this.users.filter(x => x.id !== id);
        });
    }
}