import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gaugegraphs',
  templateUrl: './gaugegraphs.component.html',
  styleUrls: ['./gaugegraphs.component.scss']
})
export class GaugegraphsComponent implements OnInit {

  public data: any[] = [];
  public config: any = {
    displaylogo: false
  }
  public layout: any;

  @Input() recentVal: any;
  @Input() gaugeType: any;
  @Input() gaugeTitle: any


  constructor() { }

  ngOnInit() {
    if (this.gaugeType == "bullet") {
      this.layout = {
        height: 50,

        automargin: true,
        margin: { t: 15, b: 0, l: 100, r: 35 }
      };
    }
    else {
      this.layout = {
        autosize: true,
        height: 200,
        width: 270,

        margin: { t: 30, b: 10, l: 50, r: 50 }
      };
    }
  }

  ngOnChanges() {

    console.log('recentVal', this.recentVal);
    console.log('tit', this.gaugeTitle);
    console.log('ty', this.gaugeType);

    if (this.gaugeType == "bullet") {
      this.data = [
        {
          type: "indicator",
          mode: "number+gauge",
          gauge: { shape: "bullet" },
          value: this.recentVal,
          title: {
            text: this.gaugeTitle,
            font: {
              size: 12
            }
          }
        }
      ];
      if (this.gaugeTitle == "Errors") {
        this.data[0].gauge = {
          shape: "bullet",
          // axis:{range:[0,null]},
          axis: { range: [null, 20] },
          // steps: [
          //   { range: [0, 10], color: "#FDEDEC" }
          // ],
          bar: { color: "red" },
          borderwidth: 0,

        },
        this.data[0].number = {
          reference: 300,
          font: { size: 20 }
        }
      }
      if (this.gaugeTitle == "Warnings") {
        this.data[0].gauge = {
          shape: "bullet",
          axis: { range: [null, 20] },
          // steps: [
          //   { range: [0, 10], color: "#FFF" }
          // ],
          bar: { color: "yellow" },
          borderwidth: 0
        },
        this.data[0].number = {
          reference: 300,
          font: { size: 20 }
        }
      }
      if (this.gaugeTitle == "Events") {
        this.data[0].gauge = {
          shape: "bullet",
          axis: { range: [ 0,null] },
          // steps: [
          //   { range: [0, 2000], color: "#AEDFFF" }
          // ],
          bar: { color: "blue" },
          borderwidth: 0,

        },
          this.data[0].number = {
            reference: 300,
            font: { size: 20 }
          }
      }

    }
    else if (this.gaugeType == "speed") {
      this.data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: this.recentVal,
          title: { text: this.gaugeTitle , font: { size: 15 }},
          type: "indicator",
          mode: "gauge+number"
        }
      ];
      if (this.gaugeTitle == "SoH") {
        this.data[0].number = {
          suffix: "%",
          font: { size: 20 }
        };
        this.data[0].gauge = {
          axis: { range: [0, 100] },
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 85
          },
          bar: { color: "rgba(127,255,0,0.6)" }
        };
      }
      if (this.gaugeTitle == "SoC") {
        this.data[0].number = {
          suffix: "%",
          font: { size: 20 }
        }
       
        this.data[0].gauge = {
          axis: { range: [0, 100] },
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 85
          },
          bar: { color: "rgb(255,165,0)" },
        }
      }
      if (this.gaugeTitle == "Current") {
        this.data[0].number = {
          suffix: " A",
          font: { size: 20 }
        };
        this.data[0].gauge = {
          axis: { range: [0, 100] },
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 45
          },
          bar: { color: "rgba(135,206,250,0.8)" },
        }
      }
      if (this.gaugeTitle == "Board Temperature") {
        this.data[0].number = {
          suffix: " &deg;C",
          font: { size: 20 }
        }
        this.data[0].gauge = {
          threshold: {
            line: { color: "red", width: 4 },
            thickness: 0.75,
            value: 65
          },
          bar: { color: "rgba(221,160,221,0.8)" },
        }
      }
    }
  }

}
