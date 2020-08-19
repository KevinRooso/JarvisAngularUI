import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ServiceService } from 'src/app/service.service';
import * as moment from "moment";

@Component({
  selector: 'app-trace-map',
  templateUrl: './trace-map.component.html',
  styleUrls: ['./trace-map.component.scss']
})
export class TraceMapComponent implements OnInit {

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;

  @Input() assetId: any;
  @Input() pingDate: Date;
  @Input() sDate?: any = null;
  @Input() eDate?: any = null;


  lat = 21.146633;
  lng = 79.088860;

  /* Spinner variable */
  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;

  traceArr:any[] = [];

  mapOptions: google.maps.MapOptions = {
    center: new google.maps.LatLng(this.lat, this.lng),
    zoom: 4
  };

  constructor(private service: ServiceService) { }

  newLocation: any[] = []
  ngOnInit(): void {    
    const startDate = moment(this.pingDate).subtract(6 * 60 * 60, "seconds").format("YYYY-MM-DD HH:mm:ss");
    const endDate = moment(this.pingDate).format("YYYY-MM-DD HH:mm:ss");
    this.displayProgressSpinnerInBlock = true;
    this.service.getTraceMapData(this.assetId,startDate,endDate).subscribe(
      res => {        
        res.forEach(i=>{
          let obj = {
            lat: i.latitude,
            lon: i.longitude
          };
          this.traceArr.push(obj);          
        });
        this.mapInitializer();
        this.displayProgressSpinnerInBlock = false;                
      }      
    );

  }

  ngAfterViewInit() {
    // this.mapInitializer();
    // setTimeout(() => {
      
    // });
  }

  ngOnChanges(){
    this.traceArr = [];
    this.displayProgressSpinnerInBlock = true;
    let startDate;
    let endDate;
    if(this.sDate === null && this.eDate === null){
      startDate = moment(this.pingDate).subtract(6 * 60 * 60, "seconds").format("YYYY-MM-DD HH:mm:ss");
      endDate = moment(this.pingDate).format("YYYY-MM-DD HH:mm:ss");
    }
    else{
      startDate = moment(this.sDate).format("YYYY-MM-DD HH:mm:ss");
      endDate = moment(this.eDate).format("YYYY-MM-DD HH:mm:ss");  
    }
    this.service.getTraceMapData(this.assetId,startDate,endDate).subscribe(
      res => {        
        res.forEach(i=>{
          let obj = {
            lat: i.latitude,
            lon: i.longitude
          };
          this.traceArr.push(obj);
        });
        this.mapInitializer();   
        this.displayProgressSpinnerInBlock = false;             
      }      
    );
  }

  mapInitializer() {    
    
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer();
    let map =  this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    directionsRenderer.setMap(map);
    this.calculateAndDisplayRoute(directionsService, directionsRenderer);
    this.setMarkers(map)

   
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
  }

  calculateAndDisplayRoute(directionsService, directionsRenderer) {

    let flag = false;
    const initial = this.traceArr[0];        
    const final = this.traceArr[this.traceArr.length - 1];    
  
    let waypoints = this.removeDuplicates(this.traceArr);
    
    console.log(waypoints);

    let waypts = [];

    waypoints.forEach(i=>{
      let j = 0;
      let obj = {
        location: new google.maps.LatLng(i.lat,i.lon),
        stopover: false
      };
      waypts[j] = obj;
      j++; 
    });     

    directionsService.route(
      {
        origin: { lat: initial.lat, lng: initial.lon},
        destination: { lat: final.lat, lng:  final.lon },
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: "WALKING"
      },
      function (response, status) {
        if (status === "OK") {
          directionsRenderer.setDirections(response);
         
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }

  removeDuplicates(arr) {
    let result = arr.reduce((unique, o) => {
      if(!unique.some(obj => obj.lat === o.lat && obj.lon === o.lon)) {
        unique.push(o);
      }
      return unique;
  },[]);  
  return result;
  };

}