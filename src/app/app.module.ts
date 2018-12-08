import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import {ButtonModule} from 'primeng/components/button/button';
import { LabComponent } from './lab/lab.component';
import { StartPageComponent } from './start-page/start-page.component';

@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    LabComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [MainComponent, HeaderComponent]
})
export class AppModule {
  show = false;
}
