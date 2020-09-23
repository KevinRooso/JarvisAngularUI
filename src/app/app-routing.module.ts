import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavBarComponent } from './nav/nav-bar/nav-bar.component';
import { AssetsManagerComponent } from './components/assets-manager/assets-manager.component';
import { LiveMapComponent } from './map-module/live-map/live-map.component';
import { SubComponentTreeComponent } from './components/sub-component-tree/sub-component-tree.component';
import { LineChartsComponent } from './charts/graphs/line-charts/line-charts.component';
import { BubbleMapComponent } from './charts/maps/bubble-map/bubble-map.component';
import { AddOrganisationComponent } from './components/organisation/add-organisation/add-organisation.component';
import { LoginComponent } from './login/login.component';
import { AuthguardGuard } from './authguard.guard'
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { CustomerManagementComponent } from './dashboard/customer-management/customer-management.component';
import { AssetManagementComponent } from './dashboard/asset-management/asset-management.component';
import { CustomerDashboardComponent } from './dashboard/customer-dashboard/customer-dashboard.component';
import { MatTableComponent } from './mat-table/mat-table.component';
import { BrandPageComponent } from './customer-management/brand-page/brand-page.component';
import { PartnersPageComponent } from './customer-management/partners-page/partners-page.component';
import { ClientDataComponent } from './dashboard/client-data/client-data.component';
import { AssetsDatatableComponent } from './assests-management-pages/assets-datatable/assets-datatable.component';
import { AssetsDetailViewComponent } from './assests-management-pages/assets-detail-view/assets-detail-view.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { DonutChartComponent } from './charts/graphs/donut-chart/donut-chart.component';
import { ComparePageComponent } from './assests-management-pages/compare-page/compare-page.component';
import { RealTimeComponent } from './charts/graphs/real-time/real-time.component';
import { AssetsVisualizeComponent } from './assests-management-pages/assets-visualize/assets-visualize.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AssetModelView } from './asset-model-mgt/asset-model-view';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SettingComponent } from './setting/setting.component';
import { WizardsComponent } from './wizards/wizards.component';
import { AssetModelComponent } from './asset-model/asset-model.component';
import { CompareLineChartComponent } from './charts/graphs/compare-line-chart/compare-line-chart.component';
import { RoleguardService } from './roleguard.service';
import { TraceRouteComponent } from './trace-route/trace-route.component';
import { FullTraceMapComponent } from './trace-route/full-trace-map/full-trace-map.component';
import { FotaComponent } from './fota/fota.component';
import { FotaDetailComponent } from './fota/fota-detail/fota-detail.component';
import { TopicManagementComponent } from './topic-management/topic-management.component';
import { CreateTopicComponent } from './topic-management/create-topic/create-topic.component';
import { FirmwareComponent } from './firmware/firmware.component';
import { BatchLogComponent } from './fota/batch-log/batch-log.component';
import { BatchDetailsComponent } from './fota/batch-details/batch-details.component';
import { TopicPreviewComponent } from './topic-preview/topic-preview.component';
import { CreateFirmwareComponent } from './firmware/create-firmware/create-firmware.component';
import { FotaLogComponent } from './fota-log/fota-log.component';
import { RolesGuardService } from './roles-guard.service';
import { LoginLayoutComponent } from './layouts/login-layout.component';
import { HomeLayoutComponent } from './layouts/home-layout.component';
import { AddRoleComponent } from './role-management/add-role/add-role.component';


