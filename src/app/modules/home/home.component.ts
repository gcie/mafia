import { Component } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  collection: Observable<unknown[]> = new BehaviorSubject([]);

  constructor(public auth: AuthService) {
    // this.collection = this.fireStore.collection('test').valueChanges().pipe(tap(console.log));
  }

  test() {
    // this.fireAuth.currentUser.then(console.log);
    // this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  logout() {
    this.auth.signOut().subscribe(console.log);
  }
}
