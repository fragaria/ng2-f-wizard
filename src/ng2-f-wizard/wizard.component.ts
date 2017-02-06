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

@Component({
    selector: 'ng2-f-wizard',
    template: `
    <div class="ng2-f-wizard">
    <div class="navbar navbar-static-top navbar-light bg-faded">
      <span class="navbar-brand" href="#"> <i class="fa fa-shopping-cart" aria-hidden="true"></i> KB Online</span>
      <button type="button"
              class="btn close float-xs-right"
              (click)="emitOnClose()">
        <i class="fa fa-close"></i>
      </button>
    </div>

    <div class="container-fluid">

      <div class="row">

        <!-- left sidebar -->
        <div *ngIf="stepListVisible" class="col-sm-12 col-md-3">

          <!-- step list -->
          <ul class="ng2-f-wizard-step-list row">
            <ng-container *ngFor="let step of steps; let i = index">
              <li *ngIf="!step.unlisted"
                   class="ng2-f-wizard-step-list-item col-xs-12 col-sm-6 col-md-12"
                  [class.ng2-f-wizard-active]="isActive(i)"
                  [class.ng2-f-wizard-clickable]="isClickable(i)"
                  (click)="isClickable(i) && emitOnStepList(i)">
                <span class="ng2-f-wizard-circle">{{reindex(i)}}</span> &nbsp; {{step.name}}
                <i *ngIf="isClickable(i)" class="fa fa-check fa-lg fa-green"></i>
              </li>
            </ng-container>
          </ul>

        </div><!-- /left sidebar -->

        <!-- content -->
        <div class="container col-xs-12"
            [class.col-md-9]="stepListVisible">

          <!-- step content -->
          <ng-content></ng-content>

          <!-- footer -->
          <div *ngIf="footerVisible" class="row ng2-f-wizard-footer">
            <!-- NOTE Not used for now
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
                    (click)="emitOnNext()">
              Další
            </button>
            <button *ngIf="isFinalStep"
                    type="button"
                    class="btn btn-secondary col-xs-12 col-md-3 offset-md-8"
                    (click)="emitOnFinish()">
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
    @Input() startAt: number = 1;

    @Output() onStepList: EventEmitter<number> = new EventEmitter();
    @Output() onNext: EventEmitter<number> = new EventEmitter();
    @Output() onClose: EventEmitter<any> = new EventEmitter();
    @Output() onFinish: EventEmitter<any> = new EventEmitter();

    //// Steps handling

    private currentStep: WizardStepComponent = null;

    @ContentChildren(WizardStepComponent) _stepsContentChildren: QueryList<WizardStepComponent>;

    private _steps: any[];

    private get steps(): any[] {
        return this._steps || (this._steps = this._stepsContentChildren.toArray());
    }

    constructor() { }

    ngAfterContentInit() {
        console.log(`Wizard has ${this.steps.length} steps.`);
        console.log(`First step is ${this.steps[0].name}`);
        console.log(`Starting at index ${this.index} shown as ${this.reindex(this.index)}`);

        this.setStep(this.index);

        // NOTE for future changes in list of steps subscribe
        //this._stepsContentChildren.changes.subscribe(changes => console.log(changes));
    }

    //// Template helpers

    private get visited(): number {
        // NOTE We really want user to go through the rest of the wizard
        // again, so the following is correct =/
        return this.index;
        // Otherwise we probably should do this in setStep method
        //this.visited = (index > this.visited ? index : this.visited);
    }

    private reindex(i: number): number {
        return i + this.startAt;
    }

    private get stepListVisible(): boolean {
        return !this.currentStep.noStepList;
    }

    private get footerVisible(): boolean {
        return !this.currentStep.noFooter;
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

    //// Public API

    public setStep(index: number): void {
        this.index = index;

        this.currentStep = this.steps[index];
        this.steps.forEach(s => s.hide());
        this.currentStep.show();
        console.log(`Wizard changed to step ${this.index}.`);
    }

    /** Go to next step. This method should be called when current step's data
     *  are validated (and valid) and communication with BE is finished. */
    public nextStep(): void {
        if (this.isFinalStep) return;
        console.log(`Wizard going to next step ${this.index + 1}.`);
        this.setStep(this.index + 1);
    }

    // NOTE Not used for now
    // public previousStep(): void {
    //     if (this.isFirstStep) return;
    //     this.setStep(this.index - 1);
    // }

    /** Currently just goes to the last (usually Thank you) step. */
    public finishWizard(): void {
        console.log("Wizard going to finis (just next step for now).");
        this.nextStep();
    }

    //// Events emittors

    private emitOnNext(): void {
        console.log("Wizard emitting 'OnNext' event.");
        this.onNext.emit(null);
    }

    private emitOnStepList(id: number): void {
        console.log("Wizard emitting 'OnStepList' event.");
        this.onStepList.emit(id);
    }

    private emitOnFinish(): void {
        console.log("Wizard emitting 'OnFinish' event.");
        this.onFinish.emit(null);
    }

    private emitOnClose(): void {
        console.log("Wizard emitting 'OnClose' event.");
        this.onClose.emit(null);
    }

}
