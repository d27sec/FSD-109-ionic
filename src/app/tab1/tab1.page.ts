import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Message } from '../models/message';
import { ShareService } from '../services/share.service';
import { Friend } from '../models/friend';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  model: Message= new Message();

  messagesToDisplay: Message[];


  constructor(private data: DataService, private shared: ShareService){
    this.data.getAllMessages().subscribe( list =>{
      this.messagesToDisplay=[];
      this.messagesToDisplay = list.filter(message => 
        message.from == shared.userName || message.to == shared.userName || message.to == 'Everyone')
        

        //sort by date

        this.messagesToDisplay = this.messagesToDisplay.sort(function(a,b){
          if(a.createdOn < b.createdOn){
            return -1
          }
          else if(a.createdOn > b.createdOn){
            return 1
          }
          return 0
        }
      );
    });





  }



  ngOnInit(){
    //only called once
  }

  
}
