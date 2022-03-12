import { Directive, ElementRef, HostListener,Renderer2 } from '@angular/core';

@Directive({
  selector: '[shadow]'
})
export class ShadowDirective {

  constructor(
    private el: ElementRef,
    private render: Renderer2
  ) { }

  @HostListener('mouseover', ['$event'])
  mouseover(e: any) {
   
    this.render.setProperty(this.el.nativeElement, 'style','box-shadow:0 0 0 0 rgba(0, 0, 0,0); transition:1s;')
  }


  @HostListener('mouseout', ['$event'])
  mouseout(e: any) {
    this.render.setProperty(this.el.nativeElement, 'style', '-webkit-box-shadow: 0px 620px 16px rgba(34, 60, 80,0.3);-moz-box-shadow: 0px 6px 20px 16px rgba(34, 60, 80, 0.3);box-shadow: 0px 6px 20px 16px rgba(34, 60, 80, 0.3); transition:1s;')
  }
}

