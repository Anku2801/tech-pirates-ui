import { Component, OnInit, ViewChild } from '@angular/core';;
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableOptions } from 'app/commonconfig/service/datatable.model';
import { DataTableService } from 'app/commonconfig/service/datatable.service';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { UserService } from './user.service'; 

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  props = constantsProps;
  @ViewChild(DataTableDirective, {static: false})
  dataTableElement: DataTableDirective | null = null;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  // usersList: any[];
  currentUser: any; 
  resetFilter: any;
  isShowTable: boolean = false;
  apiLength: number;
  usersList: any[]; 

  constructor(private userService: UserService,
              private spinner: NgxSpinnerService,
              private dataTableService: DataTableService,
              private notifyService: NotificationmsgService){ }
 
  ngOnInit() {
    setTimeout(() => {
      this.getUserList(this.resetFilter);
    }, 800)
    this.setDataTableOptionsForSearch();
  }

  ngAfterViewInit(): void {
    this.setDataTableOptionsForSearch();
  }
  
  setDataTableOptionsForSearch() {
    let dtOptionsObj = new DataTableOptions();
    dtOptionsObj.dataTableElement = this.dataTableElement;
    dtOptionsObj.stateSave = false;
    dtOptionsObj.exportTitle = 'Citizen Data Workplace - Users';
    dtOptionsObj.exportFileName = 'ct_user_list';
    this.dtOptions = this.dataTableService.getDataTableOptionsWithFilter(dtOptionsObj);
  }

  // Get user details
  getUserList(resetFilter) {
    this.spinner.show();
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    var data = {
      UserListOperation: {
        ct_add_recin: {
          ct_created_user_id: currentUser.currentUserID
        }
      }
    };
    this.spinner.hide();
    this.usersList =  [
      { ct_user_name: 'name', ct_user_email: 'name', ct_user_phone: 'name', ct_user_mobile: 'name', ct_user_status: 'Active' },
      { ct_user_name: 'name1', ct_user_email: 'name', ct_user_phone: 'name', ct_user_mobile: 'name', ct_user_status: 'Deactive' },
      { ct_user_name: 'name2', ct_user_email: 'name', ct_user_phone: 'name', ct_user_mobile: 'name', ct_user_status: 'Active' },
      { ct_user_name: 'name3', ct_user_email: 'name', ct_user_phone: 'name', ct_user_mobile: 'name', ct_user_status: 'Deactive' },
      { ct_user_name: 'name3', ct_user_email: 'name', ct_user_phone: 'name', ct_user_mobile: 'name', ct_user_status: 'Active' },
      { ct_user_name: 'name3', ct_user_email: 'name', ct_user_phone: 'name', ct_user_mobile: 'name', ct_user_status: 'Deactive' },
    ];
    this.dataTableService.initializeDatatable(this.dataTableElement, this.dtTrigger, resetFilter);
    // this.userService.getUserList(data).subscribe((response: any) => {
    //   this.isShowTable = true;
    //   this.apiLength = 0;
    //   this.spinner.hide();
    //   // if (response) {
    //   //   let result = response;
    //   //   if (result.ws_n > 0) {
    //   //     this.usersList = result;
    //   //     this.apiLength = result;
    //   //     if (this.apiLength > 1) {
    //   //       this.isShowTable = false;
    //   //       this.dataTableService.initializeDatatable(this.dataTableElement, this.dtTrigger, resetFilter);
    //   //     }
    //   //   } else {
    //   //     this.notifyService.showError(result.ws_message);
    //   //   }
    //   // }
    // });
  }
}
