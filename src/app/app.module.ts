import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { firebaseConfig } from './core/firebase.config';

import { AddCardUserComponent } from './add-card-user/add-card-user.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { getAuth, provideAuth } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent, AddCardUserComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    // add this
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
