import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Invoice } from '../../../interfaces/invoice.interface';
import { Item } from '../../../interfaces/item.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-update-invoice',
  templateUrl: './create-update-invoice.component.html'
})
export class CreateUpdateInvoiceComponent implements OnInit {

  @Input() id!: string | undefined;
  @Output() onadditem: EventEmitter<boolean> = new EventEmitter();
  form!: FormGroup;
  items: Item[] = [];
  invoice!: Invoice;

  constructor(
    private readonly fb: FormBuilder,
    private readonly invoiceService: InvoiceService,
    public readonly modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      invoiceId: ['', Validators.required],
      totalValue: ['', Validators.required],
      totalVat: ['', Validators.required],
      paid: ['', Validators.required]
    });
    this.getInvoice();
  }

  getInvoice() {
    if(this.id) {
      this.invoiceService.getById(this.id!)
        .subscribe(({invoice}) => {
          this.invoice = invoice;
          this.items = invoice.items;
          this.form = this.fb.group({
            invoiceId: [this.invoice?.invoiceId, Validators.required],
            totalValue: [this.invoice?.totalValue, Validators.required],
            totalVat: [this.invoice?.totalVat, Validators.required],
            paid: [this.invoice?.paid, Validators.required]
          });
        });
    }
  }

  addItem(items: Item[]) {
    this.items = items;
  }

  create() {
    if( this.form.invalid ) {
      return;
    }

    if( this.items.length === 0 ) {
      return;
    }
    
    const { ...invoice }: Invoice = this.form.value;

    if(this.invoice) {
      invoice._id = this.invoice._id;
    }

    invoice.items = this.items;

    let obs: Observable<{invoice: Invoice, message: string}>;

    if( this.invoice?._id ) {
      obs = this.invoiceService.update(invoice);
    } else {
      obs = this.invoiceService.create(invoice);
    }

    obs.subscribe(({invoice, message}) => {
      this.modalService.dismissAll();
      alert(message);
      this.invoice = invoice;
      this.onadditem.emit(true);
    });

  }

}
