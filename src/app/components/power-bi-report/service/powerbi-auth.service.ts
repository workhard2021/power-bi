import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PowerbiService {
  
  urlReport:string="https://api.powerbi.com/v1.0/myorg/GenerateToken"
  constructor(private readonly http: HttpClient) {}

  getPowerBiReport(data:any,accessToken:string): Observable<any> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    });
    return this.http.post<any>(this.urlReport, data, { headers: headers });
  }
}
