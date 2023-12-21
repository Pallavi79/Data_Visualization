import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  fetchData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/v1/dashboard`);
  }
  filterData(filterCriteria: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/v1/filter`, filterCriteria);
  }
  filterOptionList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/v1/optionlist`);
  }
}
