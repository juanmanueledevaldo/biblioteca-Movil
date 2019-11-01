import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../Servicio/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../Model/usuario';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  lista: Usuario[] = [];
  filtro = "";
  constructor(
    private _usuarioService: UsuarioService,
    private loadingController: LoadingController,
    public router: Router,
    public route: ActivatedRoute) {}
  ngOnInit() {
    this.getLista();
  }
  async getLista() {
    const loading = await this.loadingController.create({
      message: 'cargado perron...'
    });
    await loading.present();
    await this._usuarioService.get().subscribe(res => {
      this.lista = res; loading.dismiss();
    },
      err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
