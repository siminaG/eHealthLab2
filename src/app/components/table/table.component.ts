import {Component, OnInit, ViewChild} from '@angular/core';
import { PatientsService } from 'src/app/service/patients.service';
import { IPatient } from 'src/app/models/iPatient';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  private patients$: Observable<any>;
  public patientList: IPatient[] = [];
  public displayedColumns: string[] = ['id', 'first_name', 'last_name', 'birthDate', 'button'];
  public dataSource: MatTableDataSource<IPatient>;

  constructor(private patientService: PatientsService, private  router: Router) { }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.getAllPatients();
  }
  public getAllPatients() {
    this.patients$ = this.patientService.getPatients();
    this.patients$.subscribe(
      data => {
        console.log(data);
        let patientData = data.entry;
        patientData.forEach(patient => {
          let myPatient : IPatient = {id: 0, first_name: '', last_name: '', birthDate: ''};
          if(patient.resource.name){
            myPatient.first_name = patient.resource.name[0].family;
            myPatient.last_name = patient.resource.name[0].given[0];
            myPatient.birthDate = patient.resource.birthDate;
            myPatient.id = patient.resource.id;
            this.patientList.push(myPatient);
          }
        });
        console.log(this.patientList);
        this.dataSource = new MatTableDataSource<IPatient>(this.patientList);
        this.dataSource.paginator = this.paginator;
        },
      error => console.log(error)
    );
  }

  public seePatientDetails(patient: IPatient) {
      this.router.navigateByUrl('/details');
      localStorage.setItem('patientId', patient.id.toString());
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  btnMenu(path: string) {
    this.router.navigateByUrl('/' + path);
  };
}
