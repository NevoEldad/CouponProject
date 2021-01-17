import { HomeComponent } from "../components/main/home/home.component";
import { AdminMainComponent } from "../components/admin/admin-main/admin-main.component";
import { CompanyMainComponent } from "../components/company/company-main/company-main.component";
import { CustomerMainComponent } from "../components/customer/customer-main/customer-main.component";
import { StoreMainComponent } from "../components/store/store-main/store-main.component";

export class Routes
{
    public static  routeArray=  [ 
        { path: '', redirectTo: '/home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'admin', component: AdminMainComponent },
        { path: 'company', component: CompanyMainComponent },
        { path: 'customer', component: CustomerMainComponent },
        { path: 'store', component: StoreMainComponent }
    ];
}