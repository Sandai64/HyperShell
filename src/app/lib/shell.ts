import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, Type } from '@angular/core';
import { AboutComponent } from '../apps/about/about.component';

/**
 * This needs to be a singleton service that manages the shell's state.
 *
 * **Responsibilities** :
 * - Creating new windows
 * - Managing the window stack
 */
@Injectable({providedIn: 'root'})
export class Hypershell
{
  // Z-index counter
  private zIndexCounter = 1;

  constructor (
    private readonly resolver : ComponentFactoryResolver,
    private readonly appRef   : ApplicationRef,
    private readonly injector : Injector,
  ) {}

  createWindow(componentSelector: string) : void
  {
    console.log('Hypershell::createWindow() -> called with :', componentSelector);

    if ( !this.availableApps[componentSelector] )
    {
      console.error(`Hypershell::createWindow() -> Component with selector ${componentSelector} not found.`);
      return;
    }

    const componentType = this.availableApps[componentSelector];
    console.log('Hypershell::createWindow() -> componentType :', componentType);

    const factory       = this.resolver.resolveComponentFactory(componentType);
    console.log('Hypershell::createWindow() -> factory :', factory);

    const componentRef  = factory.create(this.injector);
    console.log('Hypershell::createWindow() -> componentRef [factory.create(this.injector)] :', componentRef);

    console.log('Hypershell::createWindow() -> attaching view to appRef');
    this.appRef.attachView(componentRef.hostView);

    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    console.log('Hypershell::createWindow() -> domElem :', domElem);
    console.log('Hypershell::createWindow() -> appending child to #desktop');
    document.querySelector('#desktop')?.appendChild(domElem);
  }

  // Increment the z-index counter
  incrementZIndex() : number
  {
    console.log('Hypershell::incrementZIndex() ->', this.getZIndex());
    this.zIndexCounter++;
    return this.zIndexCounter;
  }

  // Get the current z-index counter
  getZIndex() : number
  {
    return this.zIndexCounter;
  }

  // Set the z-index counter
  setZIndex(zIndex: number) : void { this.zIndexCounter = zIndex; }

  // Create a new window
  createWindow2() : void
  {
    console.log('[stub] Hypershell::createWindow2()');
  }

  // launch(app: string): void
  // {
  //   document.querySelector('#desktop')?.appendChild(document.createElement( this.apps[app] ));
  //   console.log(`[stub] Hypershell::launch(${app})`);
  // }

  isElementInViewport(el: HTMLElement) : boolean
  {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  /**
   * A key-value map of available applications, where the value is the application's raw class,
   * and the key is its alias.
   *
   * This should be used alongside the `createWindow()` method.
   */
  availableApps: Record<string, Type<any>> = {
    'about': AboutComponent,
  };

  getAppsList() : Array<string>
  {
    return Object.keys(this.availableApps);
  }
}
