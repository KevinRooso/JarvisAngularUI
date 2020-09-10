import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-firmware',
  templateUrl: './create-firmware.component.html',
  styleUrls: ['./create-firmware.component.scss']
})
export class CreateFirmwareComponent implements OnInit {
  createFirmwareGroup: FormGroup;
  versionArray = ['1.01','1.03','1.04','1.08','1.10'];  
  typeArray = ['TCU','BMS','CFG'];
  nameArray:any[] = [];
  compArray: any[] = [];
  fileUploaded: File;
  fileValid: boolean = false;
  checkError: any;
  submitted = false;

  fwareExists = false;

  @ViewChild('closeModal2', { static: true }) closeModal;  
  @ViewChild('openConfirmButton', { static: true }) confirmButton;  

  constructor(private _formBuilder: FormBuilder,private service: ServiceService,
    private router: Router) {
    this.createFirmwareGroup = this._formBuilder.group({
      cName: ['', Validators.required],
      fType: ['', Validators.required],
      fVersion: ['', Validators.required]      
    });
  }

  ngOnInit() {
    this.getAllClient();

    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.createFirmwareGroup.controls[controlName].hasError(errorName);
        }
      } else {
        return this.createFirmwareGroup.controls[controlName].hasError(errorName);
      }
    };
  }

  uploadedFile(event) {
    this.fileUploaded = event.target.files[0] as File;    
    const fileType = this.fileUploaded.type;
    console.log(fileType);
    if (fileType === 'application/octet-stream' || fileType === 'application/x-sega-cd-rom') {
      this.fileValid = true;      
    }   
  }

  getAllClient(){
    this.service.getOrganisationData().subscribe(
      res=> {
        this.nameArray = res.sort((a,b)=> a.id - b.id);
        console.log(this.nameArray);        
      }
    );
  }

  isFirmwareExist(){
   this.submitted = true;
   if(this.fileValid){   
    if(this.createFirmwareGroup.valid){
    let orgId = this.createFirmwareGroup.controls['cName'].value;
    let type = this.createFirmwareGroup.controls['fType'].value;
    let version = this.createFirmwareGroup.controls['fVersion'].value;
    this.service.firmwareExists(orgId,type,version).subscribe(
      res=>{
        if(res.message === 'exists'){
          this.fwareExists = true;
        }else{
          this.fwareExists = false;
        }
        this.confirmButton.nativeElement.click();        
      }
    );
    }else {
      alert("Please fill all Fields");
    }
   }else{
     alert("Please Upload Valid Firmware Bin");
   }   
  }

  createFirmware(){
    let orgId = this.createFirmwareGroup.controls['cName'].value;
    let type = this.createFirmwareGroup.controls['fType'].value;
    let version = this.createFirmwareGroup.controls['fVersion'].value;
    const formdata = new FormData();
    formdata.append('file',this.fileUploaded);
    this.service.createFirmware(orgId,type,version,formdata).subscribe(
      res=> {
        console.log("created",res);
        this.closeModal.nativeElement.click();
        this.router.navigate(['firmware']);
      }
    );
  }

}
