import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  constructor(private http: HttpClient) { }

  public getMedication(): Observable<any> {
    return this.http.get<any>('https://hapi.fhir.org/baseR4/Medication');
  };
}
