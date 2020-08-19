import { Component, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../service.service';
import { ValueModel } from '../value-model';


@Component({
    selector: 'app-asset-model-view',
    templateUrl: './asset-model-view.html'

})

export class AssetModelView {

    constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute,private assetService : ServiceService) {

     }
    orgForm: FormGroup;

    selectedTab = 1;
    tab1 = 1;
    tab2 = 2;
    tab3 = 3;
    tab4 = 4;
    tab5 = 5;

    batteries : any;
    valueModel : ValueModel;

    activeTab(tabNumber: number) {
        this.selectedTab = tabNumber;
    }

    ngOnInit() {
        this.orgForm = this._formBuilder.group({
            orgName: ['', Validators.required],
            orgType: ['', Validators.required],
            organisationCode: ['', Validators.required],
            isAnonymous: ['', Validators.required],
            fota: ['', [Validators.required]],
            topic: ['', Validators.required],
            country: ['', Validators.required],
            city: ['', [Validators.required]],
            email: ['', [Validators.required]],
            contactNo: ['', [Validators.required]]
        });

         // console.log(console.log(history.state));
        this.route.queryParams .subscribe(params => {
          console.log(params); // {order: "popular"}
          this.viewAssets(params.columnValue);
        });

    }

    viewAssets(modelName : String){
      this.assetService.getBatterModelByName(modelName).subscribe(
        res => {
          this.batteries = res.batteryDesc;
          console.log(res);
        }
      )
    }

    getOldV(index: number){
      this.valueModel.oldValue = this.batteries[index].variableValue;
      console.log(this.valueModel.oldValue);
    }


    onSubmit(orgForm) {

        console.log(this.orgForm.value);


    }

}
