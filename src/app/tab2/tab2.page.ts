import { Component } from '@angular/core';
import { Message } from '../models/message';
import { ShareService } from '../services/share.service';
import { DataService } from '../services/data.service';
import { Friend } from '../models/friend';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  model: Message = new Message();
  friendsToDisplay: Friend[] = [];


  constructor(private shared: ShareService, private data: DataService) {
    this.data.getAllFriends().subscribe(list => {

      //---------------------array filter hw--------------------------
      //travel list of friends
      this.friendsToDisplay = list.filter(friend => this.shared.userName == friend.friendOf)
      //hw this.friendsToDisplay = list.filter(...)
      //---------------------array filter hw--------------------------


      //compare if friend.friendOf is equal to my username
      //if so push to friendsToDisplayArray
    })
  }

  post() {
    this.model.from = this.shared.userName;
    console.log(this.model)
    //save fn on dataService
    this.data.saveMessage(this.model);
    console.log('saved', this.model);

    this.model = new Message();
  }
}
