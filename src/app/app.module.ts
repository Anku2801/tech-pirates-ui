import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from "angular-datatables";
// import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxSpinnerModule } from "ngx-spinner";

// Infy ETA - Sidebars
import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

// Infy ETA - Admin Login and Pages
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './login/logout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    // BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule,
    HttpClientModule,
    DataTablesModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    AdminLayoutComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
