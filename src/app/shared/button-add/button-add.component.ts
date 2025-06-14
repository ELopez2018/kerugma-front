import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-button-add',
  imports: [],
  templateUrl: './button-add.component.html',
  styleUrl: './button-add.component.css',
  standalone: true
})
export class ButtonAddComponent {
@Output() onClick = new EventEmitter<boolean>(false)

onCliked(){
  this.onClick.emit(true)
}
}
