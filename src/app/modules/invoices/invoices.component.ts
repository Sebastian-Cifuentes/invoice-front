import { Component, OnInit } from '@angular/core';
import {
  GridDataResult,
  DataStateChangeEvent,
} from "@progress/kendo-angular-grid";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { process, State } from "@progress/kendo-data-query";
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice } from '../../interfaces/invoice.interface';


@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html'
})
export class InvoicesComponent implements OnInit {

  state: State = {
    skip: 0,
    take: 10,

    // Initial filter descriptor
    filter: {
      logic: "and",
      filters: [],
    },
  };

  invoiceIdSelect!: string | undefined;
  invoicesG: Invoice[] = [];
  invoices!: GridDataResult;
  
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.getAll();
  }

  openModal(content: any, id?: string) {
    this.invoiceIdSelect = id; 
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' });
  }

  getAll() {
    this.invoiceService.getAll()
      .subscribe(({invoices}) => {
        this.invoicesG = invoices;
        this.invoices = { data:invoices, total:invoices.length };
      });
  }

  remove(id: string) {
    this.invoiceService.delete(id)
      .subscribe(({message}) => {
        alert(message);
        this.getAll();
      });
  }

  dataStateChange(state: DataStateChangeEvent): void {
    this.state = state;
    this.invoices = process(this.invoicesG, this.state);
  }

}
