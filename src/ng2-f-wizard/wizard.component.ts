import {
  Component,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  ContentChildren,
  QueryList
} from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';
import { ThankYouWizardStepComponent } from './thank-you-wizard-step.component';

@Component({
  selector: 'ng2-f-wizard',
  template: `
    <div class="ng2-f-wizard">
    <div class="navbar navbar-static-top navbar-light bg-faded">
      <span class="navbar-brand" href="#"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> KB Online</span>
      <button type="button"
              class="btn close float-xs-right"
              (click)="emitWizardClose()">
        <i class="fa fa-close"></i>
      </button>
    </div>

    <div class="container-fluid">

      <div class="row">

        <!-- left sidebar -->
        <div *ngIf="controllsVisible" class="col-sm-12 col-md-3">

          <!-- step list -->
          <ul class="ng2-f-wizard-step-list row">
            <li *ngFor="let step of steps; let i = index"
                 class="ng2-f-wizard-step-list-item col-xs-12 col-sm-6 col-md-12"
                [class.ng2-f-wizard-active]="isActive(i)"
                [class.ng2-f-wizard-clickable]="isClickable(i)"
                (click)="isClickable(i) && setStep(i)">
              <span class="ng2-f-wizard-circle">{{i + 1}}</span> &nbsp; {{step.name}}
              <i *ngIf="isClickable(i)" class="fa fa-check fa-lg fa-green"></i>
            </li>
          </ul>

        </div><!-- /left sidebar -->

        <!-- content -->
        <div class="container col-xs-12"
            [class.col-md-9]="controllsVisible">

          <!-- step content -->
          <ng-content></ng-content>

          <!-- footer -->
          <div *ngIf="controllsVisible" class="row ng2-f-wizard-footer">
            <!--
            <button [style.visibility]="isFirstStep ? 'hidden' : 'visible'"
                    type="button"
                    class="btn btn-secondary"
                    (click)="previousStep()">
              Předchozí
            </button>
            {{index + 1}} / {{steps.length}}
            -->
            <button *ngIf="!isFinalStep"
                    type="button"
                    class="btn btn-secondary col-xs-12 col-md-3 offset-md-8"
                    (click)="nextStep()">
              Další
            </button>
            <button *ngIf="isFinalStep"
                    type="button"
                    class="btn btn-secondary col-xs-12 col-md-3 offset-md-8"
                    (click)="emitWizardFinish()">
              Odeslat
            </button>
          </div><!-- /footer -->
        </div><!-- /content -->
      </div><!-- /row -->
    </div><!-- /container -->
  </div><!-- /.ng2-f-wizard -->
  `
})
export class WizardComponent {
  @Input('initStep') index: number = 0;

  @Output() stepChanged: EventEmitter<number> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() finish: EventEmitter<any> = new EventEmitter();

  @ContentChildren(WizardStepComponent) steps: QueryList<WizardStepComponent>;
  @ContentChild(ThankYouWizardStepComponent) thankYouStep: ThankYouWizardStepComponent;

  private controllsVisible: boolean = true;
  private visited: number = -1;
  private currentStep: WizardStepComponent = null;

  constructor(){ }

  ngAfterContentInit() {
    // NOTE setStep would emit step change, don't call it here
    this.visited = this.index;
    this.currentStep = this.steps.toArray()[this.index];
    this.currentStep.show();

    // NOTE for future changes in list of steps subscribe
    //this.steps.changes.subscribe(changes => console.log(changes));
  }

  private get isFinalStep(): boolean {
    return this.index === this.steps.length - 1;
  }

  private get isFirstStep(): boolean {
    return this.index === 0;
  }

  private isActive(index: number): boolean {
    return index == this.index;
  }

  private isClickable(index: number): boolean {
    return index <= this.visited && !this.isActive(index);
  }

  private setStep(index: number): void {
    this.index = index;

    // TODO DELME and UNCOMMENT
    this.visited = index;
    //this.visited = (index > this.visited ? index : this.visited);

    this.currentStep = this.steps.toArray()[index];
    this.steps.forEach(s => s.hide());
    this.currentStep.show();

    this.emitStepChanged(index);
  }

  private nextStep(): void {
    this.setStep(this.index + 1);
  }

  private previousStep(): void  {
    this.setStep(this.index - 1);
  }

  private showThankYouStep(): void {
    // hide controlls
    this.controllsVisible = false;

    // show only the thank you step
    if (this.thankYouStep) {
      this.steps.forEach(s => s.hide());
      this.thankYouStep.show();
    }
  }

  private emitStepChanged(id: number): void {
    // TODO somehow fire a required promise returning callback
    this.stepChanged.emit(id);
  }

  private emitWizardFinish(): void {
    // TODO somehow fire a required promise returning callback
    this.finish.emit(null);
    this.showThankYouStep();
  }

  private emitWizardClose(): void {
    this.close.emit(null);
  }

}
