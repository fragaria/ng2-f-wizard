import { Component, ViewEncapsulation, Input } from '@angular/core';
import { WizardComponent } from './wizard.component';

import { Step } from './step';

@Component({
  selector: 'app-wizard-step',
  template: `
    <div class="container"
         [style.display]="isCurrent ? 'block' : 'none'">
      <h4>{{name}}</h4>
      <ng-content></ng-content>
    </div>
  `,
})
export class WizardStepComponent {
  @Input() name: string = 'nevim';
  private step: Step;

  private get isCurrent(): boolean {
    return this.step.index === this.parent.index;
  }

  constructor(
    private parent: WizardComponent
  ) {}

  ngOnInit() {
    this.step = this.parent.addStep(this.name);
  }

}
