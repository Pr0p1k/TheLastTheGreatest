import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './header/header.component';
import {ButtonModule} from 'primeng/components/button/button';
import {LabComponent} from './lab/lab.component';
import {StartPageComponent} from './start-page/start-page.component';
import {DataTableModule} from 'primeng/components/datatable/datatable';
import {SliderModule} from 'primeng/slider';
import {SpinnerModule} from 'primeng/spinner';
import {SidebarModule} from 'primeng/sidebar';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {ToastModule} from 'primeng/toast';

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
    FormsModule,
    DataTableModule,
    SpinnerModule,
    SliderModule,
    FormsModule,
    SidebarModule,
    InputTextModule,
    PasswordModule,
    ToastModule
  ],
  providers: [],
  bootstrap: [MainComponent, HeaderComponent]
})

export class AppModule {
}
