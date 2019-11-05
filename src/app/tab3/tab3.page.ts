import { Component, OnInit } from '@angular/core';
import { ILibro } from '../Interface/libro';
import { LoadingController } from '@ionic/angular';
import { LibroService } from '../Servicio/libro.service';
import { DetalleService } from '../Servicio/detalle.service';
import { Detalle } from '../Model/detalle';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  lista: ILibro[] = [];
  detalle: Detalle;
  filtro = "";
  constructor(
    private loadingControler: LoadingController,
    private _libroService: LibroService,
    private _detalleService: DetalleService) { }
  ngOnInit() {

  }
  async getLista() {
    const loading = await this.loadingControler.create({
      message: 'cargandoo'
    });
    await loading.present();
    await this._libroService.get().subscribe(res => {
      this.lista = res; loading.dismiss();
    },
      error => {
        console.log(error);
        loading.dismiss();
      })
  }
  postDetalle(codigo: string) {
    
    this.detalle.Momento = "thismoment";
    this._libroService.getLibro(codigo).subscribe(res => {
      this.detalle.Libro = res;
    });
    if (this.detalle.Prestamo == null) {
      this._detalleService.post(this.detalle);
    }
    else {

    }

  }
}
