import { Observable } from 'rxjs';
import { MainService } from './../main.service';
import { Component, OnInit } from '@angular/core';
import { Person } from '../person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people$:Observable<Person[]> = new Observable;
  constructor(
    private mainService:MainService
  ) { }

  ngOnInit(): void {

    this.people$ = this.mainService.getPeople();
  }

}