import { Component, OnInit, ViewChild } from '@angular/core';;
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { DataTableOptions } from 'app/commonconfig/service/datatable.model';
import { DataTableService } from 'app/commonconfig/service/datatable.service';
import { NotificationmsgService } from 'app/commonconfig/service/notificationmsg.service';
import { constantsProps } from 'app/commonconfig/props/constants.props';
import { DatasetService } from './dataset.service'; 

@Component({
  selector: 'app-view-dataset',
  templateUrl: './view-dataset.component.html'
})
export class ViewDatasetComponent implements OnInit {
  props = constantsProps;
  @ViewChild(DataTableDirective, {static: false})
  dataTableElement: DataTableDirective | null = null;
  dtOptions: any = {};
  dtTrigger: Subject<any> = new Subject();
  usersList: any[];
  currentUser: any; 
  resetFilter: any;
  isShowTable: boolean = false;
  apiLength: number;
  constructor(private datasetService: DatasetService,
              private spinner: NgxSpinnerService,
              private dataTableService: DataTableService,
              private notifyService: NotificationmsgService){ }
 
  ngOnInit() {
    setTimeout(() => {
      this.getDatasetData(this.resetFilter);
    }, 1000)
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
    this.dtOptions = this.dataTableService.getDataTableOptionsWithoutExcel(dtOptionsObj);
  }

  //Show current div other hide
  show(id) {
    console.log(id);
    // jQuery('.sub-div').css('display', 'none');
    jQuery('#sub-div-' + id).css('display', 'block');
    jQuery('#show-' + id).css('display', 'none');
    jQuery('#hide-' + id).css('display', 'block');
  }

  //Hide current div other hide
  hide(id) {
    jQuery('#sub-div-' + id).css('display', 'none');
    jQuery('#hide-' + id).css('display', 'none');
    jQuery('#show-' + id).css('display', 'block');
  }

  // Get Datasets details
  getDatasetData(resetFilter) {
    this.spinner.show();
    var data = {
      UserListOperation: {
      }
    };
    this.spinner.hide();
    this.dataTableService.initializeDatatable(this.dataTableElement, this.dtTrigger, resetFilter);
    // this.datasetService.getUserList(data).subscribe((response: any) => {
    //   this.isShowTable = true;
    //   this.apiLength = 0;
    //   this.spinner.hide();
    // });
  }
}
