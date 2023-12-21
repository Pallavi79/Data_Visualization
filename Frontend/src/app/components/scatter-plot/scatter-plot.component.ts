// scatter-plot.component.ts
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter-plot',
  template: '<div #scatterPlot></div>',
  styleUrls: ['./scatter-plot.component.css'],
})
export class ScatterPlotComponent implements OnInit, OnChanges {
  @Input() data: any;

  @ViewChild('scatterPlot', { static: true })
  private chartContainer!: ElementRef;

  private margin = { top: 20, right: 20, bottom: 50, left: 60 }; // Increased bottom margin for axis labels
  private width: number;
  private height: number;
  private svg: any;
  private xScale: any;
  private yScale: any;

  private xAxisName: string = 'Intensity';
  private yAxisName: string = 'Relevance';

  constructor() {
    this.width = 500 - this.margin.left - this.margin.right; // Increased width
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit(): void {
    this.createScatterPlot();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChart();
    }
  }

  private updateChart() {
    // Check if data is defined and has length
    if (!this.data) {
      return;
    }

    // Update scales and axes
    this.xScale.domain([0, d3.max(this.data, (d: any) => d.intensity)]).nice();
    this.yScale.domain([0, d3.max(this.data, (d: any) => d.relevance)]).nice();

    // Update x-axis
    this.svg.select('.x.axis').call(d3.axisBottom(this.xScale));

    // Update x-axis label
    this.svg
      .select('.x.label')
      .attr('x', this.width / 2)
      .attr('y', this.height + this.margin.top + 20) // Adjust label position
      .style('text-anchor', 'middle')
      .text(this.xAxisName);

    // Update y-axis
    this.svg.select('.y.axis').call(d3.axisLeft(this.yScale));

    // Update y-axis label
    this.svg
      .select('.y.label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -this.height / 2)
      .attr('y', -this.margin.left + 15) // Adjust label position
      .style('text-anchor', 'middle')
      .text(this.yAxisName);

    // Update circles for each data point
    const circles = this.svg.selectAll('circle').data(this.data);

    circles
      .enter()
      .append('circle')
      .attr('r', 5)
      .merge(circles)
      .attr('cx', (d: any) => this.xScale(d.intensity))
      .attr('cy', (d: any) => this.yScale(d.relevance));

    circles.exit().remove();
  }

  private createScatterPlot() {
    // Set up scales
    this.xScale = d3.scaleLinear().range([0, this.width]);
    this.yScale = d3.scaleLinear().range([this.height, 0]);

    // Create SVG container
    this.svg = d3
      .select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width + this.margin.left + this.margin.right)
      .attr('height', this.height + this.margin.top + this.margin.bottom)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.margin.left + ',' + this.margin.top + ')'
      );

    // Add x-axis
    this.svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(this.xScale));

    // Add x-axis label
    this.svg
      .append('text')
      .attr('class', 'x label')
      .attr('x', this.width / 2)
      .attr('y', this.height + this.margin.top + 20) // Adjust label position
      .style('text-anchor', 'middle')
      .text(this.xAxisName);

    // Add y-axis
    this.svg.append('g').attr('class', 'y axis').call(d3.axisLeft(this.yScale));

    // Add y-axis label
    this.svg
      .append('text')
      .attr('class', 'y label')
      .attr('transform', 'rotate(-90)')
      .attr('x', -this.height / 2)
      .attr('y', -this.margin.left + 15) // Adjust label position
      .style('text-anchor', 'middle')
      .text(this.yAxisName);

    this.updateChart();
  }
}
