import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SelectComponent } from './components/select/select.component';
import { MainComponent } from './views/main/main.component';
import { PresentationComponent } from './views/presentation/presentation.component';
import { GraphicBarComponent } from './components/graphic-bar/graphic-bar.component';
import { DistrictsComponent } from './views/districts/districts.component';
import { SelectDistrictsComponent } from './components/select-districts/select-districts.component';
import { DashboardDistrictComponent } from './components/dashboard-district/dashboard-district.component';
import { HorizontalBarChartComponent } from './components/horizontal-bar-chart/horizontal-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SelectComponent,
    MainComponent,
    PresentationComponent,
    GraphicBarComponent,
    DistrictsComponent,
    SelectDistrictsComponent,
    DashboardDistrictComponent,
    HorizontalBarChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path:'', component:PresentationComponent},
      {path:'main', component:MainComponent},
      {path:'districts', component:DistrictsComponent},
      {path:'**', redirectTo:'/', pathMatch:'full'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
