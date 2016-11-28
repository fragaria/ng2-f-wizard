import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { Step } from './step';

@Component({
  selector: 'app-wizard',
  styles: [``],
  templateUrl: './wizard.component.html',
})
export class WizardComponent {
  @Input('initStep') public index: number = 0;

  @Output() finish: EventEmitter<any> = new EventEmitter();
  // @Output() stepChange: EventEmitter<number> = new EventEmitter();

  private visited: number = -1;
  private steps: Step[] = [];

  private get isFinalStep (): boolean {
    return this.index === this.steps.length -1;
  }
  private get isFirstStep (): boolean {
    return this.index === 0;
  }

  constructor()
  { }

  ngOnInit() {
    this.setStep(this.index);
  }

  private isActive(index: number): boolean {
    return index == this.index;
  }

  private isClickable(index: number): boolean {
    return index <= this.visited && !this.isActive(index);
  }

  private setStep(index: number): void {
    console.log('set step: ' + index);
    this.index = index;
    this.visited = (index > this.visited ? index : this.visited);
    // this.stepChange.emit(index);
  }

  private nextStep(): void {
    console.log('next step')
    this.setStep(this.index + 1);
  }

  private previousStep(): void  {
    console.log('previous step')
    this.setStep(this.index - 1);
  }

  private finishWizard(): void {
    this.finish.emit(null);
  }

  public addStep(name: string): Step {
    const newStep = new Step(this.steps.length, name);
    const newSteps = [...this.steps, newStep];
    this.steps = newSteps;
    return newStep;
  }
}
