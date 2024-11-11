import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  isMailValid: boolean = false;
  to_mail: string = '';
  @Output() confirm = new EventEmitter<string>();
  @Output() cancel = new EventEmitter<void>();

  validateEmail() {
    const emailRegex = /^[\w.-]+@[a-zA-Z0-9-]{4,}\.[a-zA-Z]{2,4}$/;///^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.isMailValid = emailRegex.test(this.to_mail);
  }
  onConfirm() {
    this.confirm.emit(this.to_mail);
  }

  onCancel() {
    this.cancel.emit();
  }
}
