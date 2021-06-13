import { DashboardComponent } from './../../dashboard/dashboard.component';
import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { TableListRouteComponent } from 'app/components/route/table/table-list-route.component';

import { RouteComponent } from 'app/components/route/route.component';
import { DriverComponent } from 'app/components/driver/driver.component';
import { PlaceComponent } from 'app/components/place/place.component';
import {BusComponent } from 'app/components/bus/bus.component';
import {SuppliesComponent } from 'app/components/supplies/supplies.component';
import {TravelComponent } from 'app/components/travel/travel.component';
import {CommentComponent } from 'app/components/comment/comment.component';
import {UserProfileViewFormComponent } from 'app/components/userProfileView/form/userProfileView-form.component';
import  {AppComponent} from '../../app.component'
import { UserTravelViewComponent } from 'app/components/userTravelView/userTravelView.component'
import { TicketFormComponent } from 'app/components/ticket/form/ticket-form.component';
import { TravelSearchComponent } from 'app/components/travelSearch/travel-search.component';
import { UserProfileChangePasswordComponent } from 'app/user-profile/user-profile-change-password.component';



export const AdminLayoutRoutes: Routes = [
    // { path: '',          component: AppComponent },
  


    { path: 'changePassword', component: UserProfileChangePasswordComponent },
    { path: 'registration',   component: UserProfileComponent },
    { path: 'users',          component: DashboardComponent },
    { path: 'my-travels',     component: UserTravelViewComponent },
    { path: 'profile',        component: UserProfileViewFormComponent },
    { path: '',               component: CommentComponent },
    { path: 'comments',               component: CommentComponent },
    { path: 'travels',        component: TravelComponent },
    { path: 'routes',         component: RouteComponent } ,
    { path: 'drivers',        component: DriverComponent },
    { path: 'places',         component: PlaceComponent },
    { path: 'bus',            component: BusComponent },
    { path: 'supplies',       component: SuppliesComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'ticket',         component: TicketFormComponent },
    { path: 'searchTravels',  component: TravelSearchComponent },
   
];
