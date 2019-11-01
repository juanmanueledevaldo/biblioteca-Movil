import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Usuario } from '../Model/usuario';
import { FormGroup, FormControl } from '@angular/forms';
import { UsuarioService } from '../Servicio/usuario.service';
import {   NavController, NavParams, AlertController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @Input('data') UserFormFather: FormGroup;
  @Output() OnSaveUser = new EventEmitter<Usuario>();
  usuario: Usuario;
  UserForm: FormGroup;
  constructor(
    private _usuarioServicio: UsuarioService) {}
  ngOnInit() {
    this.UserForm = this.CreateFormGroup();
    this.usuario.Id = 1;
    if (this.usuario.Id != null) {
      this._usuarioServicio.getId(this.usuario.Id).subscribe(data => {
        this.usuario = data;
        this.UserForm.controls["User"].setValue(this.usuario.User);
        this.UserForm.controls["Nombre"].setValue(this.usuario.Nombre);
        this.UserForm.controls["Apellido"].setValue(this.usuario.Apellido);
        this.UserForm.controls["Contraseña"].setValue(this.usuario.Contraseña);
      }, error => console.log(error));
    }else{
      console.log("hola");
    }
  }
  CreateFormGroup() {
    return new FormGroup({
      User: new FormControl(),
      Nombre: new FormControl(),
      Apellido: new FormControl(),
      Contraseña: new FormControl(),
    });
  }
  onResetForm() {
    this.UserForm.reset();
  }
  onSaveForm() {
    if (this.UserForm.valid) {
      this.usuario.User = this.UserForm.get("User").value;
      this.usuario.Nombre = this.UserForm.get("Nombre").value;
      this.usuario.Apellido = this.UserForm.get("Apellido").value;
      this.usuario.Contraseña = this.UserForm.get("Contraseña").value;
      if (this.usuario.Id != null) {
        this._usuarioServicio.update(this.usuario).subscribe(res => console.log(res), error => console.log(error))
      } else {
        this._usuarioServicio.post(this.usuario).subscribe(res => console.log(res), error => console.log(error));
      }
      this.onResetForm();
    } else {
      console.log("No valido");
    }
  }


}
