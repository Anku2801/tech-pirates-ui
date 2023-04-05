import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DataTablesModule } from "angular-datatables";
import { HttpClientModule } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserListComponent } from '../../user/user-list.component';
import { AddUserComponent } from '../../user/add-user.component';
import { UpdateUserComponent } from '../../user/update-user.component';
import { DatasetListComponent } from '../../dataset/dataset-list.component';
import { AddDatasetComponent } from '../../dataset/add-dataset.component';
import { UpdateDatasetComponent } from '../../dataset/update-dataset.component';
import { ViewDatasetComponent } from '../../dataset/view-dataset.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    HttpClientModule,
    DataTablesModule
  ],
  declarations: [
    HomeComponent,
    UserListComponent,
    AddUserComponent,
    UpdateUserComponent,
    DatasetListComponent,
    AddDatasetComponent,
    UpdateDatasetComponent,
    ViewDatasetComponent
  ],
  providers: [DatePipe]
})

export class AdminLayoutModule {}
