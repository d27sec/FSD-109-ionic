import { Component } from '@angular/core';
import { Friend } from '../models/friend';
import { ShareService } from '../services/share.service';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  model = new Friend();
  friendsToDisplay: Friend[] = [];

  constructor(private shared: ShareService, private data: DataService) {
    this.data.getAllFriends().subscribe(list => {
      //filter to get only my friends 



      this.friendsToDisplay = list.filter(friend => this.shared.userName == friend.friendOf)

      //hw this.friendsToDisplay = list.filter(...)
      //---------------------array filter hw--------------------------
      console.log()
    });
  }

  saveFriend() {
    this.model.friendOf = this.shared.userName;

    console.log('saving friend', this.model);

    this.data.saveFriend(this.model);

    this.model = new Friend();



  }

}
