import { Component } from '@angular/core';
import { Message } from '../models/message';
import { ShareService } from '../services/share.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  model: Message= new Message();
  
  constructor(private shared: ShareService, private data: DataService) {}
  
  post(){
    this.model.from = this.shared.userName;
    console.log(this.model)
    //save fn on dataService
    this.data.saveMessage(this.model);
    console.log('saved', this.model);

    this.model = new Message();
  }
}
