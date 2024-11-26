import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../../navigation/shared/services/navigation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { BillStatusService } from '../bill-status.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IBillStatements, IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bill-status-list',
  templateUrl: './bill-status-list.component.html',
  styleUrl: './bill-status-list.component.scss',
  standalone: true,
  imports: [
    TableListComponent,
    SpinnerComponent,
    CommonModule,
    TranslateModule
]
,
providers: [TranslateService]
})
export class BillStatusListComponent implements OnInit {

  dataSource = {
    data: [] as IBillStatements[]
  };
  darkMode = false;
  payload: any;
  loading = false;
  todoListo = false;
  displayedLabels: IDisplayedLabels[] = [
    {
      name:'',
      isBoolean: false
    },
    {
      name: 'Nombre',
      isBoolean: false
    },
    {
      name: 'Pagado',
      isBoolean: true
    },
    {
      name: 'Devuelto',
      isBoolean: true
    },
    {
      name: 'Pendiente',
      isBoolean: true
    },
    {
      name: 'Enviado',
      isBoolean: true
    },
    {
      name: 'Impagado',
      isBoolean: true
    }
  ]


  displayedLabelsEs = this.displayedLabels;
  displayedLabelsEn: IDisplayedLabels[] =
  [
    {
      name:'',
      isBoolean: false
    },
    {
      name: 'Name',
      isBoolean: false
    },
    {
      name: 'Is Paid',
      isBoolean: true
    },
    {
      name: 'Is returned',
      isBoolean: true
    },
    {
      name: 'Is Pending',
      isBoolean: true
    },
    {
      name: 'Is Sending',
      isBoolean: true
    },
    {
      name: 'Is Unpaid',
      isBoolean: true
    }
  ];
  fg: FormGroup

  constructor(
    private readonly navigationSrv: NavigationService,
    private readonly translate: TranslateService,
    private readonly billStatusSrv:BillStatusService,
    private readonly fb: FormBuilder,
    private readonly matSnackBar: MatSnackBar
  ){
    this.translate.onLangChange.subscribe(lc=> {
      if(this.translate.currentLang === 'es') {
        this.displayedLabels = this.displayedLabelsEs;
      } else {
        this.displayedLabels = this.displayedLabelsEn;
      }
    });
    this.fg = this.fb.group({
      name:[''],
      isPaid: [],
      isReturned: [''],
      isPending: [''],
      isSent: [''],
      isUnPaid: ['']
    });
  }

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabBillStatements' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
    this.loading = true;
    this.loadAll();
  }

  loadAll() {
    this.loading = true;
    this.billStatusSrv.getAll().subscribe(All => {
      if (All.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.', this.translate.currentLang);
        this.addItem();
      } else {
        this.dataSource = { data: All.data };
        this.loading = false;
        this.todoListo = true;
      }
    })
  }

  handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabBillStatements', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  edit(row:any) {
    const strRow = JSON.stringify(row);
    this.billStatusSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/invoice-status/edit/${strRow}`)
  }

  editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.billStatusSrv._idToEdit = row.id;
    window.open(`/invoice-status/edit/new/${strRow}`, '_blank')
  }

  delete(id: number) {
    const strRow = JSON.stringify(id);
    this.billStatusSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/invoice-status/delete/${strRow}`)
  }

  addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/invoice-status/edit/${row}`)
  }

  searchData(event: IBillStatements) {

    let payload = `?name=${event.name}`;
    if (event.isPaid) {
      payload = payload + `&isPaid=${event.isPaid}`;
    }
    if (event.isReturned) {
      payload = payload + `&isReturned=${event.isReturned}`;
    }
    if (event.isPending) {
      payload = payload + `&isPending=${event.isPending}`;
    }
    if (event.isSent) {
      payload = payload + `&isSent=${event.isSent}`;
    }
    if (event.isUnPaid) {
      payload = payload + `&isUnPaid=${event.isUnPaid}`;
    }
    this.loading = true;
    this.billStatusSrv.getByFields(payload).subscribe(res=> {
      this.loading = false;
      if (res.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.');
      } else {
        this.dataSource = { data: res.data };

      }
    });
    this.todoListo = true;
  }

  cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
