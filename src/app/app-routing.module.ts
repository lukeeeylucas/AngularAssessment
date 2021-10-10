import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FormOutputComponent } from "./contact/form-output/form-output.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { HomeComponent } from "./home/home.component";
import { UserComponent } from "./user/user.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'contact',  component: FormOutputComponent },
  { path: 'contact/:id',  component: UserComponent },
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
