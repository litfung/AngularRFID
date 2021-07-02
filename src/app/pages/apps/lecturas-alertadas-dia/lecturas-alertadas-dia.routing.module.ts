import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { VexRoutes } from '../../../../@vex/interfaces/vex-route.interface';
import { LecturasAlertadasDiaComponent } from './lecturas-alertadas-dia.component';


const routes: VexRoutes = [
  {
    path: '',
    component: LecturasAlertadasDiaComponent,
    data: {
      toolbarShadowEnabled: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule, QuicklinkModule]
})
export class LecturaDiaAlertadaRoutingModule {
}
