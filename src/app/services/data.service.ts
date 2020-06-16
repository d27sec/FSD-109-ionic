import { Injectable } from '@angular/core';
import { Message } from '../models/message';
import { map } from 'rxjs/operators'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';
import { firestore } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allMessages: Observable<Message[]>;
  private allFriends: Observable<Friend[]>;

  //collection of obj <---> database  
  messageCollection: AngularFirestoreCollection<Message>;
  friendCollection: AngularFirestoreCollection<Friend>;

  constructor(private fb: AngularFirestore) {
    this.messageCollection = fb.collection<Message>('messages');
    this.friendCollection = fb.collection<Friend>('friends')

    this.retrieveMessages();
  }

  public saveMessage(message) {
    //push to db
    var item = Object.assign({}, message);
    this.messageCollection.add(item); //<- save to db
  }

  public saveFriend(friend) {
    var item = Object.assign({}, friend);
    this.friendCollection.add(item);
  }

  private retrieveMessages() {
    this.allMessages = this.messageCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(m => {
          var data = m.payload.doc.data();
          var theirDate: any = data.createdOn;  // custom date formated used by firebase
          data.createdOn = new firestore.Timestamp(theirDate.seconds, theirDate.nanoseconds).toDate(); // JS Date format
          return {... data}; // return a copy of
        });
      })
    );
  }



  private retrieveFriends() {
    this.allFriends = this.friendCollection.valueChanges();
  }

  public getAllMessages() {

    this.retrieveMessages();//
    return this.allMessages;
  }

  public getAllFriends() {
    this.retrieveFriends();
    return this.allFriends;
  }


}
