import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Location} from '@angular/common';

import {
  debounceTime,
  tap,
  switchMap,
  finalize,
  startWith,
  map
} from "rxjs/operators";

import { ServiceService } from "src/app/service.service";
import { Observable, Subscription, Subject, BehaviorSubject } from "rxjs";
import { Router, NavigationExtras, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-compare-page",
  templateUrl: "./compare-page.component.html",
  styleUrls: ["./compare-page.component.scss"]
})
export class ComparePageComponent implements OnInit {
  b1Control = new FormControl();
  b2Control = new FormControl();
  b3Control = new FormControl();

  b1SelectedValue: string;
  b2SelectedValue: string;
  b3SelectedValue: string;

  options: string[] = [];
  b1options: string[] = [];
  b2options: string[] = [];
  b3options: string[] = [];
  b1filteredOptions: Observable<string[]>;
  b2filteredOptions: Observable<string[]>;
  b3filteredOptions: Observable<string[]>;

  assetsData: Subscription;
  b1: any = {};
  b2: any = {};

  data: any;
  cname: any;
  selectedItem: any;

  constructor(
    private http: HttpClient,
    private service: ServiceService,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private location: Location
  ) {
    
  }

  ngOnInit() {
    this.service.getAllAssets().subscribe(res => {
      console.log(res);
      
      this.data = res;
      this.activatedroute.queryParams.subscribe(params => {
        console.log(params);
        this.cname = params.cname;
        this.selectedItem = params.selectedItem;
        this.b1Control.setValue(params.b1);
        this.b1 = this.dataFilter(params.b1)
      });
      res.map(b => {
        this.options.push(b.bin);
      });
      this.b1options = this.options;
      this.b2options = this.options;
      this.b3options = this.options;
    });
    
    this.b1filteredOptions = this.b1Control.valueChanges.pipe(
      startWith(""),
      map(value => this._b1filter(value))
    );
    this.b2filteredOptions = this.b2Control.valueChanges.pipe(
      startWith(""),
      map(value => this._b2filter(value))
    );
  }

  private _b1filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.b1options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
  private _b2filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.b2options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  getPosts(batteryNumber, event) {
    let navigationExtras: NavigationExtras;
    if (batteryNumber == "b1") {
      this.b1 = this.dataFilter(event);
      console.log(this.b1);
    }
    if (batteryNumber == "b2") {
      this.b2 = this.dataFilter(event);
      console.log(this.b2);
    }

    // this.router.navigate(["/compare"], navigationExtras);
  }

  dataFilter(value) {
    let arr = this.data.filter(obj => obj.bin == value);
    return arr[0];
  }

  Visualize(firstImei, secondImei){
    console.log(firstImei );
    console.log(secondImei );
    
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    //this.assetsData.unsubscribe();
  }
  Back() {
    this.location.back(); // <-- go back to previous location on cancel
  }
}
