import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Housinglocation } from '../housinglocation';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule,RouterModule],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
        crossorigin
      />
      <a [routerLink]="['/']"><h2 class="listing-heading">{{ housingLocation.name }}</h2></a>
      <p class="listing-location">{{ housingLocation.city }}, {{ housingLocation.state }}</p>
      <a [routerLink]="['/details',housingLocation.id]" >Learn More!!</a>
    </section>
  `,
  styles: ``
})
export class HousingLocationComponent {

  @Input() housingLocation!: Housinglocation;
}
