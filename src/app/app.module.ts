import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"tareapp-c468e","appId":"1:227327226891:web:61eed8ab87e6d1e886030e","storageBucket":"tareapp-c468e.firebasestorage.app","apiKey":"AIzaSyDHnDfa4-xAOdQ0sTYaTmFtbQznAR9hjUY","authDomain":"tareapp-c468e.firebaseapp.com","messagingSenderId":"227327226891","measurementId":"G-1CX2ZEN914"})), provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()), ScreenTrackingService, UserTrackingService, provideFirestore(() => getFirestore())],
  bootstrap: [AppComponent],
})
export class AppModule {}
