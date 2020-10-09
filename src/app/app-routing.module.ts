import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome/welcome.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", component: WelcomeComponent },
  {
    //lazy routing
    path: "training",
    loadChildren: () =>
      import("./training/training.module").then((m) => m.TrainingModule),
    canLoad: [AuthGuard],
    //"./training/training.module#TrainingModule",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
