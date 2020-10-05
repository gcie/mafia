import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  collection: Observable<unknown[]> = new BehaviorSubject([]);

  constructor(public auth: AuthService) {
    // this.collection = this.fireStore.collection('test').valueChanges().pipe(tap(console.log));
  }

  test() {
    // this.fireAuth.currentUser.then(console.log);
    // this.fireAuth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  ngOnInit() {
    // this.fireAuth.currentUser.then(console.log);
  }

  signInGoogle() {
    this.auth.googleSignIn().subscribe(console.log);
  }

  logout() {
    this.auth.signOut().subscribe(console.log);
  }
}
