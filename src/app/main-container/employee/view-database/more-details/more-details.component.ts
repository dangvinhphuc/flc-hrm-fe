import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PositionInfoComponent } from './position-info/position-info.component';

@Component({
  selector: 'app-more-details',
  imports: [NzTabsModule, PositionInfoComponent],
  templateUrl: './more-details.component.html',
  styleUrl: './more-details.component.scss'
})
export class MoreDetailsComponent {

}
