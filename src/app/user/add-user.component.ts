import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { UserService } from './user.service';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {
  props = constantsProps;
  addUserForm: FormGroup;
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private notifyService: NotificationmsgService,
              private userService: UserService) { }

  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      userEmail: ['', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]],
      userPassword: ['', Validators.required],
      userMobileno: ['', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]],
      userStatus: ['', Validators.required],
      userAdminAccess: ['', Validators.required]
    });
  }

  // For easy access to form fields
  get f() { return this.addUserForm.controls; }

  // For adding a new user
  addUser() {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.addUserForm.invalid) {
        return;
    }
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var data = {
        UserADDOperation: {
            ct_add_recin: {
                ct_user_name: this.f.userName.value.toUpperCase(),
                ct_user_mob_no: this.f.userMobileno.value,
                ct_user_email_id: this.f.userEmail.value,
                ct_user_password: this.f.userPassword.value,
                ct_user_status: this.f.userStatus.value,
                ct_user_role: this.f.userAdminAccess.value,
                ct_created_user_id: currentUser.currentUserID
            }
        }
    };
  
    console.log(data);
    this.userService.addUser(data).subscribe((response:any) => {
      this.spinner.hide();
      console.log(response);
      // if (response) {
      //   let msg = response.msg;
      //   if (msg.includes('successfully')) {
      //     this.notifyService.showSuccess(msg);
      //     setTimeout(() => {
      //       this.router.navigate(['/search-employee']);
      //     }, 1500)
      //   } else {
      //     this.notifyService.showError(msg);
      //     this.submitted = false;
      //   }
      // }
    })
  }
}
