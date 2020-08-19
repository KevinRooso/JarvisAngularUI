import { Component, AfterViewInit, ViewChild, ElementRef, OnInit, Input, OnChanges } from '@angular/core';
import { ServiceService } from '../../service.service';


@Component({
  selector: 'app-battery-locate-map',
  templateUrl: './battery-locate-map.html',
  styleUrls: ['./battery-locate-map.scss']
})
export class batteryLocateMap implements OnInit{

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;

  lat: number = 21.146633;
  lng: number = 79.088860;
  @Input() bin: any;
  @Input() cname: any;
 
  /* Spinner variable */
  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;


  longitude: any;
  latitude: any;
  text: any;

  constructor(private service: ServiceService) { }

  newLocation: any[] = []
  ngOnInit(): void {
   console.log(this.bin);


  }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  ngOnChanges(){
    this.mapInitializer();
  }

  mapInitializer() {
    //this.marker.setMap(this.map);
    this.displayProgressSpinnerInBlock = true;
    this.setMarkers(this.map);
    this.service.getBatteryInfoByImei(this.bin)
    .subscribe(res => {

    let  mapOptions: google.maps.MapOptions = {
        center: new google.maps.LatLng(res.result.latitude, res.result.longitude),
        zoom: 10
      };
      this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
         console.log("battery",res);
         this.displayProgressSpinnerInBlock = false;
         this.longitude = res.result.longitude;
         this.latitude = res.result.latitude;
         this.text=  `Customer: ${this.cname} \n BIN : ${res.result.bin}`;
         this.setMarkers(this.map);
       });
  }


  setMarkers(map) {
    // Adds markers to the map.

    // Marker sizes are expressed as a Size of X,Y where the origin of the image
    // (0,0) is located in the top left of the image.

    // Origins, anchor positions and coordinates of the marker increase in the X
    // direction to the right and in the Y direction down.
    var image = {
      url: 'https://maps.gstatic.com/intl/en_ALL/mapfiles/markers2/measle.png',
      // This marker is 20 pixels wide by 32 pixels high.
      size: new google.maps.Size(20, 32),
      // The origin for this image is (0, 0).
      origin: new google.maps.Point(0, 0),
      // The anchor for this image is the base of the flagpole at (0, 32).
      anchor: new google.maps.Point(0, 32)
    };
    // Shapes define the clickable region of the icon. The type defines an HTML
    // <area> element 'poly' which traces out a polygon as a series of X,Y points.
    // The final coordinate closes the poly by connecting to the first coordinate.
    var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly'
    };
    var marker = new google.maps.Marker({
      position: { lat: this.latitude, lng: this.longitude },
      map: map,
      icon: image,
      title: this.text,
      zIndex: 1
    });
    this.displayProgressSpinnerInBlock = false;

  }

}
