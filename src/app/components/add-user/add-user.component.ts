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

  orgList:any[] = [];
  userId:any = 0;
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
    
    //  this.getOrganisationData();    
    this.getUserDetails(this.data.id);
    this.getOrgList();
    this.userForm = this._formBuilder.group({
      // uname: ['', [Validators.required]],
      phone_number: ['', [Validators.required,Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      userType: ['',[Validators.required]]      
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
    obj.phoneNumber = this.userForm.get('phone_number').value;
    obj.email = this.userForm.get('email').value;
    obj.userType = this.userForm.get('userType').value;
    obj.fullName = this.userForm.get('fullName').value;    
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
    }else{
      alert("Please Fill all fields");
    }
  }

  getUserDetails(id: number) {
    
    this.userDetailsSub = this.service.getUserDetails(id)
      .subscribe(res => {
        console.log(res);
        this.usereditObject = res.result;
        this.userId= res.result.id;

        let userType;
        if(res.result.userType == null){
          userType = "";
        }else{
          userType = res.result.userType;
        }

        this.userForm.patchValue({          
          phone_number: res.result.phoneNumber,
          email: res.result.email,          
          userType: userType,
          fullName: res.result.fullname
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

  getOrgList(){
    this.service.getOrganisationData().subscribe(
      res=> {        
        this.orgList = res;
        console.log(this.orgList);
      }
    )
  }

  ngOnDestory() {
    this.userDetailsSub.unsubscribe();
  }

}
