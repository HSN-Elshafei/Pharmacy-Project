import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private fs: AngularFirestore) { }
  addUser(id: any, name: any, address: any) {
    return this.fs.doc('users/' + id).set({
      name,
      address
    })
  }
}

