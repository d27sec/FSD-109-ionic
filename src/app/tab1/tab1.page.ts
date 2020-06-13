import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  messagesToDisplay: Message[];

  constructor(private data: DataService) {
    this.data.getAllMessages().subscribe( list =>{
      this.messagesToDisplay=list;
    });
  }



  ngOnInit(){
    //only called once
  }

  
}
