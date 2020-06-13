import { Injectable } from '@angular/core';
import { Message } from '../models/message';

import{ AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private allMessages: Observable<Message[]>;

  //collection of obj <---> database  
  messageCollection: AngularFirestoreCollection<Message>;

  constructor(private fb: AngularFirestore) {
    this.messageCollection = fb.collection<Message>('messages')

    this.retrieveMessages();
   }

  public saveMessage(message){
    //push to db
    var item = Object.assign({}, message);
    this.messageCollection.add(item); //<- save to db
  }

  private retrieveMessages(){
    this.allMessages= this.messageCollection.valueChanges(); 
  }
  
  public getAllMessages(){
    
    this.retrieveMessages();//
    return this.allMessages;
  }
}
