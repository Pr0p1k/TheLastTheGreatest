import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LabComponent} from './lab/lab.component';
import {StartPageComponent} from './start-page/start-page.component';

const routes: Routes = [
  {path: 'lab', component: LabComponent},
  {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'start', component: StartPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
