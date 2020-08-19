import { TestBed } from '@angular/core/testing';

import { PlotlyChartService } from './plotly-chart.service';

describe('PlotlyChartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlotlyChartService = TestBed.get(PlotlyChartService);
    expect(service).toBeTruthy();
  });
});
