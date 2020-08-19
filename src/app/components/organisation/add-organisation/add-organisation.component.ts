import { Component, OnInit, Input, Inject, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from 'src/app/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-organisation',
  templateUrl: './add-organisation.component.html',
  styleUrls: ['./add-organisation.component.scss']
})
export class AddOrganisationComponent implements OnInit {
  orgForm: FormGroup;
  loading = false;
  submitted = false;

  /* Get OrgId to open with  details */
  id: number;

  /* Spinner variable */
  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;




  orgeditObject: any;
  selectedFile: File
  private base64textString: String = "";

  constructor(private _formBuilder: FormBuilder,
    private _router: Router, private service: ServiceService, private sanitizer: DomSanitizer,
    public dialogRef: MatDialogRef<AddOrganisationComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {



  }

  ngOnInit() {


    if (this.data.id != null) {
      this.getOrgDetails(this.data.id);
    }


    this.orgForm = this._formBuilder.group({
      orgName: ['', Validators.required],
      orgType: ['', Validators.required],
      organisationCode: ['', Validators.required],
      isAnonymous: ['', []],
      fota: ['', []],
      topic: ['', []],
      country: ['', [Validators.required]],
      city: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      logourl: ['', []]
    });
  }

  onSubmit(orgForm) {
    if (this.orgForm.valid) {

      this.displayProgressSpinnerInBlock = true;
      let obj: any = {};
      if (this.orgeditObject != null && this.orgeditObject != undefined) {
        obj.id = this.orgeditObject.id;
      }
      //  obj = this.orgeditObject;

      obj.orgName = this.orgForm.get('orgName').value;
      obj.orgType = this.orgForm.get('orgType').value;
      obj.organisationCode = this.orgForm.get('organisationCode').value;
      obj.topic = this.orgForm.get('topic').value;
      obj.orgImg = this.base64textString;
      obj.anonymous = this.orgForm.get('isAnonymous').value;
      obj.contactNo = this.orgForm.get('contactNo').value;
      obj.email = this.orgForm.get('email').value;
      obj.country = this.orgForm.get('country').value;
      obj.city = this.orgForm.get('city').value;
      obj.fota = this.orgForm.get('fota').value;
      obj.imgUrl = this.orgForm.get('logourl').value;
      this.service.saveOrgDetails(obj)
        .subscribe(res => {
         
          alert("save Successfully !!!!")
          this.dialogRef.close();
          this.displayProgressSpinnerInBlock = false;


        }, (err) => { console.log(err.error); alert(err.error.error);
          this.displayProgressSpinnerInBlock = false;
        })
    }
  }



  imgPath: any;
  url: any;

  onFileChanged(event) {
    var files = event.target.files;
    var file = files[0];
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]); // read file as data url
    reader.onload = (event: Event) => {  /* called once readAsDataURL is completed*/
      let target: any = event.target; /* This (any) will tell compiler to shut up! */
      this.url = target.result;
    }

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    console.log(btoa(binaryString));
  }

  getOrgDetails(id: number) {
    this.service.getOrgDetails(id)
      .subscribe(res => {
        console.log(res);
        this.orgeditObject = res;
        this.base64textString = res.orgImg;
        var base64Image = 'data:image/png;base64,' + res.orgImg;
        this.url = this.transform(base64Image);

        this.orgForm.get('orgName').setValue(res.orgName);
        this.orgForm.get('orgType').setValue(res.orgType);
        this.orgForm.get('organisationCode').setValue(res.organisationCode);
        this.orgForm.get('isAnonymous').setValue(res.anonymous);
        this.orgForm.get('fota').setValue(res.fota);
        this.orgForm.get('topic').setValue(res.topic);
        this.orgForm.get('city').setValue(res.city);
        this.orgForm.get('email').setValue(res.email);
        this.orgForm.get('contactNo').setValue(res.contactNo);
        this.orgForm.get('logourl').setValue(res.imgUrl);
        this.orgForm.get('country').setValue(res.country);

        // this.orgForm.patchValue({orgName: res.orgName, organisationCode: res.organisationCodees});


        /*  this.orgForm = this._formBuilder.group({
           orgName: [res.orgName],
           orgType: [res.orgType],
           organisationCode: [res.organisationCode],
           isAnonymous: [res.anonymous],
           fota: [true],
           topic: [res.topic],
           country: [res.country],
           city: [res.city],
           email: [res.email],
           contactNo: [res.contactNo],
           logourl:[res.imgUrl]
 
         });
  */
      })

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  @HostListener('window:keyup.esc') onKeyUp() {
    this.dialogRef.close();
  }


  transform(base64Image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
}


interface interfaceOrg {
  id: number,
  orgName: string,
  orgtype: String,
  organisationCode: string,
  topic: string,
  active: boolean,
  city: string,
  country: string,
  createdBy: number,
  createdDate: Date,
  fota: string,
  contactNo: string,
  isAnonymous: boolean,
  email: string
}

