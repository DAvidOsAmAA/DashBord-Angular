import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core'; 

@Component({
  selector: 'view-img',
  imports: [],
  templateUrl: './view-img.component.html',
  styleUrl: './view-img.component.scss'
})
export class ViewImgComponent {
  @Input() img?: string;

    @Output() closePopup = new EventEmitter<void>();

  close() {
    this.closePopup.emit();
  }
 
}