const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    canActivate: [AuthguardGuard],
    children: [
      { path: '', component: HomeDashboardComponent},
      { path: 'navbar', component: NavBarComponent },
      // { path: 'custmgmt',component: CustomerManagementComponent},
      { path: 'mattable', component: MatTableComponent },
      { path: 'assets-manager', component: AssetsManagerComponent, canActivate: [AuthguardGuard] },
      { path: 'map', component: LiveMapComponent, canActivate: [AuthguardGuard] },
      { path: 'treeView', component: SubComponentTreeComponent, canActivate: [AuthguardGuard] },
      { path: 'graph/:id', component: LineChartsComponent, canActivate: [AuthguardGuard] },
      { path: 'compare-graph', component: CompareLineChartComponent, canActivate: [AuthguardGuard] },
      { path: 'bmap', component: BubbleMapComponent, canActivate: [AuthguardGuard] },
      { path: 'add-cust', component: AddOrganisationComponent, canActivate: [AuthguardGuard] },
      { path: 'home-dashboard', component: HomeDashboardComponent, canActivate: [AuthguardGuard] },

      {
        path: 'customers-dashboard',
        component: CustomerDashboardComponent,
        canActivate: [AuthguardGuard, RoleguardService, RolesGuardService],
        data: { role: 'user_mgt_view' }
      },

      {
        path: 'assets-dashbaord',
        component: AssetManagementComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'asset_mgt_view' }
      },

      {
        path: 'assets-dashbaord/map',
        component: AssetManagementComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'trace_route_view' }
      },

      {
        path: 'assets-dashbaord/fota',
        component: AssetManagementComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'fota_mgt_view' }
      },

      // { path: 'ppage',component: PartnersPageComponent,canActivate: [AuthguardGuard]},
      { path: 'clientdata', component: ClientDataComponent, canActivate: [AuthguardGuard] },
      { path: 'assests-data', component: AssetsDatatableComponent, canActivate: [AuthguardGuard] },
      { path: 'assests-detail/:id', component: AssetsDetailViewComponent, canActivate: [AuthguardGuard] },
      { path: 'profile', component: ProfilePageComponent, canActivate: [AuthguardGuard] },
      { path: 'dount', component: DonutChartComponent, canActivate: [AuthguardGuard] },
      { path: 'compare', component: ComparePageComponent, canActivate: [AuthguardGuard] },
      { path: 'realtime', component: RealTimeComponent, canActivate: [AuthguardGuard] },
      { path: 'graphOld', component: AssetsVisualizeComponent, canActivate: [AuthguardGuard] },
      { path: 'add-user', component: AddUserComponent, canActivate: [AuthguardGuard] },
      { path: 'add-role', component: AddRoleComponent, canActivate: [AuthguardGuard] },
      { path: 'view-asset', component: AssetModelView },
      { path: 'setting', component: SettingComponent, canActivate: [AuthguardGuard] },
      { path: 'wizard', component: WizardsComponent, canActivate: [AuthguardGuard] },
      { path: 'asset-model', component: AssetModelComponent },

      {
        path: 'trace-route',
        component: TraceRouteComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'trace_route_view' }
      },

      {
        path: 'trace-route/:imei',
        component: FullTraceMapComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'trace_route_view' }
      },

      {
        path: 'fota',
        component: FotaComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'fota_mgt_view' }
      },

      {
        path: 'fota-detail',
        component: FotaDetailComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'fota_mgt_view' }
      },

      {
        path: 'fota-detail/batch',
        component: BatchDetailsComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'fota_mgt_view' }
      },

      {
        path: 'fota-detail/result',
        component: BatchLogComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'fota_mgt_view' }
      },

      {
        path: 'fota-detail/log',
        component: FotaLogComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'fota_mgt_view' }
      },

      {
        path: 'topic-detail',
        component: TopicManagementComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'topic_mgt_view' }
      },

      {
        path: 'topic-preview',
        component: TopicPreviewComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'topic_mgt_view' }
      },

      {
        path: 'firmware',
        component: FirmwareComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'firmware_mgt_view' }
      },

      {
        path: 'crearte-firmware',
        component: CreateFirmwareComponent,
        canActivate: [AuthguardGuard, RolesGuardService],
        data: { role: 'firmware_mgt_view' }
      },

    ]
  },
  {
    path: '',
    component: LoginLayoutComponent,
    children: [
      //{ path: '', component: LoginComponent },
      { path: 'login', component: LoginComponent }
    ]
  },
  // { path: '**', redirectTo: '' }
  // { path: '', component: LoginComponent},
  // { path: 'login', component: LoginComponent},

  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
