import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { FitmentState } from "../store";
import {
  LoadYears,
  LoadMakes,
  LoadModels,
  LoadTrims,
} from "../store/actions/vehicle.action";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import Stepper from "bs-stepper";

@Component({
  selector: "app-fitment-container",
  templateUrl: "./fitment-container.component.html",
  styleUrls: ["./fitment-container.component.css"],
})
export class FitmentContainerComponent implements OnInit {
  private stepper: Stepper;
  tireForm: FormGroup;
  fitment$: Observable<FitmentState>;
  years$: string[];
  makes$: string[];
  models$: string[];
  trims$: string[];

  // import the store into the constructor
  constructor(private store: Store<FitmentState>) {}

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector("#stepper1"), {
      linear: false,
      animation: true,
    });
    this.store
      .select((state) => state)
      .subscribe((data) => {
        this.years$ = data.vehicle.years;
        this.makes$ = data.vehicle.makes;
        this.models$ = data.vehicle.models;
        this.trims$ = data.vehicle.trims;
      });

    this.tireForm = new FormGroup({
      years: new FormControl("", [Validators.required]),
      makes: new FormControl("", [Validators.required]),
      models: new FormControl("", [Validators.required]),
      trims: new FormControl("", [Validators.required]),
    });

    this.getYears();
  }

  next() {
    this.stepper.next();
  }

  onChangeYear(e) {
    if (e.target.value) {
      const action = new LoadMakes({ year: e.target.value });
      this.store.dispatch(action);
    }
    this.makes$ = [];
    this.models$ = [];
    this.trims$ = [];
  }

  onChangeMake(e) {
    if (e.target.value) {
      const action = new LoadModels({ make: e.target.value });
      this.store.dispatch(action);
    }
    this.models$ = [];
    this.trims$ = [];
  }

  onChangeModel(e) {
    if (e.target.value) {
      const action = new LoadTrims({ model: e.target.value });
      this.store.dispatch(action);
    }
    this.trims$ = [];
  }

  getYears() {
    const action = new LoadYears();
    this.store.dispatch(action);
    this.makes$ = [];
    this.models$ = [];
    this.trims$ = [];
  }

  submit() {
    alert(
      "You have selected following things Year = " +
        this.tireForm.getRawValue().years +
        ", Make = " +
        this.tireForm.getRawValue().makes +
        ", Model = " +
        this.tireForm.getRawValue().models +
        ", Trim = " +
        this.tireForm.getRawValue().trims
    );
    this.tireForm.reset();
    this.stepper.reset();
  }
  // Year
  // https://6080be3273292b0017cdbf2a.mockapi.io/years

  // Make with year (2021)
  // https://6080be3273292b0017cdbf2a.mockapi.io/makes

  // Model with year and make (Acura)
  // https://6080be3273292b0017cdbf2a.mockapi.io/models

  // Trim with year, make, model (RDX)
  // https://6080be3273292b0017cdbf2a.mockapi.io/trim
}
