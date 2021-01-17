import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CredentialsInterceptor } from './interceptors/credentialsInterceptor';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { Routes } from './models/routes';
/* Pipes */
import { DatePipe } from '@angular/common';
import { KeysPipe } from './pipes/enumKeys/keys.pipe';
import { JsonDatePipe } from './pipes/jsonDate/json-date.pipe';
/* Services */
import { LoginService } from './services/main/login.service';
import { AdminService } from './services/admin/admin.service';
import { CompanyService } from './services/company/company.service';
import { CustomerService } from './services/customer/customer.service';
import { ServerService } from './services/main/server.service';
/* Main components */
import { HeaderComponent } from './components/main/header/header.component';
import { FooterComponent } from './components/main/footer/footer.component';
import { HomeComponent } from './components/main/home/home.component';
/* Admin components */
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { AdminCompanyTableComponent } from './components/admin/admin-company-table/admin-company-table.component';
import { AdminCompanyCreateComponent } from './components/admin/admin-company-create/admin-company-create.component';
import { AdminCompanyViewComponent } from './components/admin/admin-company-view/admin-company-view.component';
import { AdminCustomerTableComponent } from './components/admin/admin-customer-table/admin-customer-table.component';
import { AdminCustomerCreateComponent } from './components/admin/admin-customer-create/admin-customer-create.component';
import { AdminCustomerViewComponent } from './components/admin/admin-customer-view/admin-customer-view.component';
import { AdminIncomeTableComponent } from './components/admin/admin-income-table/admin-income-table.component';
/* Company components */
import { CompanyMainComponent } from './components/company/company-main/company-main.component';
import { CompanyCouponTableComponent } from './components/company/company-coupon-table/company-coupon-table.component';
import { CompanyCouponCreateComponent } from './components/company/company-coupon-create/company-coupon-create.component';
import { CompanyCouponViewComponent } from './components/company/company-coupon-view/company-coupon-view.component';
import { CompanyProfileViewComponent } from './components/company/company-profile-view/company-profile-view.component';
/* Customer components */
import { CustomerMainComponent } from './components/customer/customer-main/customer-main.component';
import { CustomerCouponTableComponent } from './components/customer/customer-coupon-table/customer-coupon-table.component';
import { CustomerCouponViewComponent } from './components/customer/customer-coupon-view/customer-coupon-view.component';
import { CustomerProfileViewComponent } from './components/customer/customer-profile-view/customer-profile-view.component';
/* Store components */
import { StoreMainComponent } from './components/store/store-main/store-main.component';
import { StoreCouponTableComponent } from './components/store/store-coupon-table/store-coupon-table.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AdminMainComponent,
    AdminCompanyTableComponent,
    AdminCompanyCreateComponent,
    AdminCompanyViewComponent,
    AdminCustomerTableComponent,
    AdminCustomerCreateComponent,
    AdminCustomerViewComponent,
    AdminIncomeTableComponent,
    CompanyMainComponent,
    CompanyCouponTableComponent,
    CompanyCouponCreateComponent,
    CompanyCouponViewComponent,
    CompanyProfileViewComponent,
    CustomerMainComponent,
    CustomerCouponTableComponent,
    CustomerCouponViewComponent,
    CustomerProfileViewComponent,
    StoreMainComponent,
    StoreCouponTableComponent,
    KeysPipe,
    JsonDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(Routes.routeArray, { useHash: true }),
    ModalModule.forRoot()
  ],
  providers: [LoginService, AdminService, CompanyService, CustomerService, ServerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CredentialsInterceptor,
      multi: true
    }  ,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
