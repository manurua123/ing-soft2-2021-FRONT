import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { RouteComponent } from 'app/components/route/route.component';
import { TableListRouteComponent } from 'app/components/route/table/table-list-route.component';
import { RouteFormComponent } from 'app/components/route/form/route-form.component';

import { DriverComponent } from 'app/components/driver/driver.component';
import { TableListDriverComponent } from 'app/components/driver/table/table-list-driver.component';
import { DriverFormComponent } from 'app/components/driver/form/driver-form.component';

import { PlaceComponent } from 'app/components/place/place.component';
import { TableListPlaceComponent } from 'app/components/place/table/table-list-place.component';
import { PlaceFormComponent } from 'app/components/place/form/place-form.component';

import { BusComponent } from 'app/components/bus/bus.component';
import { TableListBusComponent } from 'app/components/bus/table/table-list-bus.component';
import {  BusFormComponent } from 'app/components/bus/form/bus-form.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    MatGridListModule,
    MatMenuModule

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,

    RouteComponent,
    TableListRouteComponent,
    RouteFormComponent,

    DriverComponent,
    TableListDriverComponent,
    DriverFormComponent,

    PlaceComponent,
    TableListPlaceComponent,
    PlaceFormComponent,

    BusComponent,
    TableListBusComponent,
    BusFormComponent,
  ]
})

export class AdminLayoutModule {}
