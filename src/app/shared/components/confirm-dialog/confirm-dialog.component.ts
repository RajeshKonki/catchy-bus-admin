import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-dialog',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="confirm-overlay" (click)="onOverlayClick($event)">
      <div class="confirm-modal" role="dialog" aria-modal="true">

        <!-- Icon -->
        <div class="confirm-icon-wrap" [ngClass]="type">
          <i class="fas" [ngClass]="{
            'fa-trash-alt':       type === 'danger',
            'fa-exclamation-triangle': type === 'warning',
            'fa-info-circle':     type === 'info'
          }"></i>
        </div>

        <!-- Content -->
        <div class="confirm-content">
          <h3 class="confirm-title">{{ title }}</h3>
          <p class="confirm-message">{{ message }}</p>
        </div>

        <!-- Actions -->
        <div class="confirm-actions">
          <button class="confirm-btn cancel" (click)="emit(false)">
            <i class="fas fa-times"></i> {{ cancelText }}
          </button>
          <button class="confirm-btn" [ngClass]="'confirm-' + type" (click)="emit(true)">
            <i class="fas" [ngClass]="{
              'fa-trash-alt': type === 'danger',
              'fa-check':     type !== 'danger'
            }"></i>
            {{ confirmText }}
          </button>
        </div>

      </div>
    </div>
  `,
    styles: [`
    .confirm-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.55);
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      animation: overlayIn 0.18s ease;
    }

    @keyframes overlayIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    .confirm-modal {
      background: #fff;
      border-radius: 16px;
      padding: 2rem;
      width: 100%;
      max-width: 420px;
      margin: 1rem;
      box-shadow: 0 24px 64px rgba(15, 23, 42, 0.22), 0 4px 16px rgba(15, 23, 42, 0.1);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.25rem;
      animation: modalIn 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
    }

    @keyframes modalIn {
      from { opacity: 0; transform: scale(0.88) translateY(12px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }

    /* Icon circle */
    .confirm-icon-wrap {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .confirm-icon-wrap.danger  { background: #fee2e2; color: #dc2626; }
    .confirm-icon-wrap.warning { background: #fef3c7; color: #d97706; }
    .confirm-icon-wrap.info    { background: #dbeafe; color: #2563eb; }

    /* Text */
    .confirm-content { text-align: center; }

    .confirm-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #111827;
      margin: 0 0 0.5rem;
    }

    .confirm-message {
      font-size: 0.9rem;
      color: #6b7280;
      margin: 0;
      line-height: 1.6;
    }

    /* Buttons */
    .confirm-actions {
      display: flex;
      gap: 0.75rem;
      width: 100%;
    }

    .confirm-btn {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      padding: 0.7rem 1rem;
      border-radius: 10px;
      font-size: 0.88rem;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all 0.18s ease;
      font-family: inherit;
    }

    .confirm-btn.cancel {
      background: #f1f5f9;
      color: #475569;
      border: 1.5px solid #e2e8f0;
    }

    .confirm-btn.cancel:hover {
      background: #e2e8f0;
      color: #1e293b;
    }

    .confirm-btn.confirm-danger {
      background: linear-gradient(135deg, #dc2626, #ef4444);
      color: #fff;
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
    }

    .confirm-btn.confirm-danger:hover {
      background: linear-gradient(135deg, #b91c1c, #dc2626);
      box-shadow: 0 6px 16px rgba(220, 38, 38, 0.4);
      transform: translateY(-1px);
    }

    .confirm-btn.confirm-warning {
      background: linear-gradient(135deg, #d97706, #f59e0b);
      color: #fff;
      box-shadow: 0 4px 12px rgba(217, 119, 6, 0.3);
    }

    .confirm-btn.confirm-info {
      background: linear-gradient(135deg, #1a3a6b, #2563eb);
      color: #fff;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }
  `]
})
export class ConfirmDialogComponent implements OnInit {
    @Input() title = 'Confirm Action';
    @Input() message = 'Are you sure?';
    @Input() confirmText = 'Confirm';
    @Input() cancelText = 'Cancel';
    @Input() type: 'danger' | 'warning' | 'info' = 'danger';

    @Output() confirmed = new EventEmitter<boolean>();

    ngOnInit() {
        // Close on Escape key
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') { this.emit(false); document.removeEventListener('keydown', handler); }
        };
        document.addEventListener('keydown', handler);
    }

    emit(value: boolean) { this.confirmed.emit(value); }

    onOverlayClick(e: MouseEvent) {
        if ((e.target as HTMLElement).classList.contains('confirm-overlay')) {
            this.emit(false);
        }
    }
}
