import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { environment } from '../../environments/environment'
import { AccountService, AlertService } from '@app/_services';
import { User } from '@app/_models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    files : any;
    filesrc = [];
    images = [];
    fileUrl: any;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        if( !this.isAddMode ) {
            this.fileUrl = environment.fileUrl;
        }
        
        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
            password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{8,20}$/)]],
            file: ['']
        });

        if (!this.isAddMode) {
            this.accountService.getById(this.id).pipe(first()).subscribe(x => {
                this.form.patchValue({
                    firstName : x['data'].firstName,
                    lastName : x['data'].lastName,
                    username : x['data'].username,
                    password : x['data'].password,
                });
                this.fileUrl = environment.fileUrl + x['data'].file;
            });
        }
    }

    onFileChange(event) {
        if (event.target.files && event.target.files[0]) {
            this.files = [];
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
                reader.onload = (event:any) => {
                    this.images.push(event.target.result);
                    this.fileUrl = event.target.result;
                }
                this.files.push(event.target.files[i]);
                reader.readAsDataURL(event.target.files[i]);
            }
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        const formData = new FormData();
        ['firstName', 'lastName', 'username', 'password'].map(d => formData.append(d, this.form.value[d]));
        if(this.files) this.files.forEach(file => formData.append('file', file))
        if(this.fileUrl){
            if (this.isAddMode) {
                this.createUser(formData);
            } else {
                this.updateUser(formData);
            }
        }
    }

    private createUser(formData) {
        this.accountService.register(formData)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('User added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateUser(formData) {
        this.accountService.update(this.id, formData)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}