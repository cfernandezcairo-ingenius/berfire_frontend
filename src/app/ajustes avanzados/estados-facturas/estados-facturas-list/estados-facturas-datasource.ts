import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface EstadosFacturasItem {
  id: number
  nombre: string;
  pagado: boolean;
  devuelto: boolean;
  pendiente: boolean;
  enviado: boolean;
  impagado: boolean;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: EstadosFacturasItem[] = [
  {
    id: 1,
    nombre: 'Name 1',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 2,
    nombre: 'Name 2',
    pagado: false,
    devuelto: false,
    pendiente: true,
    enviado: false,
    impagado: true
  },
  {
    id: 3,
    nombre: 'Name 3',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 4,
    nombre: 'Name 4',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 5,
    nombre: 'Name 5',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 6,
    nombre: 'Name 6',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 7,
    nombre: 'Name 7',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 8,
    nombre: 'Name 8',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 9,
    nombre: 'Name 9',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 10,
    nombre: 'Name 10',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 11,
    nombre: 'Name 11',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 12,
    nombre: 'Name 12',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 13,
    nombre: 'Name 13',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 14,
    nombre: 'Name 14',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 15,
    nombre: 'Name 5',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  },
  {
    id: 16,
    nombre: 'Name 16',
    pagado: true,
    devuelto: false,
    pendiente: false,
    enviado: true,
    impagado: false
  }
];

/**
 * Data source for the Facturas view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EstadosFacturasDataSource extends DataSource<EstadosFacturasItem> {
  data: EstadosFacturasItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<EstadosFacturasItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: EstadosFacturasItem[]): EstadosFacturasItem[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: EstadosFacturasItem[]): EstadosFacturasItem[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.nombre, b.nombre, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
