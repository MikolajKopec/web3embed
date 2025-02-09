import {AfterViewInit, Component, Inject, input, OnInit, PLATFORM_ID} from '@angular/core';
import {TimelineEntry} from '@omnedia/ngx-timeline';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-timeline',
  standalone: false,
  templateUrl: './timeline.component.html',
  styleUrl: './timeline.component.css'
})
export class TimelineComponent implements OnInit {
  readonly timelineStyle = input<'classic' | 'switch'>('switch')
  readonly timelineData = input<TimelineEntry[]>([
    {title: '<h1>2025</h1>', content: "TEST CONTENT"}, {title: 'Test', content: "TEST CONTENT"}
  ])
  isBrowser: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
}
