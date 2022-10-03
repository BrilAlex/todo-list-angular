import {Component, Input} from "@angular/core";

@Component({
  selector: "tdl-todo-footer",
  templateUrl: "./todo-footer.component.html",
  styleUrls: ["./todo-footer.component.css"],
})
export class TodoFooterComponent {
  @Input() addedDate!: string;
}
