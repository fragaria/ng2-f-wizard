import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { WizardComponent } from './wizard.component';
import { WizardStepComponent } from './wizard-step.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [AppComponent, WizardComponent, WizardStepComponent],
  exports: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
