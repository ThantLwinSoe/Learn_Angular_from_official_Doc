import { CommonModule } from '@angular/common';
import { Component,inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,HousingLocationComponent],
  template: `
    <section>
      <form>
          <input type="text" placeholder="Filter by city" #filter/>
          <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
          <!-- <label for="">{{filter.value}}</label> -->
        </form>
        
    </section>
    <section class="results">
      <app-housing-location 
      *ngFor="let houseLocation of filteredLocationList"
      [housingLocation]="houseLocation"></app-housing-location>
    </section>
  `,
  styleUrls: [`./home.component.css`],
})
export class HomeComponent {

  houseLocationList : Housinglocation[] = [];
  housingService : HousingService = inject(HousingService);
  filteredLocationList : Housinglocation[] = [];

  constructor() {
    this.housingService.getAllHousingLocations()
    .then( (housingLocList : Housinglocation[]) => {
      this.houseLocationList = housingLocList;
      this.filteredLocationList = this.houseLocationList;
    })
  }

  filterResults( text : string) {
    
    if(!text) {
      this.filteredLocationList = this.houseLocationList;
      return;
    }

    this.filteredLocationList = this.houseLocationList
    .filter( (housingLoction) => housingLoction?.city.toLowerCase().includes(text.toLowerCase()) );
    console.log(this.houseLocationList)
    console.log(this.filteredLocationList)
  }

 }

