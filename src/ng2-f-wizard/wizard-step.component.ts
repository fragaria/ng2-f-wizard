import {
    Component,
    Input,
    ElementRef,
    ChangeDetectorRef,
    ContentChild
} from '@angular/core';

import { NgModelGroup } from '@angular/forms';

@Component({
    selector: 'ng2-f-wizard-step',
    template: `
    <div [style.display]="visible ? 'block' : 'none'">
      <ng-content></ng-content>
    </div>
  `,
})
export class WizardStepComponent {
    @Input() name: string = '';
    //@Input() modelGroup:NgModelGroup;

    @ContentChild(NgModelGroup) modelGroup;

    private visible: boolean = false;

    constructor(private elementRef: ElementRef,
        private _changeDetectionRef: ChangeDetectorRef) { }

    public get invalid(): boolean {
      if (!this.modelGroup) return false;
      let status = this.modelGroup.valid ? 'valid' :
                   this.modelGroup.invalid ? 'invalid' :
                   this.modelGroup.pending ? 'pending' : 'in unknown state';
      console.log(`This step is ${status}`, this, this.modelGroup);
      return !this.modelGroup.valid;
    }

    /** Hide this Step from Step List if `unlisted` attribute is present*/
    public get unlisted(): boolean {
        return !!this.elementRef.nativeElement.attributes['unlisted'];
    }

    /** Hide Step List if `nosteplist` attribute is present. */
    public get noStepList(): boolean {
        return !!this.elementRef.nativeElement.attributes['nosteplist'];
    }

    /** Hide Footer if `nofooter` attribute is present. */
    public get noFooter(): boolean {
        return !!this.elementRef.nativeElement.attributes['nofooter'];
    }

    /** Show this step. */
    public show(): void {
        this.visible = true;
        this.fireChangeDetector();
    }

    /** Hide this step. */
    public hide(): void {
        this.visible = false;
        this.fireChangeDetector();
    }

    // See: https://github.com/angular/angular/issues/6005#issuecomment-195991516
    private fireChangeDetector(): void {
        this._changeDetectionRef.detectChanges();
    }

}
