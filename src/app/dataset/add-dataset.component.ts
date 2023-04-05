import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { DatasetService } from './dataset.service';

@Component({
  selector: 'app-add-dataset',
  templateUrl: './add-dataset.component.html'
})
export class AddDatasetComponent implements OnInit {
  props = constantsProps;
  addDatasetForm: FormGroup;
  submitted: boolean = false;
  fileToUpload: File | null = null;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private spinner: NgxSpinnerService,
              private notifyService: NotificationmsgService,
              private datasetService: DatasetService) { }

  ngOnInit() {
    this.addDatasetForm = this.formBuilder.group({
      appName: ['', [Validators.required, Validators.pattern(this.props.characterFormatRegex)]],
      datasetFile: ['', [Validators.required]],
      datasetDescription: ['', Validators.required],
      datasetStatus: ['', Validators.required]
    });
  }

  // For easy access to form fields
  get f() { return this.addDatasetForm.controls; }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  // For adding a new user
  addUser() {
    this.spinner.show();
    this.submitted = true;
    // Stop here if form is invalid
    if (this.addDatasetForm.invalid) {
        return;
    }
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var data = {
        DatasetADDOperation: {
            ct_add_recin: {
                ct_app_name: this.f.appName.value.toUpperCase(),
                ct_dataset_file: this.fileToUpload,
                ct_dataset_desc: this.f.datasetDescription.value,
                ct_dataset_status: this.f.datasetStatus.value,
                ct_dataset_created_user_id: currentUser.currentUserID
            }
        }
    };
  
    console.log(data);
    this.datasetService.addUser(data).subscribe((response:any) => {
      this.spinner.hide();
      console.log(response);
      // if (response) {
      //   let msg = response;
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
