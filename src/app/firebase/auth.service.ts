import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInAnonymously, signInWithEmailAndPassword, signInWithPopup, User, UserCredential } from '@angular/fire/auth';
import { FirestoreService } from './firestore.service';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private auth: Auth, private firestoreService: FirestoreService, private firestore: Firestore) {
    onAuthStateChanged(this.auth, (user) => {
      this.currentUserSubject.next(user);
    });
  }

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  async loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential = await signInWithPopup(this.auth, provider);
      const user = userCredential.user;

      if (user) {
        const userData = {
          email: user.email || '',
          fullName: user.displayName || '',
          user: user.uid,
        };
        await this.firestoreService.saveUserData(user.uid, userData);
      }

      return userCredential;
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      throw error;
    }
  }

  async loginAsGuest(): Promise<UserCredential> {
    try {
      const userCredential = await signInAnonymously(this.auth);
      const user = userCredential.user;

      if (user) {
        const userDoc = doc(this.firestore, 'users', user.uid);
        await setDoc(userDoc, {
          fullName: 'Invitado',
          email: null,
          user: user.uid,
        });
      }

      return userCredential;
    } catch (error) {
      console.error('Error al iniciar sesión como invitado:', error);
      throw error;
    }
  }

  isGuestUser(): boolean {
    const currentUser = this.currentUserSubject.getValue();
    return currentUser?.isAnonymous || false;
  }

  async logout(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  async resetPassword(email: string) {
    try {
      if (email) {
        await sendPasswordResetEmail(this.auth, email);
        return 'Correo de restablecimiento enviado';
      } else {
        throw new Error('No se encontró el correo electrónico del usuario');
      }
    } catch (error) {
      console.error('Error al restablecer la contraseña:', error);
      throw error;
    }
  }

  async register(fullName: string, email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      if (user) {
        const userDoc = doc(this.firestore, 'users', user.uid);
        await setDoc(userDoc, {
          fullName,
          email,
          user: user.uid,
        });
      }
      return userCredential;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.getValue();
  }

  GenError(tipo: any){
    let error: string = '';
    switch (tipo.code) {
      case 'auth/email-already-in-use':
        error = 'El correo electrónico ya está en uso';
        break;
      case 'auth/invalid-email':
        error = 'El correo electrónico no es válido';
        break;
      case 'auth/user-not-found':
        error = 'Usuario no encontrado';
        break;
      case 'auth/wrong-password':
        error = 'Contraseña incorrecta';
        break;
      case 'auth/network-request-failed':
        error = 'Error de red. Verifique su conexión a internet';
        break;
      case 'auth/invalid-credential':
        error = 'Credenciales inválidas';
        break;
      default:
        error = 'Error: ' + tipo.message;
    }
    return error;
  }

}
