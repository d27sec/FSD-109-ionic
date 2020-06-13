import { Injectable } from '@angular/core';
import { Message } from '../models/message';

import{ AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore'
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';


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

  public saveMessage(message){
    //push to db
    var item = Object.assign({}, message);
    this.messageCollection.add(item); //<- save to db
  }

  public saveFriend(friend){
    var item= Object.assign({}, friend);
    this.friendCollection.add(item);
  }

  private retrieveMessages(){
    this.allMessages= this.messageCollection.valueChanges(); 
  }
  

  
  private retrieveFriends(){
    this.allFriends= this.friendCollection.valueChanges();
  }

  public getAllMessages(){
    
    this.retrieveMessages();//
    return this.allMessages;
  }

  public getAllFriends(){
    this.retrieveFriends();
    return this.allFriends;
  }

  
}
