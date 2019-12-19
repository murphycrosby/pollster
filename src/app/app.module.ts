import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { PollsterService } from '../services/pollster.service';

import {
  ButtonModule,
  ChartModule,
  DialogModule,
  InputTextModule,
  PanelModule,
  SharedModule,
  SidebarModule,
  TreeModule
} from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    // PrimeNG Modules
    ButtonModule,
    ChartModule,
    DialogModule,
    InputTextModule,
    PanelModule,
    SharedModule,
    SidebarModule,
    TreeModule,
  ],
  providers: [
    PollsterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
