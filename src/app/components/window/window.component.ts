import { NgTemplateOutlet } from '@angular/common';
import { Component, Input, TemplateRef, HostListener, ElementRef } from '@angular/core';
import { Hypershell } from '../../lib/shell';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-window',
  standalone: true,
  imports: [NgTemplateOutlet, LucideAngularModule],
  templateUrl: './window.component.html',
})
export class WindowComponent
{
  @Input() windowTitle = 'Untitled Window';
  @Input() disableMaximize = false;
  @Input() body?: TemplateRef<any>;
  @Input() decorated = true;

  @Input() set width(value: string) { this.elRef.nativeElement.style.width = value; }
  @Input() set height(value: string) { this.elRef.nativeElement.style.height = value; }
  @Input() set left(value: string) { this.elRef.nativeElement.style.left = value; }
  @Input() set top(value: string) { this.elRef.nativeElement.style.top = value; }

  // New properties
  dragging = false;
  dragStartX = 0;
  dragStartY = 0;
  zIndex = 1;

  constructor(private readonly elRef: ElementRef, protected readonly hypershell: Hypershell) {}

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(_event: MouseEvent)
  {
    this.dragging = false;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: any)
  {
    this.incrementZIndex();

    console.log(`[${this.windowTitle}]::onMouseDown() -> event.target:`, event.target);
    console.log(`[${this.windowTitle}]::onMouseDown() -> contains window-header-identifier:`, event.target.className.includes('window-header-identifier'));
    if ( event.target.className && !event.target.className.includes('window-header-identifier') ) { return; }

    this.dragging = true;

    this.dragStartX = event.clientX - this.elRef.nativeElement.offsetLeft;
    this.dragStartY = event.clientY - this.elRef.nativeElement.offsetTop;

    // Prevent text selection
    event.preventDefault();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent)
  {
    /* CAVEAT EMPTOR - This is a hacky solution to prevent the window from being dragged out of the viewport.
     * The proper solution would be to calculate the window's width and height and adjust the dragStartX and dragStartY
     * values accordingly. This would allow the window to be dragged to the edge of the viewport without going out of bounds.
     * As it stands, the window will flicker when dragged out of bounds.
     * TL;DR - Performance issues, not foolproof, needs improvement, but it kinda works.
     */

    if (this.dragging)
    {
      if ( !this.hypershell.isElementInViewport(this.elRef.nativeElement) )
      {
        // this.dragging = false;
        this.elRef.nativeElement.style.left = `${window.innerWidth - this.elRef.nativeElement.offsetWidth}px`;
        this.elRef.nativeElement.style.top = `${event.clientY - this.dragStartY}px`;
      }
      else
      {
        this.elRef.nativeElement.style.left = `${event.clientX - this.dragStartX}px`;
        this.elRef.nativeElement.style.top = `${event.clientY - this.dragStartY}px`;
      }
    }
  }

  incrementZIndex()
  {
    this.elRef.nativeElement.style.zIndex = this.hypershell.incrementZIndex();
  }

  ngOnInit() : void
  {
    console.log('[WINDOW] Init', this.windowTitle);
    console.log(`[${ this.windowTitle }]`, this.elRef);

    // Set initial absolute position on root element
    this.elRef.nativeElement.style.position = 'absolute';

    if ( this.left ) { this.elRef.nativeElement.style.left = this.left; }
    if ( this.top ) { this.elRef.nativeElement.style.top = this.top; }

    if ( !this.disableMaximize )
    {
      this.elRef.nativeElement.classList.add('resizable');
    }
  }
}
