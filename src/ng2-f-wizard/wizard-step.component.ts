import { Component, Input } from '@angular/core';
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
    @Input() controllsVisible: boolean = true;

    private visible: boolean = false;

    constructor() { }

    public show(): void {
        this.visible = true;
    }
    public hide(): void {
        this.visible = false;
    }

}
