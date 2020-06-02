import {Component, OnInit, ViewChild} from '@angular/core';
import {MedicineService} from '../../service/medicine.service';
import {Observable} from 'rxjs';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-medication',
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.css']
})
export class MedicationComponent implements OnInit {
  private medications$: Observable<any>;
  public medicationList: any = [];
  public dataSource: MatTableDataSource<any>;
  public displayedColumns: string[] = ['id', 'codeNR', 'text'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private medicationService:  MedicineService,
              private router: Router) { }

  ngOnInit() {
    this.getMedication();
  }
  public getMedication(){
  this.medications$ = this.medicationService.getMedication();
  this.medications$.subscribe(
    data => {
      console.log(data);
      let medicationData = data.entry;
      medicationData.forEach(medication =>{
        let myMedication = {id: 0, codeNR: '-', text: '-' };
        if(medication.resource.code){
          if(medication.resource.code.coding && medication.resource.code.coding[0]){
            myMedication.id = medication.resource.id;
            myMedication.codeNR = medication.resource.code.coding[0].code;
            myMedication.text = medication.resource.code.coding[0].display;
            this.medicationList.push(myMedication);
          }
        }
        console.log(this.medicationList);
        this.dataSource = new MatTableDataSource<any>(this.medicationList);
        this.dataSource.paginator = this.paginator;
      })
    },
    error => console.log(error)
  )
  }

  btnMenu(path: string) {
    this.router.navigateByUrl('/' + path);
  };
}
