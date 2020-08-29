import { Component, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-topic-preview',
  templateUrl: './topic-preview.component.html',
  styleUrls: ['./topic-preview.component.scss']
})
export class TopicPreviewComponent implements OnInit {
  param1: any;
  param2: any;

  publishTopics = ['FWP/exicom/bounce/TCU/<imei>','FWP/exicom/bounce/BMS/<imei>','FWP/exicom/bounce/Config/<imei>',
  'FWP/exicom/sysconfig/<imei>'];

  subscribeTopics = ['FWA/exicom/bounce/TCU/<imei>','FWA/exicom/bounce/BMS/<imei>','FWA/exicom/bounce/Config/<imei>',
  'FWA/exicom/sysconfig/<imei>']

  @ViewChild('closeModal2', { static: true }) closeModal2;

  constructor(private service: ServiceService,private router: Router,
    private router1: ActivatedRoute) { }

  ngOnInit() {
    this.router1.queryParams.subscribe(
      params => {
        this.param1 = params.client;
        this.param2 = params.name;        
      }
    );
  }

  createTopic(){
    this.service.createTopicByOrgId(this.param1).subscribe(
      _res=> {
        console.log("Topics created");
        this.closeModal2.nativeElement.click();
        this.router.navigate(['/topic-detail']);        
      }
    );
  }

  back(){
    this.router.navigate(['/topic-detail']);
  }

}
