import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from '@ngneat/until-destroy';
import { Observable, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { customerLecturaAlertada } from './interfaces/customer-lecturasAlertadas.module';
import { LecturaAlertadaDiaService } from './servicios/lectura-alertada-dia.service';
import icEdit from '@iconify/icons-ic/twotone-edit';
import icDelete from '@iconify/icons-ic/twotone-delete';
import icSearch from '@iconify/icons-ic/twotone-search';
import icAdd from '@iconify/icons-ic/twotone-add';
import icFilterList from '@iconify/icons-ic/twotone-filter-list';
import icPhone from '@iconify/icons-ic/twotone-phone';
import icMail from '@iconify/icons-ic/twotone-mail';
import icMap from '@iconify/icons-ic/twotone-map';
import icMoreHoriz from '@iconify/icons-ic/twotone-more-horiz';
import icFolder from '@iconify/icons-ic/twotone-folder';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { fadeInUp400ms } from 'src/@vex/animations/fade-in-up.animation';

@Component({
  selector: 'vex-lecturas-alertadas-dia',
  templateUrl: './lecturas-alertadas-dia.component.html',
  styles: [
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
export class LecturasAlertadasDiaComponent implements OnInit {

  layoutCtrl = new FormControl('boxed');

  subject$: ReplaySubject<customerLecturaAlertada[]> = new ReplaySubject<customerLecturaAlertada[]>(1);
  data$: Observable<customerLecturaAlertada[]> = this.subject$.asObservable();
  customers: customerLecturaAlertada[] = [];

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource = new MatTableDataSource<customerLecturaAlertada>(this.customers);
  selection = new SelectionModel<customerLecturaAlertada>(true, []);
  searchCtrl = new FormControl();
  displayedColumns: string[] = ['select', 'epc', 'moduloId','moduloRol','lecturas','local','telefono','antena','empresa','ruc','ultimaLectura'];
  
  // labels = aioTableLabels;

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
              private service: LecturaAlertadaDiaService,
              private dialog: MatDialog) {
  }

  // get visibleColumns() {
  //   return this.columns.filter(column => column.visible).map(column => column.property);
  // }

  // getData() {
  //   return of(aioTableData.map(customer => new customerLecturaAlertada(customer)));
  // }

  ngOnInit() {
      //Test
  this.respuestaForm = this.fB.group({
    epc: ['', [Validators.required]],
    moduloId: ['', [Validators.required]],
    moduloRol: ['', [Validators.required]],
    lecturas: ['', [Validators.required]],
    local: ['', [Validators.required]],
    telefono:['',[Validators.required]],
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
      filter<customerLecturaAlertada[]>(Boolean)
    ).subscribe(customers => {
      this.customers = customers;
      this.dataSource.data = customers;
    });

    this.searchCtrl.valueChanges.pipe(
      untilDestroyed(this)
    ).subscribe(value => this.onFilterChange(value));
  }

  BuscarTagAlertados(){
    this.service.BuscarTagAlertados(this.lecturaForm.value).subscribe(
        resp => {
        console.log(resp);
        debugger
        this.customers = resp;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteCustomer(customer: customerLecturaAlertada) {
    this.customers.splice(this.customers.findIndex((existingCustomer) => existingCustomer.id === customer.id), 1);
    this.selection.deselect(customer);
    this.subject$.next(this.customers);
  }

  deleteCustomers(customers: customerLecturaAlertada[]) {
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

  // trackByProperty<T>(index: number, column: TableColumn<T>) {
  //   return column.property;
  // }

  onLabelChange(change: MatSelectChange, row: customerLecturaAlertada) {
    const index = this.customers.findIndex(c => c === row);
    this.customers[index].labels = change.value;
    this.subject$.next(this.customers);
  }

  //changes
  checkboxLabel(row?: customerLecturaAlertada): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}
