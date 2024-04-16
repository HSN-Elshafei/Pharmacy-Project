import { Injectable } from '@angular/core';
import { Drugs } from '../interfaces/drugs.interface';
import { AngularFirestore, AngularFirestoreCollection, QuerySnapshot } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: any;

  constructor(private fs:AngularFirestore,private as:AuthService) { }
  addToCart(data: Drugs) {
    const cartCollectionRef: AngularFirestoreCollection<Drugs> = this.fs.collection('users/' + this.as.userId + '/cart');

    const query = cartCollectionRef.ref.where('name', '==', data.name);

    return query.get().then((querySnapshot: QuerySnapshot<Drugs>) => {
      if (querySnapshot.empty) {
        return cartCollectionRef.add(data);
      } else {
        throw new Error('A drug with the same name already exists in the cart.');
      }
    });
  }
  getCart(){
    return this.fs.collection('users/' + this.as.userId + '/cart').snapshotChanges()
  }

  delete(id:any){
    return this.fs.doc('users/' + this.as.userId + '/cart/'+id).delete()
  }
}
 