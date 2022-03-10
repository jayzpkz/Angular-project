import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { KeyValue } from '@angular/common';

import { Data } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  dataList: Data[];
  data: Data = null;
  clickedID?: number = null; // the ID of the clicked button
  clicked: boolean = false; // checks whether the button was clicked or not // used as toggle flag

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchDataAsPromise();
  }

  /**
   * fetching JSON data from url 'https://jsonplaceholder.typicode.com/users'
   * @returns Subscriber
   */
  fetchDataAsPromise() {
    return this.http.get<Data[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe(data => {
        this.dataList = data;
      });
  }

  /**
   * click function to show the hidden card of information of the user button that was clicked
   * @param event
   */
  onNameClick(event: any) {
    let id = Number(event.target.attributes.id.value);
    if (!this.clicked && this.clickedID !== id) {
      this.clicked = !this.clicked;
    }
    if (this.clickedID === id) {
      this.clicked = !this.clicked;
    }
    this.data = this.showDataById(id);
    this.clickedID = id;
  }


  /* utility function to save the original order of the data inside the object while iterating over it in *ngfor */
  originalOrder = (a: KeyValue<number, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  /**
   * Used to get Data object whith the corresponding id
   * @param id
   * @returns Data object
   */
  showDataById(id: number) {
    return this.dataList.filter(x => x.id === id ? x : null)[0];
  }
}
