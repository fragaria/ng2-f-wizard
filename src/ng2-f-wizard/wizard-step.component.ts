import { Component, Input, ElementRef } from '@angular/core';
import { Inject, forwardRef } from '@angular/core';

@Component({
    selector: 'ng2-f-wizard-step',
    template: `
    <div [style.display]="visible ? 'block' : 'none'">
      <h4>{{name}}</h4>
      <ng-content></ng-content>
    </div>
  `,
})
export class WizardStepComponent {
    @Input() name: string = '';

    private visible: boolean = false;

    constructor(private elementRef: ElementRef) { }

    public get noStepList(): boolean {
        return !!this.elementRef.nativeElement.attributes['nosteplist'];
    }

    public get noFooter(): boolean {
        return !!this.elementRef.nativeElement.attributes['nofooter'];
    }

    public show(): void {
        this.visible = true;
    }
    public hide(): void {
        this.visible = false;
    }

}
