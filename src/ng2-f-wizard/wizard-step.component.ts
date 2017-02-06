import {
    Component,
    Input,
    ElementRef,
    ChangeDetectorRef
} from '@angular/core';

@Component({
    selector: 'ng2-f-wizard-step',
    template: `
    <div [style.display]="visible ? 'block' : 'none'">
      <h4 *ngIf="name">{{name}}</h4>
      <ng-content></ng-content>
    </div>
  `,
})
export class WizardStepComponent {
    @Input() name: string = '';

    private visible: boolean = false;

    constructor(private elementRef: ElementRef,
        private _changeDetectionRef: ChangeDetectorRef) { }

    /** Hide Step List if `nosteplist` attribute is present. */
    public get noStepList(): boolean {
        return !!this.elementRef.nativeElement.attributes['nosteplist'];
    }

    /** Hide Footer if `nofooter` attribute is present. */
    public get noFooter(): boolean {
        return !!this.elementRef.nativeElement.attributes['nofooter'];
    }

    /** Show this step. */
    public show(): void {
        this.visible = true;
        this.fireChangeDetector();
    }

    /** Hide this step. */
    public hide(): void {
        this.visible = false;
        this.fireChangeDetector();
    }

    private fireChangeDetector(): void {
        this._changeDetectionRef.detectChanges();
    }

}
