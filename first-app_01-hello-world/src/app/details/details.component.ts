import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img [src]="housingLocation?.photo" 
      alt="Exterior photo of {{housingLocation?.name}}"
      crossorigin>
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
        <p class="listing-location">{{housingLocation?.city}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available : {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi : {{housingLocation?.wifi}}</li>
          <li>Does this location have laundry: {{housingLocation?.laundry}}</li>
        </ul>
      </section>

      <section class="listing-apply">
        <form [formGroup]="applyForm" (submit)="submitApplication()">

          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="text" formControlName="email">

          <button type="submit" class="primary">Apply Now</button>
          <span [style]="leftGap">
          <button  type="reset" class="primary">Cancel</button>
          </span>
        </form>
      </section>

    </article>
  `,
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {

  leftGap  = 'margin-left : 20px;';

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService : HousingService = inject(HousingService);
  housingLocation : Housinglocation | undefined;

  applyForm = new FormGroup({
    firstName : new FormControl(''),
    lastName : new FormControl(''),
    email : new FormControl(''),
  })


  constructor() {
    const housingLoctionId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLoctionId)
    .then( (houseLoc) => {
      this.housingLocation = houseLoc;
    })
  }

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? '',
    );
  }

}
