import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {TodosComponent} from "./components/todos/todos.component";
import {AuthGuard} from "../../core/guards/auth.guard";

const routes: Routes = [
  {path: "", pathMatch: "full", component: TodosComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodosRoutingModule {
}

