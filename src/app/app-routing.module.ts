import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./core/guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadChildren: () => import("./features/todos/todos.module").then((m) => m.TodosModule),
    canActivate: [AuthGuard],
  },
  {
    path: "login",
    loadChildren: () => import("./features/auth/auth.module").then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
