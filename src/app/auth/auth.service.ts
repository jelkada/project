
import * as firebase from 'firebase';
import {Subject} from 'rxjs';

export class AuthService {

  token = null;
  signinStatus = new Subject<boolean>();

  registerUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then( res => console.log(res) )
      .catch( error => console.log(error) );
 }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then( res => {
        firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              this.token = token;
              this.signinStatus.next(true);
              // console.log('signinUser(): this.token: ', this.token);
            }
          );
      })
      .catch( error => {
        console.log(error);
        this.signinStatus.next(false);

      });
  }

  getToken() {
    // firebase.auth().currentUser.getIdToken()
    //   .then(
    //    (token: string) => this.token = token
    //    );
    // console.log('getToken(): after: this.token: ', this.token);
    return this.token;
  }

  isAuthenticated(): boolean {
   return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }

}
