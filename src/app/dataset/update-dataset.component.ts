import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { DatasetService } from './dataset.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-update-dataset',
  templateUrl: './update-dataset.component.html'
})
export class UpdateDatasetComponent implements OnInit {
    props = constantsProps;
    submitted: boolean = false;
    updateUserForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]),
      userEmail: new FormControl('', [Validators.required, Validators.pattern(this.props.emailFormatRegex)]),
      userPassword: new FormControl(''),
      userMobileno: new FormControl('', [Validators.required, Validators.pattern(this.props.numberFormatRegex)]),
      userAdminAccess: new FormControl('', [Validators.required])
    });

    constructor(private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private spinner: NgxSpinnerService,
                private notifyService: NotificationmsgService,
                private datasetService: DatasetService) { }
  
    ngOnInit() {
      // Get details to update stream
      this.activatedRoute.paramMap.pipe(map(() => window.history.state)).subscribe(res=>{
        let editUserData = res;
        if(editUserData && (editUserData != null) && editUserData.ct_user_name) {
          this.updateUserForm.controls.userName.setValue(editUserData.ct_user_name);
          this.updateUserForm.controls.userEmail.setValue(editUserData.ct_user_email_id);
          this.updateUserForm.controls.userMobileno.setValue(editUserData.ct_user_mob_no);
          this.updateUserForm.controls.userPassword.setValue(editUserData.ct_user_password);
        } else {
          this.router.navigate(['/dashboard']);
        }
      })
    }
  
    // For easy access to form fields
    get f() { return this.updateUserForm.controls; }
  
    // For updating a user profile
    updateUser() {
      this.spinner.show();
      this.submitted = true;
      // Stop here if form is invalid
      if (this.updateUserForm.invalid) {
          return;
      }
      var data = {
          UserUpdateOperation: {
              ct_up_recin: {
                ct_user_name: this.f.userName.value.toUpperCase(),
                ct_user_mob_no: this.f.userMobileno.value,
                ct_user_email_id: this.f.userEmail.value,
                ct_user_password: this.f.userPassword.value,
                ct_user_role: this.f.userAdminAccess.value
              }
          }
      };

      this.datasetService.updateUser(data).subscribe((response:any) => {
        this.spinner.hide();
        console.log(response);
      })
    }
  }
  