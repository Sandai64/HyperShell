import { DatePipe, SlicePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Hypershell } from '../../lib/shell';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-taskbar',
  standalone: true,
  imports: [DatePipe, LucideAngularModule, SlicePipe, UpperCasePipe],
  templateUrl: './taskbar.component.html',
})
export class TaskbarComponent implements OnInit
{
  constructor (
    protected readonly hypershell : Hypershell,
  ) {}

  date : Date = new Date();

  ngOnInit() : void
  {
    setInterval(() => { this.date = new Date(); }, 1000);
  }
}
