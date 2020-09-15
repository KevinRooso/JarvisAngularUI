import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AssetsManagerComponent } from './components/assets-manager/assets-manager.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatStepperModule} from '@angular/material/stepper';

import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './login/login.component';
import { SubComponentTreeComponent } from './components/sub-component-tree/sub-component-tree.component';
import { MatTreeModule } from '@angular/material/tree';
import { AddAssetComponent } from './components/add-asset/add-asset.component';
import { ViewAssetComponent } from './components/view-asset/view-asset.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import{ AuthguardGuard}  from './authguard.guard'
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatGridListModule} from '@angular/material/grid-list';



/* Plotly Js Start*/

import * as PlotlyJS from 'plotly.js/dist/plotly.js';
// import { PlotlyModule } from '../plotly/plotly.module';
import { PlotlyViaCDNModule } from './charts/plotly-via-cdn/plotly-via-cdn.module';
import { LineChartsComponent } from './charts/graphs/line-charts/line-charts.component';
import { BubbleMapComponent } from './charts/maps/bubble-map/bubble-map.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddOrganisationComponent } from './components/organisation/add-organisation/add-organisation.component';
import { Interceptor } from './interceptor';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
// import { PlotlyViaWindowModule } from '../plotly-via-window/plotly-via-window.module';
import { CustomerManagementComponent } from './dashboard/customer-management/customer-management.component';
import { AssetManagementComponent } from './dashboard/asset-management/asset-management.component';
import { AddCustomerPopupComponent } from './dashboard/add-customer-popup/add-customer-popup.component';
import { BrandPageComponent } from './customer-management/brand-page/brand-page.component';
import { PartnersPageComponent } from './customer-management/partners-page/partners-page.component';
import { UsersPageComponent } from './customer-management/users-page/users-page.component';
import { CustomerDashboardComponent } from './dashboard/customer-dashboard/customer-dashboard.component';
import { MatTableComponent } from './mat-table/mat-table.component';
import { ClientDataComponent } from './dashboard/client-data/client-data.component';
import { AssetsDatatableComponent } from './assests-management-pages/assets-datatable/assets-datatable.component';
import { AssetsDetailViewComponent } from './assests-management-pages/assets-detail-view/assets-detail-view.component';
import { AssetsOverviewComponent } from './assests-management-pages/assets-overview/assets-overview.component';
import { AssetsSpecificationComponent } from './assests-management-pages/assets-specification/assets-specification.component';
import { AssetsIdentificationComponent } from './assests-management-pages/assets-identification/assets-identification.component';
import { AssetsSensorsComponent } from './assests-management-pages/assets-sensors/assets-sensors.component';
import { AssetsConfigurationComponent } from './assests-management-pages/assets-configuration/assets-configuration.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { PersonalInfoComponent } from './profile-pages/personal-info/personal-info.component';
import { AccountInfoComponent } from './profile-pages/account-info/account-info.component';
import { ChangePasswordComponent } from './profile-pages/change-password/change-password.component';
import { DonutChartComponent } from './charts/graphs/donut-chart/donut-chart.component';
import { ErrorLogsComponent } from './assests-management-pages/error-logs/error-logs.component';
import { ComparePageComponent } from './assests-management-pages/compare-page/compare-page.component';
import { RealTimeComponent } from './charts/graphs/real-time/real-time.component';
import { AssetsVisualizeComponent } from './assests-management-pages/assets-visualize/assets-visualize.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AddUserComponent } from './components/add-user/add-user.component';
import { LoaderComponent } from './loader/loader.component';
import { ProfileViewComponent } from './profile-pages/profile-view/profile-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { BettryErrorChart } from './charts/graphs/extra-charts/common-line-chart.component';
import { AssetModelView } from './asset-model-mgt/asset-model-view';
import {MatChipsModule} from '@angular/material/chips';
import { MapModuleModule } from './map-module/map-module.module';
import { ProgressSpinnerModule } from './progress-spinner-module/progress-spinner.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BarChartComponent } from './charts/graphs/bar-chart/bar-chart.component';
import { MatButtonToggleModule, MatSnackBarModule } from '@angular/material';
import { SettingComponent } from './setting/setting.component';
import { WizardsComponent } from './wizards/wizards.component';
import { AssetModelComponent } from './asset-model/asset-model.component';
import { BarChartGainnerComponent } from './charts/graphs/bar-chart/bar-chart-gainner.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselComponent } from './carousel/carousel.component';
import { CompareLineChartComponent } from './charts/graphs/compare-line-chart/compare-line-chart.component';
import { SliderCarousalComponent } from './slider-carousal/slider-carousal.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AssetsCardTemplateComponent } from './assests-management-pages/assets-card-template/assets-card-template.component';
import { OverviewGraphsComponent } from './overview-graphs/overview-graphs.component';
import { GaugegraphsComponent } from './gaugegraphs/gaugegraphs.component';

