import { Component, Input } from '@angular/core';
import { Inject, forwardRef } from '@angular/core';

@Component({
  selector: 'ng2-f-thank-you-wizard-step',
  template: `
    <div [style.display]="visible ? 'block' : 'none'">
      <ng-content></ng-content>
    </div>
  `,
})
export class ThankYouWizardStepComponent {
  private visible: boolean = false;

  constructor() {}

  public show(): void {
    this.visible = true;
  }
  public hide(): void {
    this.visible = false;
  }

}
