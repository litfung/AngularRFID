import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { Observable, of, ReplaySubject } from "rxjs";
import { filter } from "rxjs/operators";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { TableColumn } from "../../../../@vex/interfaces/table-column.interface";
import {
  aioTableData,
  aioTableLabels,
} from "../../../../static-data/aio-table-data";
//import { CustomerCreateUpdateComponent } from './customer-create-update/customer-create-update.component';
import icEdit from "@iconify/icons-ic/twotone-edit";
import icDelete from "@iconify/icons-ic/twotone-delete";
import icSearch from "@iconify/icons-ic/twotone-search";
import icAdd from "@iconify/icons-ic/twotone-add";
import icFilterList from "@iconify/icons-ic/twotone-filter-list";
import { SelectionModel } from "@angular/cdk/collections";
import icMoreHoriz from "@iconify/icons-ic/twotone-more-horiz";
import icFolder from "@iconify/icons-ic/twotone-folder";
import { fadeInUp400ms } from "../../../../@vex/animations/fade-in-up.animation";
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldDefaultOptions,
} from "@angular/material/form-field";
import { stagger40ms } from "../../../../@vex/animations/stagger.animation";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { MatSelectChange } from "@angular/material/select";
import icPhone from "@iconify/icons-ic/twotone-phone";
import icMail from "@iconify/icons-ic/twotone-mail";
import icMap from "@iconify/icons-ic/twotone-map";
import { customerLectura } from "./interfaces/customer-lectura.module";
import { LecturaService } from "./servicios/lectura.service";
import { ParametersDtoI } from "./models/ParametersDto.interface";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { ResponseI } from "../../pages/auth/login/modelos/response.interface";
import { validateBasis } from "@angular/flex-layout";
import { getDate, getMonth, isThisISOWeek } from "date-fns";
import { LoginService } from "../../pages/auth/login/servicio/login.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "vex-lecturas-dia",
  templateUrl: "./lecturas-dia.component.html",
  styleUrls: ["./lecturas-dia.component.css"],
  animations: [fadeInUp400ms, stagger40ms],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: "standard",
      } as MatFormFieldDefaultOptions,
    },
  ],
})
export class LecturasDiaComponent implements OnInit {
  layoutCtrl = new FormControl("boxed");

  subject$: ReplaySubject<customerLectura[]> = new ReplaySubject<
    customerLectura[]
  >(1);
  data$: Observable<customerLectura[]> = this.subject$.asObservable();
  customers: customerLectura[] = [];

  @Input()

  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource = new MatTableDataSource<customerLectura>(this.customers);
  selection = new SelectionModel<customerLectura>(true, []);
  searchCtrl = new FormControl();
  displayedColumns: string[] = [
    "select",
    "epc",
    "moduloId",
    "moduloRol",
    "lecturas",
    "local",
    "telefono",
    "antena",
    "empresa",
    "ruc",
    "ultimaLectura",
  ];

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

  respuestaForm: ResponseI;

  constructor(
    public fB: FormBuilder,
    private service: LecturaService,
    private dialog: MatDialog
  ) {}

  lecturaForm: any;
  
  getData() {
    return of(aioTableData.map((customer) => new customerLectura(customer)));
  }

  ngOnInit(): void {
    
    var fechaActual = new Date();
    var formatoFecha;  
    fechaActual.setDate(fechaActual.getDate());
    formatoFecha = (fechaActual.getFullYear() + '-'
             + ('0' + (fechaActual.getMonth()+1)).slice(-2) + '-'
             + ('0' + fechaActual.getDate()).slice(-2));

    this.lecturaForm = new FormGroup({
      fecha: new FormControl(formatoFecha),
    });

    this.dataSource.paginator = this.paginator;

    this.getData().subscribe((customers) => {
      this.subject$.next(customers);
    });

    this.dataSource = new MatTableDataSource();

    this.data$
      .pipe(filter<customerLectura[]>(Boolean))
      .subscribe((customers) => {
        this.customers = customers;
        this.dataSource.data = customers;
      });

    this.searchCtrl.valueChanges
      .pipe
      ()
      .subscribe((value) => this.onFilterChange(value));
  }

  BuscarTag() {
    
    var f = this.lecturaForm.value.fecha;
    console.log("inreso a BuscarTag");
    console.log(
      "ruc: " +
        localStorage.getItem("ruc") +
        ", fecha: " +
        f
    );
    function p(): ParametersDtoI {
      return {
        fecha: f,
        ruc: localStorage.getItem("ruc"),
      };
    }
    console.log("fecha: " + p().fecha + ", ruc: " + p().ruc);
    this.service.BuscarTag(p()).subscribe((resp) => {
      console.log(resp);
      this.customers = resp;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteCustomer(customer: customerLectura) {
    this.customers.splice(
      this.customers.findIndex(
        (existingCustomer) => existingCustomer.id === customer.id
      ),
      1
    );
    this.selection.deselect(customer);
    this.subject$.next(this.customers);
  }

  deleteCustomers(customers: customerLectura[]) {
    customers.forEach((c) => this.deleteCustomer(c));
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
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  onLabelChange(change: MatSelectChange, row: customerLectura) {
    const index = this.customers.findIndex((c) => c === row);
    this.customers[index].labels = change.value;
    this.subject$.next(this.customers);
  }

  //changes
  checkboxLabel(row?: customerLectura): string {
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.id + 1
    }`;
  }
}
