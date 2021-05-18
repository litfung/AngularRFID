import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import icVisibility from '@iconify/icons-ic/twotone-visibility';
import icVisibilityOff from '@iconify/icons-ic/twotone-visibility-off';
import { fadeInUp400ms } from '../../../../../@vex/animations/fade-in-up.animation';
import { LoginService } from './servicio/login.service';
import { LoginI } from './modelos/login.interface';
import { ResponseI } from './modelos/response.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'vex-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    fadeInUp400ms
  ]
})
export class LoginComponent implements OnInit {


  form: FormGroup;

  inputType = 'password';
  visible = false;

  icVisibility = icVisibility;
  icVisibilityOff = icVisibilityOff;

  errorStatus:boolean = false;
  errorMsj:any = "";

  constructor(private router: Router,
              private fb: FormBuilder,
              private cd: ChangeDetectorRef,
              private snackbar: MatSnackBar,
              private api: LoginService,
              private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', Validators.required]
    });
  }
  send(form:LoginI) {
    this.api.loginbyEmail(form).subscribe(data =>{
      let dataResponse:ResponseI = data;

        localStorage.setItem("token",dataResponse.token);
        this.router.navigate(['/forms/apps/aio-table']);
    },(err:HttpErrorResponse)=>{ 
      if(err.status != 0){
        console.log(err);
      this._snackBar.open(err.error, 'Cerrar', {
        horizontalPosition: "center",
        verticalPosition:"bottom",
        duration: 2 * 1000,
      });
    }else{
      console.log(err);
      this._snackBar.open("Error en la conexión al servidor APIREST. ", 'Cerrar', {
        horizontalPosition: "center",
        verticalPosition:"bottom",
        duration: 2 * 1000,
      });
      
    }
    });
    //this.router.navigate(['/forms']);
    /*this.snackbar.open('Lucky you! Looks like you didn\'t need a password or email address! For a real application we provide validators to prevent this. ;)', 'LOL THANKS', {
      duration: 10000
    });*/
  }

  toggleVisibility() {
    if (this.visible) {
      this.inputType = 'password';
      this.visible = false;
      this.cd.markForCheck();
    } else {
      this.inputType = 'text';
      this.visible = true;
      this.cd.markForCheck();
    }
  }
}
