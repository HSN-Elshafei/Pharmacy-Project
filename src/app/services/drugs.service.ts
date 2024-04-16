import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class DrugsService {

  constructor(private fs:AngularFirestore) { }
  getAllDrugs(){
    return this.fs.collection('drugs').snapshotChanges()
  }
}
