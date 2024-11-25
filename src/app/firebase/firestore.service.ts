import { Injectable, Injector  } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, setDoc, where, query } from '@angular/fire/firestore';
import { Tareas } from '../models/Tareas.models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private authService: AuthService;
  constructor(private firestore: Firestore, private auth: Auth, private injector: Injector) {
    setTimeout(() => {
      this.authService = this.injector.get(AuthService);
    });
  }

  async saveUserData(uid: string, userData: { email: string; fullName: string; user: string }): Promise<void> {
    try {
      const userDoc = doc(this.firestore, 'users', uid);
      await setDoc(userDoc, userData, { merge: true });
      console.log('Datos del usuario guardados/actualizados correctamente.');
    } catch (error) {
      console.error('Error al guardar los datos del usuario:', error);
      throw error;
    }
  }

  async getUserData() {
    const user = this.auth.currentUser;

    if (user) {
      try {
        const userDoc = doc(this.firestore, 'users', user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          console.error('No se encontraron datos del usuario');
          return null;
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
        throw error;
      }
    } else {
      console.error('No hay un usuario autenticado');
      return null;
    }
  }

  async deleteUserAccount() {
    const user = this.auth.currentUser;

    if (user) {
      try {
        const userDoc = doc(this.firestore, 'users', user.uid);
        await deleteDoc(userDoc);

        await user.delete();
        return 'Cuenta eliminada exitosamente';
      } catch (error) {
        console.error('Error al eliminar la cuenta:', error);
        throw error;
      }
    } else {
      throw new Error('No hay un usuario autenticado');
    }
  }

  async getTareas(): Promise<Tareas[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No hay un usuario autenticado');
    }

    const tareasRef = collection(this.firestore, 'tareas');
    const q = query(tareasRef, where('userId', '==', currentUser.uid));
    const querySnapshot = await getDocs(q);

    const tareas: Tareas[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as Tareas;
      data.id = doc.id;
      tareas.push(data);
    });

    return tareas;
  }

}
