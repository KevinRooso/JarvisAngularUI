import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  private base64textString: String = "";
  url: any;
  usereditObject: any;

  org_List: Observable<any[]>;
  userId:any;
  status:any;

  submitResponse: any = true;
  userTypeList: any = [
    { "roleName": "Admin", "roleValue": 1 },
    { "roleName": "User", "roleValue": 2 },
    { "roleName": "Guest", "roleValue": 3 }
  ]
  userDetailsSub: Subscription;

  /* Spinner variable */
  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;


  // tslint:disable-next-line:variable-name
  constructor(private _formBuilder: FormBuilder, private service: ServiceService, @Inject(MAT_DIALOG_DATA) public data,
    private sanitizer: DomSanitizer, public dialogRef: MatDialogRef<AddUserComponent>) {

  }

  ngOnInit() {

    this.org_List = this.service.getOrganisationData();
    //  this.getOrganisationData();
    this.getUserDetails(this.data.id);
    this.userForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      phone_number: ['', [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      image_name: [''],
      user_image: [''],
      userType: [''],
      city: ['', [Validators.required]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      country: ['', [Validators.required]],
      password: ['', [Validators.required]],
      orgId: ['', [Validators.required]]
    });
  }

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
  onSubmit(userForm: any) {
    if(this.userForm.valid){

  

    this.displayProgressSpinnerInBlock = true;
    let obj: any = {};

    obj.id = this.userId;
    obj.active =this.status;
    obj.username = this.userForm.get('username').value;
    obj.phoneNumber = this.userForm.get('phone_number').value;
    obj.email = this.userForm.get('email').value;
    obj.imageName = this.userForm.get('image_name').value;
    obj.userImage = this.base64textString;
    obj.userType = this.userForm.get('userType').value;
    obj.city = this.userForm.get('city').value;
    obj.pincode = this.userForm.get('pincode').value;
    obj.country = this.userForm.get('country').value;
    obj.password = this.userForm.get('password').value;
    obj.orgId = this.userForm.get('orgId').value;
    console.log(obj);
    this.service.saveUserDetails(obj)
      .subscribe(res => {
        console.log(res);
        alert("save Successfully !!!!")
        this.dialogRef.close();
        this.displayProgressSpinnerInBlock = false;

      },error=>{
        alert("Not Save Please Try Again !!!!")
        this.displayProgressSpinnerInBlock = false;
      })
    }
  }

  getUserDetails(id: number) {
    
    this.userDetailsSub = this.service.getUserDetails(id)
      .subscribe(res => {
        console.log(res);
        this.usereditObject = res.result;
        this.userId= res.result.id;
        this.status= res.result.active;
        this.base64textString = res.result.userImage;
        var base64Image = 'data:image/png;base64,' + res.result.userImage;
        this.url = this.transform(base64Image);

        this.userForm.patchValue({
          username: res.result.username,
          phone_number: res.result.phoneNumber,
          email: res.result.email,
          image_name: res.result.imageName,
          user_image: res.result.userImage,
          userType: res.result.userType,
          city: res.result.city,
          pincode: res.result.pincode,
          country: res.result.country,
          password:  res.result.password,
          orgId:  res.result.orgId

        });


       /*  this.userForm = this._formBuilder.group({
          username: [res.result.username],
          phone_number: [res.result.phoneNumber],
          email: [res.result.email],
          image_name: [res.result.imageName],
          user_image: [res.result.userImage],
          userType: [res.result.userType],
          city: [res.result.city],
          pincode: [res.result.pincode],
          country: [res.result.country],
          password: new FormControl({ value: res.result.password, disabled: true }),
          orgId: new FormControl({ value: res.result.orgId, disabled: true })
        });
 */
      })

  }
  transform(base64Image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64Image);
  }
  closeDialog() {
    this.dialogRef.close();
  }



  ngOnDestory() {
    this.userDetailsSub.unsubscribe();
  }

}
