import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { AuthGuard } from 'app/commonconfig/service/auth.guard';
import { AddUserComponent } from '../../user/add-user.component';
import { UpdateUserComponent } from '../../user/update-user.component';
import { UserListComponent } from '../../user/user-list.component';
import { DatasetListComponent } from '../../dataset/dataset-list.component';
import { AddDatasetComponent } from '../../dataset/add-dataset.component';
import { UpdateDatasetComponent } from '../../dataset/update-dataset.component';
import { ViewDatasetComponent } from '../../dataset/view-dataset.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
    { path: 'add-user', component: AddUserComponent, canActivate: [AuthGuard] },
    { path: 'update-user', component: UpdateUserComponent, canActivate: [AuthGuard] },
    { path: 'dataset-list', component: DatasetListComponent, canActivate: [AuthGuard] },
    { path: 'add-dataset', component: AddDatasetComponent, canActivate: [AuthGuard] },
    { path: 'update-dataset', component: UpdateDatasetComponent, canActivate: [AuthGuard] },
    { path: 'view-object', component: ViewDatasetComponent, canActivate: [AuthGuard] }
];

