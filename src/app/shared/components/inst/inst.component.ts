import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-inst',
  templateUrl: './inst.component.html',
  styleUrls: ['./inst.component.scss']
})
export class InstComponent implements OnInit {
  title = 'Insituições';
  themeColor: 'primary' | 'accent' | 'warn' = 'primary';
  displayedColumns = ['select', 'inst_nome', 'inst_cnpj', 'inst_obs'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  
  isShow = false;
  toggleDisplay() {
    this.isShow = true;
  }
  toggleBack() {
    this.isShow = false;
  }

  anySelected = true;
  changeCheck(event) {
    if (this.selection.selected.length > 0) {
      this.anySelected = false;
    }
    else {
      this.anySelected = true;
    }
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.inst_nome + 1}`;
  }

  constructor() { }

  ngOnInit(): void {
  }
}

export interface PeriodicElement {
  inst_nome: string;
  inst_cnpj: string;
  inst_obs: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { inst_nome: 'Cesar School', inst_cnpj: '01.203.327/0001-23', inst_obs: 'Nenhuma' },
  { inst_nome: 'Instituto Federal de Pernambuco', inst_cnpj: '02.403.237/0005-28', inst_obs: 'Nenhuma' }
];