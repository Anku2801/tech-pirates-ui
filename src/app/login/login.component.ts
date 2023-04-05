import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService  } from './login.service';
import { AutoLogoutService  } from './auto-logout.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';

@Component({   
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"] 
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    submitted: boolean = false;
    currentUser = { currentUserID: '', currentUserEmail: '', currentUserName: '', currentUserRole: '', currentUserStatus: ''};
    errorMsg: String = '';
    props = constantsProps;
    
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private autoLogoutService: AutoLogoutService,
        private router: Router,
        private loginService: LoginService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            userEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
            userPassword: ['', Validators.required]
        });

        this.autoLogoutService.initInterval();
        // Check if user is logged in
        let empInfo = localStorage.getItem('currentUser');
        if (empInfo != null) {
            this.router.navigate(['/dashboard']);
        }
    }

    // For easy access to form fields
    get f() { return this.loginForm.controls; }

    // On Login Submit
    onSubmit() {
        this.submitted = true;
        // Stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.errorMsg = '';
        var data = {
            LoginOperation: {
                ct_log_recin: {
                    ct_user_email: this.f.userEmail.value,
                    ct_user_pswd: this.f.userPassword.value
                }
            }
        };
        this.loginService.validateLogin(data).subscribe((response:any) => {
            console.log(response);
            //
            if (response) {
                this.currentUser = {
                    currentUserID: '1234567',
                    currentUserEmail: 'test2@gmail.com',
                    currentUserName: 'Testing Admin User',
                    currentUserRole: 'Admin',
                    currentUserStatus: 'Active'
                };
        
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.router.navigate(['/dashboard']);
            }
        })
    }
}
