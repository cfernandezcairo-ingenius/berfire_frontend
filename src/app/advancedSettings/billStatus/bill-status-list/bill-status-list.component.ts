import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableListComponent } from "../../../share/common/UI/table-list/table-list.component";
import { BillStatusService } from '../bill-status.service';
import { SpinnerComponent } from "../../../share/common/UI/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { IBillStatements, IDisplayedLabels } from '../../../navigation/shared/models/app-models';
import { openSnackBar } from '../../../share/common/UI/utils';
import { BaseListComponent } from '../../../base-components/base-list.component';

@Component({
  selector: 'app-bill-status-list',
  templateUrl: './bill-status-list.component.html',
  styles: '',
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
export class BillStatusListComponent extends BaseListComponent {

  dataSource = {
    data: [] as IBillStatements[]
  };
  payload: any;
  loading = false;
  todoListo = false;
  override displayedLabels: IDisplayedLabels[] = [
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


  override displayedLabelsEs = this.displayedLabels;
  override displayedLabelsEn: IDisplayedLabels[] =
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

  billStatusSrv:any;

  constructor(){
    super();
    this.fg = this.fb.group({
      name:[''],
      isPaid: [],
      isReturned: [''],
      isPending: [''],
      isSent: [''],
      isUnPaid: ['']
    });
    window.addEventListener('storage', (event) => {
      if (event.key === 'dataModifiedInNewTabBillStatements' && event.newValue === 'true') {
        this.handleDataChange();
      }
    });
  }

  override ngOnInit(): void {
    this.billStatusSrv = this.baseSrv as BillStatusService;
    this.loading = true;
    this.loadAll();
  }

  override loadAll() {
    this.loading = true;
    this.billStatusSrv.getAll().subscribe((All:any) => {
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

  override handleDataChange() {
    localStorage.setItem('dataModifiedInNewTabBillStatements', 'false');
    //Aqui tengo que recargar los datos desde el backend
    this.navigationSrv.NavigateTo('/all/edit/new')
  }


  override edit(row:any) {
    const strRow = JSON.stringify(row);
    this.billStatusSrv._idToEdit = row.id;
    this.navigationSrv.NavigateTo(`/invoice-status/edit/${strRow}`)
  }

  override editNew(row:any) {
    const strRow = JSON.stringify(row);
    this.billStatusSrv._idToEdit = row.id;
    window.open(`/invoice-status/edit/new/${strRow}`, '_blank')
  }

  override delete(id: number) {
    const strRow = JSON.stringify(id);
    this.billStatusSrv._idToDelete = id;
    this.navigationSrv.NavigateTo(`/invoice-status/delete/${strRow}`)
  }

  override addItem() {
    const row = JSON.stringify({ id: 0 });
    this.navigationSrv.NavigateTo(`/invoice-status/edit/${row}`)
  }

  override searchData(event: IBillStatements) {

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
    this.billStatusSrv.getByFields(payload).subscribe((res:any)=> {
      this.loading = false;
      if (res.data.length === 0) {
        openSnackBar(this.matSnackBar, this.translate.currentLang === 'es' ? 'No existen registros' : 'The data returned empty.');
      } else {
        this.dataSource = { data: res.data };

      }
    });
    this.todoListo = true;
  }

  override cleanSearchData() {
    this.fg.reset();
    this.loadAll();
  }

}
