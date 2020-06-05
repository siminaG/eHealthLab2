import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPatient } from '../models/iPatient';



@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) { }

  public getPatients(): Observable<any> {
      return this.http.get<any>('https://hapi.fhir.org/baseR4/Patient?_format=json&_pretty=true');
  };

  public getEncounters(patient: string): Observable<any> {
    return this.http.get<any>('https://hapi.fhir.org/baseR4/Encounter?', {
      params: {patient}});
  };

  public getCarePlan(patient: string): Observable<any> {
    return this.http.get<any>('https://hapi.fhir.org/baseR4/CarePlan', {
      params: {patient}});
  };

  public getAppointment(patient: string): Observable<any> {
    return this.http.get<any>('https://hapi.fhir.org/baseR4/Appointment', {
      params: {patient}});
  };

  public getAllergyIntolerance (patient: string): Observable<any> {
    return this.http.get<any>('https://hapi.fhir.org/baseR4/AllergyIntolerance', {
      params: {patient}});
  };
}


