import { MouseEvent } from '@agm/core';
import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-live-map',
  templateUrl: './live-map.component.html',
  styleUrls: ['./live-map.component.scss']
})
export class LiveMapComponent implements OnInit, AfterViewInit {


  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;

  lat = 21.146633;
  lng = 79.088860;

  /* Spinner variable */
  mode = 'indeterminate';
  value = 50;
  color = 'primary';
  displayProgressSpinnerInBlock: boolean = false;

  mapOptions: google.maps.MapOptions = {
    center: new google.maps.LatLng(this.lat, this.lng),
    zoom: 4
  };

  constructor(private service: ServiceService) { }

  newLocation: any[] = []
  ngOnInit(): void {  }

  ngAfterViewInit() {
    setTimeout(()=>{
    this.mapInitializer();
  });
  }

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    //this.marker.setMap(this.map);
    this.displayProgressSpinnerInBlock= true;
    this.service.getAllBatteryMapData()
    .subscribe(res => {
      console.log(res);
      this.displayProgressSpinnerInBlock= false;
      this.newLocation = res;
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

    this.newLocation.forEach((element,index) => {
      var marker = new google.maps.Marker({
        position: { lat: element.latitude, lng:  element.longitude},
        map: map,
        icon: image,
        title: `Customer: ${element.org_name} \nBIN: ${element.bin}`,
        zIndex:index
      });
    });
  }

}