import { OverviewbargraphsComponent } from './overviewbargraphs/overviewbargraphs.component';
import { TraceRouteComponent } from './trace-route/trace-route.component';
import { TraceMapComponent } from './trace-route/trace-map/trace-map.component';
import { FullTraceMapComponent } from './trace-route/full-trace-map/full-trace-map.component';
import { FotaComponent } from './fota/fota.component';
import { FotaDetailComponent } from './fota/fota-detail/fota-detail.component';
import { FotaChooseComponent } from './fota/fota-choose/fota-choose.component';
import { TopicManagementComponent } from './topic-management/topic-management.component';
import { CreateTopicComponent } from './topic-management/create-topic/create-topic.component';
import { FirmwareComponent } from './firmware/firmware.component';
import { CreateFirmwareComponent } from './firmware/create-firmware/create-firmware.component';
import { BatchLogComponent} from './fota/batch-log/batch-log.component';
import { BatchDetailsComponent } from './fota/batch-details/batch-details.component';
import { TopicPreviewComponent } from './topic-preview/topic-preview.component';
import { FotaMatTableComponent } from './fota-mat-table/fota-mat-table.component';
import { FotaLogComponent } from './fota-log/fota-log.component';


// PlotlyModule.plotlyjs = PlotlyJS;
PlotlyViaCDNModule.plotlyVersion = '1.49.4';
// PlotlyViaCDNModule.plotlyBundle = 'cartesian';

/* End Poltly js */
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    AssetsManagerComponent,

    LoginComponent,
    SubComponentTreeComponent,
    AddAssetComponent,
    ViewAssetComponent,
    LineChartsComponent,
    BubbleMapComponent,
    AddOrganisationComponent,
    HomeDashboardComponent,
    CustomerManagementComponent,
    AssetManagementComponent,
    AddCustomerPopupComponent,
    BrandPageComponent,
    PartnersPageComponent,
    UsersPageComponent,
    CustomerDashboardComponent,
    MatTableComponent,
    ClientDataComponent,
    AssetsDatatableComponent,
    AssetsDetailViewComponent,
    AssetsOverviewComponent,
    AssetsSpecificationComponent,
    AssetsIdentificationComponent,
    AssetsSensorsComponent,
    AssetsConfigurationComponent,
    ProfilePageComponent,
    PersonalInfoComponent,
    AccountInfoComponent,
    ChangePasswordComponent,
    DonutChartComponent,
    ErrorLogsComponent,
    ComparePageComponent,
    RealTimeComponent,
    AssetsVisualizeComponent,
    AddUserComponent,
    LoaderComponent,
    ProfileViewComponent,
    BettryErrorChart,
    AssetModelView,
    PageNotFoundComponent,
    BarChartComponent,
    SettingComponent,
    WizardsComponent,
    AssetModelComponent,
    BarChartGainnerComponent,
    CarouselComponent,
    CompareLineChartComponent,
    SliderCarousalComponent,
    AssetsCardTemplateComponent,
    OverviewGraphsComponent,
    GaugegraphsComponent,

    OverviewbargraphsComponent,

    TraceRouteComponent,

    TraceMapComponent,

    FullTraceMapComponent,

    FotaComponent,

    FotaDetailComponent,

    FotaChooseComponent,

    TopicManagementComponent,

    CreateTopicComponent,

    FirmwareComponent,

    CreateFirmwareComponent,

    BatchLogComponent,

    BatchDetailsComponent,

    TopicPreviewComponent,

    FotaMatTableComponent,

    FotaLogComponent
  ],
  imports: [
    MatGridListModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatSelectModule,
    HttpClientModule,
    LayoutModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatStepperModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressBarModule,
    MatCardModule,
    MatTreeModule,
    MatRippleModule,

    MatMenuModule,
    PlotlyViaCDNModule,
    MatDatepickerModule,
    MatNativeDateModule ,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    DragDropModule,
    FormsModule,
    MatChipsModule,
    MapModuleModule,
    MatSnackBarModule,
    MatChipsModule,
    MatAutocompleteModule,
    ProgressSpinnerModule,
    MatButtonToggleModule,
    SlickCarouselModule,
    NgbModule,
    NgxDaterangepickerMd.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDFMaXURcAeSa3KWAKJbqNMDbUQzodhvwc'
    })
  ],
  entryComponents: [AddCustomerPopupComponent,LoaderComponent,PersonalInfoComponent,AssetsCardTemplateComponent],
  providers: [
        MatDatepickerModule,
        AuthguardGuard,
        { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
        {provide: LocationStrategy, useClass: HashLocationStrategy} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
