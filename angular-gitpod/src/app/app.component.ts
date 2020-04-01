import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Unit } from './unit.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  obsUnit: Observable<Unit[]>; //L’observable che sta in attesa dei dati
  data: Unit[];
  postObserver : Observable<Object>;
  postData : Object;
  constructor(private http: HttpClient) { } //Dependency injection
  getUnitList(): void {
    //Qui va sostituito l’url con quello delle vostre api
    this.obsUnit = this.http.get<Unit[]>('https://3000-fe87c347-faca-4920-88c8-0263c32b54c5.ws-eu01.gitpod.io/users');
    //Mi sottoscrivo all’observable e scrivo la arrow function che riceve i dati
    console.log(this.obsUnit.subscribe((data: Unit[]) => {this.data = data;}));
  }
  addUnit(newUnit: HTMLInputElement, newCost: HTMLInputElement, newHitSpeed: HTMLInputElement,newSpeed: HTMLInputElement,newDeployTime: HTMLInputElement,newRange: HTMLInputElement,newTarget: HTMLInputElement,newCount: HTMLInputElement,newTransport: HTMLInputElement,newType: HTMLInputElement,newRarity: HTMLInputElement): boolean {
    let newData: Unit = new Unit(newUnit.value,newCost.value,newHitSpeed.value,newSpeed.value,newDeployTime.value,newRange.value,newTarget.value,newCount.value,newTransport.value,newType.value,newRarity.value);
    let headers =  {headers: new HttpHeaders().set('Content-Type', 'application/json')};
    this.postObserver = this.http.post('https://3000-fe87c347-faca-4920-88c8-0263c32b54c5.ws-eu01.gitpod.io/users/', JSON.stringify(newData),headers)
    this.postObserver.subscribe(data => this.postData = data);
    return false;
  }
}
