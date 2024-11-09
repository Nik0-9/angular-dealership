import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  to_mail: string = '';
  @Output() confirm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  onConfirm() {
    this.confirm.emit(this.to_mail);
  }

  onCancel() {
    this.cancel.emit();
  }
}
