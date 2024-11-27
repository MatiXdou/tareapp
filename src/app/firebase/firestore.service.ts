import { Injectable, Injector  } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { collection, deleteDoc, doc, Firestore, getDoc, setDoc, where, query, addDoc, onSnapshot, collectionData, updateDoc } from '@angular/fire/firestore';
import { Tareas } from '../models/Tareas.models';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private tareasPendientesSubject = new BehaviorSubject<Tareas[]>([]);
  public tareasPendientes$ = this.tareasPendientesSubject.asObservable();

  private tareasCompletadasSubject = new BehaviorSubject<Tareas[]>([]);
  public tareasCompletadas$ = this.tareasCompletadasSubject.asObservable();


  private authService: AuthService;
  constructor(private firestore: Firestore, private auth: Auth, private injector: Injector) {
    setTimeout(() => {
      this.authService = this.injector.get(AuthService);
    });
  }

  async saveUserData(uid: string, userData: { email: string; fullName: string; }): Promise<void> {
    try {
      const userDoc = doc(this.firestore, 'users', uid);
      await setDoc(userDoc, userData, { merge: true });
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

  getTareasByEstado(estado: string, userId: string): Observable<Tareas[]> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No hay un usuario autenticado');
    }

    const tareasRef = collection(this.firestore, 'tareas');
    const q = query(
      tareasRef,
      where('userId', '==', userId),
      where('estado', '==', estado)
    );

    return collectionData(q, { idField: 'id' }) as Observable<Tareas[]>;
  }

  async addTarea(tarea: Tareas): Promise<void> {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('No hay un usuario autenticado');
    }
    tarea.userId = currentUser.uid;
    const tareasRef = collection(this.firestore, 'tareas');
    await addDoc(tareasRef, tarea);
  }

  async actualizarTareaEstado(tareaId: string, nuevoEstado: string): Promise<void> {
    const tareaRef = doc(this.firestore, `tareas/${tareaId}`);
    await updateDoc(tareaRef, { estado: nuevoEstado });
  }

  async eliminarTarea(tareaId: string): Promise<void> {
    const tareaRef = doc(this.firestore, `tareas/${tareaId}`);
    await deleteDoc(tareaRef);
  }

}
