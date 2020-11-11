import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-topic-preview',
  templateUrl: './topic-preview.component.html',
  styleUrls: ['./topic-preview.component.scss']
})
export class TopicPreviewComponent implements OnInit {
  param1: any;
  param2: any;
  topicForm: FormGroup;
  checkError:any;
    mode = 'indeterminate';
    value = 50;
    color = 'primary';
    displayProgressSpinnerInBlock: boolean = false;

    
  publishTopics = ['FWP/exicom/bounce/TCU/<imei>','FWP/exicom/bounce/BMS/<imei>','FWP/exicom/bounce/Config/<imei>',
  'FWP/exicom/sysconfig/<imei>'];

  subscribeTopics = ['FWA/exicom/bounce/TCU/<imei>','FWA/exicom/bounce/BMS/<imei>','FWA/exicom/bounce/Config/<imei>',
  'FWA/exicom/sysconfig/<imei>']

  @ViewChild('closeModal2', { static: true }) closeModal2;
  @ViewChild('openConfirm', { static: true }) openConfirm;
  submitted = false;
  

  constructor(private service: ServiceService,private router: Router,
    private router1: ActivatedRoute, private frmbuilder: FormBuilder, private _snackBar:  MatSnackBar) {
      this.topicForm = this.frmbuilder.group({
        client: ['', [Validators.required,Validators.maxLength(25),Validators.pattern('^[a-z]*$')]]
      });
      
    }

  ngOnInit() {
    this.router1.queryParams.subscribe(
      params => {
        this.param1 = params.client;
        this.param2 = params.name.toLowerCase().replace(/-/g,"").replace(/ /g, "");
        this.topicForm.controls['client'].setValue(this.param2);        
      }
    );
    this.checkError = (controlName: string, errorName: string, checkSubmitted: boolean) => {
      if (checkSubmitted) {
        if (this.submitted) {
          return this.topicForm.controls[controlName].hasError(errorName);
        }
      } else {
        return this.topicForm.controls[controlName].hasError(errorName);
      }
    };
  }

  createTopic(){
    this.displayProgressSpinnerInBlock = true;
    let cname = this.topicForm.controls['client'].value;
    console.log(cname);
    this.service.createTopicByOrgId(this.param1,cname).subscribe(
      _res=> {
        this._snackBar.open("Topic created Successfully!!", "undo" , {
          duration: 2000
        });
        console.log("Topics created");
        alert("Topics Generated");
        this.displayProgressSpinnerInBlock = false;
        this.closeModal2.nativeElement.click();
        // this.router.navigate(['/topic-detail']);
        this.router.navigate(['/topic-detail'], { queryParams: { cid: this.param1 }});
      },
      err=>{
        if(err.status == 'FORBIDDEN'){
          alert("Not allowed");
        }else{
          alert("Error in generating Topics");
        }
        this.displayProgressSpinnerInBlock = false;
        this.closeModal2.nativeElement.click();
        this.router.navigate(['/topic-detail']); 
      }
    );
  }

  isTopicSubmit(){
    this.submitted = true;
    this.topicForm.markAsTouched();
    if(this.topicForm.valid){
      this.openConfirm.nativeElement.click();
    }
  }

  back(){
    this.router.navigate(['/topic-detail']);
  }

}
