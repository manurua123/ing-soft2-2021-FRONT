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


export const AdminLayoutRoutes: Routes = [
    { path: 'registration',   component: UserProfileComponent },
    { path: 'users',          component: DashboardComponent },
    { path: 'travels',        component: UserProfileComponent },
    { path: 'routes',         component: RouteComponent } ,
    { path: 'drivers',        component: DriverComponent },
    { path: 'places',         component: PlaceComponent },
    { path: 'bus',            component: BusComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
   
];
