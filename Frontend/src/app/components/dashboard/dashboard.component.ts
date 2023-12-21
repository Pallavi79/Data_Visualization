import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  jsonData: any = {};
  masterOptionList: any = {};

  loadingStatus: boolean = false;

  selectedTopic: any = '';
  selectedEnd_year: any = '';
  selectedCountry: any = '';
  selectedImpact: any = '';
  selectedInsight: any = '';
  selectedIntensity: any = '';
  selectedLikelihood: any = '';
  selectedPestle: any = '';
  selectedRegion: any = '';
  selectedRelevance: any = '';
  selectedSector: any = '';
  selectedSource: any = '';
  selectedStart_year: any = '';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.filterOptionList().subscribe((data) => {
      this.masterOptionList = data.data;
    });

    this.fetchData();
  }

  fetchData() {
    const filterCriteria: any = {};
    filterCriteria.topic = this.selectedTopic;
    filterCriteria.end_year = this.selectedEnd_year;
    filterCriteria.country = this.selectedCountry;
    filterCriteria.impact = this.selectedImpact;
    filterCriteria.insight = this.selectedInsight;
    filterCriteria.intensity = this.selectedIntensity;
    filterCriteria.likelihood = this.selectedLikelihood;
    filterCriteria.pestle = this.selectedPestle;
    filterCriteria.region = this.selectedRegion;
    filterCriteria.relevance = this.selectedRelevance;
    filterCriteria.sector = this.selectedSector;
    filterCriteria.source = this.selectedSource;
    filterCriteria.start_year = this.selectedStart_year;

    this.dashboardService.filterData(filterCriteria).subscribe((data) => {
      this.jsonData = data;
    });
  }

  // Function call on filter call logic to be developed here...
  filterApply(event: any, type: any) {
    let value = event.target.value;

    if (type === 'end_year') {
      this.selectedEnd_year = value;
    }
    if (type === 'start_year') {
      this.selectedStart_year = value;
    }
    if (type === 'topic') {
      this.selectedTopic = value;
    }
    if (type === 'country') {
      this.selectedCountry = value;
    }
    if (type === 'impact') {
      this.selectedImpact = value;
    }
    if (type === 'insight') {
      this.selectedInsight = value;
    }
    if (type === 'intensity') {
      this.selectedIntensity = value;
    }
    if (type === 'likelihood') {
      this.selectedLikelihood = value;
    }
    if (type === 'pestle') {
      this.selectedPestle = value;
    }
    if (type === 'region') {
      this.selectedRegion = value;
    }
    if (type === 'relevance') {
      this.selectedRelevance = value;
    }
    if (type === 'sector') {
      this.selectedSector = value;
    }
    if (type === 'source') {
      this.selectedSource = value;
    }

    this.fetchData();
  }
}
