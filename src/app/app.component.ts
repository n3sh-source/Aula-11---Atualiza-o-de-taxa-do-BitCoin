import { Component, VERSION } from '@angular/core';
import { MoedaService } from './moeda.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  intervalo: number;

  constructor(public moedaService: MoedaService) {}

  ngOnInit() {
    this.moedaService.startC();
  }
}
