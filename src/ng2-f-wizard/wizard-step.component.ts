import { Component, Input } from '@angular/core';
import { Inject, forwardRef } from '@angular/core';
import { WizardComponent } from './wizard.component';

@Component({
  selector: 'ng2-f-wizard-step',
  template: `
    <div [style.display]="isCurrent ? 'block' : 'none'">
      <h4>{{name}}</h4>
      <ng-content></ng-content>
    </div>
  `,
})
export class WizardStepComponent {
  @Input() name: string = 'nevim';
  public index: number = -1;

  private get isCurrent(): boolean {
    return this.index === this.parent.index;
  }

  constructor(
    // Magie ktera umi vyresit cyklickou zavislost
    @Inject(forwardRef(() => WizardComponent))
    private parent: WizardComponent
  ) {}

  ngAfterContentInit() {
    this.index = this.parent.steps.toArray().indexOf(this);
  }

}
