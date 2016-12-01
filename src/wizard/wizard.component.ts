import { Component, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';

@Component({
  selector: 'fast-wizard',
  styleUrls: ['wizard.component.scss'],
  templateUrl: './wizard.component.html',
})
export class WizardComponent {
  // @Input('initStep') public index: number = 0;
  @Input('initStep') index: number = 0;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() finish: EventEmitter<any> = new EventEmitter();

  @ContentChildren(WizardStepComponent)
  public steps: QueryList<WizardStepComponent>;

  private visited: number = -1;

  constructor()
  { }

  ngOnInit() {
    this.setStep(this.index);
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
  }

  private nextStep(): void {
    this.setStep(this.index + 1);
  }

  private previousStep(): void  {
    this.setStep(this.index - 1);
  }

  private finishWizard(): void {
    this.finish.emit(null);
  }

  private closeWizard(): void {
    this.close.emit(null);
  }

}
