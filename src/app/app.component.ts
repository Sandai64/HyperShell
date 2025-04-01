import { Component } from '@angular/core';
import { WindowComponent } from './components/window/window.component';
import { Hypershell } from './lib/shell';
import { TaskbarComponent } from './components/taskbar/taskbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [WindowComponent, TaskbarComponent, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent
{
  // Expose for template
  Object = Object;

  constructor(public readonly shell: Hypershell) {}
}
