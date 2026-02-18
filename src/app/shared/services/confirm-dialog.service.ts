import { Injectable, ApplicationRef, createComponent, EnvironmentInjector, ComponentRef } from '@angular/core';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
    private componentRef: ComponentRef<ConfirmDialogComponent> | null = null;

    constructor(
        private appRef: ApplicationRef,
        private injector: EnvironmentInjector
    ) { }

    confirm(options: {
        title?: string;
        message: string;
        confirmText?: string;
        cancelText?: string;
        type?: 'danger' | 'warning' | 'info';
    }): Promise<boolean> {
        return new Promise((resolve) => {
            // Destroy any existing dialog
            this.destroy();

            // Create the component
            this.componentRef = createComponent(ConfirmDialogComponent, {
                environmentInjector: this.injector,
            });

            // Set inputs
            const instance = this.componentRef.instance;
            instance.title = options.title ?? 'Confirm Action';
            instance.message = options.message;
            instance.confirmText = options.confirmText ?? 'Confirm';
            instance.cancelText = options.cancelText ?? 'Cancel';
            instance.type = options.type ?? 'danger';

            // Listen for result
            instance.confirmed.subscribe((result: boolean) => {
                resolve(result);
                this.destroy();
            });

            // Attach to DOM
            this.appRef.attachView(this.componentRef.hostView);
            document.body.appendChild(this.componentRef.location.nativeElement);
            this.componentRef.changeDetectorRef.detectChanges();
        });
    }

    private destroy() {
        if (this.componentRef) {
            this.appRef.detachView(this.componentRef.hostView);
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}
