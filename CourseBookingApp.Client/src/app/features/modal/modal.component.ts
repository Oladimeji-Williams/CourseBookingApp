import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() disableClose = false; // block close while submitting
  @Output() closed = new EventEmitter<void>();

  isClosing = false;

  constructor(private router: Router) {}

  close() {
    if (this.disableClose) return;

    this.isClosing = true;

    setTimeout(() => {
      this.closed.emit();
      // Clear overlay outlet
      this.router.navigate([{ outlets: { overlay: null } }]);
    }, 200); // matches fade-out duration
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  @HostListener('document:keydown.escape')
  onEsc() {
    this.close();
  }
}
