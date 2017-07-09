import {TemplateRef, ViewContainerRef, Directive, Input} from '@angular/core';

@Directive({
   selector: '[cRepeat]'
})
export class cRepeatDirective {
   constructor(
       private _template: TemplateRef<any>,
       private _viewContainer: ViewContainerRef
   ) { }

   @Input('cRepeat')
   set times(times: number) {
       for (let i = 0; i < times; ++i)
           this._viewContainer.createEmbeddedView(this._template);
   }
}