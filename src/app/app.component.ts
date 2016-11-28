import { Component, ViewEncapsulation } from '@angular/core';

import { WizardComponent } from './wizard.component';
import { WizardStepComponent } from './wizard-step.component';

@Component({
  selector: 'seed-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private initStep = 4;

  constructor() {
  }

  onFinish() {
    window.postMessage('kbonline:closeme', '*')
    console.log('Finished!');
  }

}
