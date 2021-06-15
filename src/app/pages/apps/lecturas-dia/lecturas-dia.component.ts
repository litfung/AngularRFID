import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { aioTableData, aioTableLabels } from '../../../../static-data/aio-table-data';
//import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import { SelectionModel } from '@angular/cdk/collections';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { fadeInUp400ms } from '../../../../@vex/animations/fade-in-up.animation';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { stagger40ms } from '../../../../@vex/animations/stagger.animation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MatSelectChange } from '@angular/material/select';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import { customerLectura } from './interfaces/customer-lectura.module';
import { LecturaService } from './servicios/lectura.service';
import { ParametersDtoI } from './models/ParametersDto.interface';

@Component({
  selector: 'vex-lecturas-dia',
  templateUrl: './lecturas-dia.component.html',
  styleUrls: ['./lecturas-dia.component.css'
  ],
  animations: [
    fadeInUp400ms,
    stagger40ms
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'standard'
      } as MatFormFieldDefaultOptions
    }
  ]
})
export class LecturasDiaComponent implements OnInit {

  layoutCtrl = new FormControl('boxed');

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<customerLectura[]> = new ReplaySubject<customerLectura[]>(1);
  data$: Observable<customerLectura[]> = this.subject$.asObservable();
  customers: customerLectura[] = [];
  parametros: ParametersDtoI;

  @Input()
  columns: TableColumn<customerLectura>[] = [
    { label: 'Checkbox', property: 'checkbox', type: 'checkbox', visible: true },
    { label: 'TAG', property: 'EPC', type: 'text', visible: true },
    { label: 'Movimiento', property: 'ModuloId', type: 'text', visible: true },
    { label: 'Antena', property: 'ModuloRol', type: 'text', visible: true, cssClasses: ['font-medium'] },
    { label: 'Ubicación', property: 'Lecturas', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
    { label: 'Hora de salida', property: 'Local', type: 'text', visible: true, cssClasses: ['text-secondary', 'font-medium'] },
  ];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource = new MatTableDataSource<customerLectura>(this.customers);
  selection = new SelectionModel<customerLectura>(true, []);
  searchCtrl = new FormControl();

  labels = aioTableLabels;

  icPhone = icPhone;
  icMail = icMail;
  icMap = icMap;
  icEdit = icEdit;
  icSearch = icSearch;
  icDelete = icDelete;
  icAdd = icAdd;
  icFilterList = icFilterList;
  icMoreHoriz = icMoreHoriz;
  icFolder = icFolder;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  lecturaForm = new FormGroup({
    fecha: new FormControl(''),
    ruc: new FormControl(''),
  });
  respuestaForm:any;

  constructor(public fB:FormBuilder,
              private service: LecturaService,
              private dialog: MatDialog) {
  }

  get visibleColumns() {
    return this.columns.filter(column => column.visible).map(column => column.property);
  }

  ngOnInit() {
      //Test
  this.respuestaForm = this.fB.group({
    epc: ['', [Validators.required]],
    moduloId: ['', [Validators.required]],
    moduloRol: ['', [Validators.required]],
    lecturas: ['', [Validators.required]],
    local: ['', [Validators.required]],
    antena: ['', [Validators.required]],
    empresa: ['', [Validators.required]],
    ruc:  ['', [Validators.required]],
    ultimaLectura: ['', [Validators.required]],
  });
    // this.getData().subscribe(customers => {

    //   this.subject$.next(customers);
    // });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(
      filter<customerLectura[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers;
      this.dataSource.data = customers;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  BuscarTag(){
    this.service.BuscarTag(this.lecturaForm.value).subscribe(
      resp=> {
      console.log(resp);
          debugger
          //this.CargarBusqueda();
      // Swal.fire('Actualizado', 'success' );
    });
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteCustomer(customer: customerLectura) {
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
    this.selection.deselect(customer);
    this.subject$.next(this.customers);
  }

  deleteCustomers(customers: customerLectura[]) {
    customers.forEach(c => this.deleteCustomer(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(column, event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

 masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: customerLectura) {
    const index = this.customers.findIndex(c => c === row);
    this.customers[index].labels = change.value;
    this.subject$.next(this.customers);
  }

}
