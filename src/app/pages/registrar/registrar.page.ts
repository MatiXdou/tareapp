import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
  fullName: string = '';
  user: string = '';
  email: string = '';
  password: string = '';
  cargando: boolean = false;


  constructor() { }

  ngOnInit() { }

}
