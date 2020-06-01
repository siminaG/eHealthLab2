import { Component, OnInit } from '@angular/core';
import {PatientsService} from '../../service/patients.service';
import {IPatient} from '../../models/iPatient';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  // public patient: IPatient = {id: 0, first_name: '', last_name: '', birthDate: ''};
  public patientEncounter: string = '';
  public patientCarePlan: string = 'n/a';
  public patientAppointment: string = '';
  public patientAllergyIntolerance: string = '';
  constructor(private patientsService: PatientsService) { }

  ngOnInit() {
    const patientId: string = localStorage.getItem('patientId');
    this.getEncountersDetails(patientId);
    this.getCarePlan(patientId);
    this.getAppointmentDetails(patientId);
  }

   public getEncountersDetails(patientId: string) {

    this.patientsService.getEncounters(patientId).subscribe(
      data => {
        console.log("Encounter: ", data);
        let dataEncounters = data.entry;
        dataEncounters.forEach(encounter => {
          this.patientEncounter = encounter.resource.period.start;
        });
        console.log(this.patientEncounter);
      },
      error => {console.log(error)}
    );
   }
//TODO: appoinment and allergies
   public getAppointmentDetails(patientId: string) {

    this.patientsService.getAppointment(patientId).subscribe(
      data => {
        console.log("Appointment: ", data);
        // let dataEncounters = data.entry;
        // dataEncounters.forEach(encounter => {
        //   this.patientEncounter = encounter.resource.period.start;
        // });
        // console.log(this.patientEncounter);
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
}
