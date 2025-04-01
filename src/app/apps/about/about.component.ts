import { Component } from '@angular/core';
import { WindowComponent } from '../../components/window/window.component';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [WindowComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent
{
  constructor(public readonly appComponent: AppComponent) {}
}
