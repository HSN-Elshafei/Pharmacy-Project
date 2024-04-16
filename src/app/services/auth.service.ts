import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId=''
  user:Observable<any>
  constructor(private afAuth:AngularFireAuth) { 
    this.user=afAuth.user
  }
  signup(email:any,password:any){
    return this.afAuth.createUserWithEmailAndPassword(email,password)
  }
  login(email:any,password:any){
    return this.afAuth.signInWithEmailAndPassword(email,password)
  }
  logout(){
    return this.afAuth.signOut()
  }
}
