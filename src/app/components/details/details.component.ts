import { Component, OnInit } from '@angular/core';
import {PatientsService} from '../../service/patients.service';
import {IPatient} from '../../models/iPatient';
import {Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public patientEncounter: string = 'n/a';
  public patientCarePlan: string = 'n/a';
  public patientAppointment: string = 'n/a';
  public patientAllergyIntolerance: string = 'n/a';
  constructor(private patientsService: PatientsService, private router: Router) { }

  ngOnInit() {
    const patientId: string = localStorage.getItem('patientId');
    this.getEncountersDetails(patientId);
    this.getCarePlan(patientId);
    this.getAppointmentDetails(patientId);
    this.getAllergyIntolerance(patientId);
  }

   public getEncountersDetails(patientId: string) {

    this.patientsService.getEncounters(patientId).subscribe(
      data => {
        console.log("Encounter: ", data);
        let dataEncounters = data.entry;
        if(dataEncounters){
          dataEncounters.forEach(encounter => {
            this.patientEncounter = encounter.resource.period.start;
          });
          console.log(this.patientEncounter);
        }
      },
      error => {console.log(error)}
    );
   }

   public getAppointmentDetails(patientId: string) {

    this.patientsService.getAppointment(patientId).subscribe(
      data => {
        console.log("Appointment: ", data);
        if(data.entry){
          let dataAppointment = data.entry;
          dataAppointment.forEach(appointment => {
            if(appointment.resource.description){
              this.patientAppointment = appointment.resource.description;
            }
          });
          console.log(this.patientAppointment);
        }
      },
      error => {console.log(error)}
    );
   }

  public getAllergyIntolerance(patientId: string) {

    this.patientsService.getAllergyIntolerance(patientId).subscribe(
      data => {
        console.log("AllergyIntolerance: ", data);
        if(data.entry){
          let dataAllergyIntolerance = data.entry;
          dataAllergyIntolerance.forEach(allergy => {
            if(allergy.resource.code.coding.display){
              this.patientAllergyIntolerance = allergy.resource.code.coding.display;
            }
          });
          console.log(this.patientAllergyIntolerance);
        }
      },
      error => {console.log(error)}
    );
  }

  public getCarePlan(patientId: string) {
    this.patientsService.getCarePlan(patientId).subscribe(
      data => {
        console.log("Care Plan: ", data);
        let dataCarePlan = data.entry;
        if(dataCarePlan){
          dataCarePlan.forEach(carePlan => {
            if(carePlan.resource.description ){
              if(carePlan.resource.description.text){
                this.patientCarePlan = carePlan.resource.description.text;
              } else {
                this.patientCarePlan = carePlan.resource.description
              }
            }
          });
        }
        console.log(this.patientCarePlan);
      },
      error => {console.log(error)}
    );
  }

  btnMenu(path: string) {
    this.router.navigateByUrl('/' + path);
  };
}
