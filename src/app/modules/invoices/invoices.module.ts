import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { InvoicesComponent } from './invoices.component';
import { SidebarModule } from '../../components/sidebar/sidebar.module';
import { GridModule } from "@progress/kendo-angular-grid";
import { CreateUpdateInvoiceComponent } from './create-update-invoice/create-update-invoice.component';
import { AddItemComponent } from './add-item/add-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent
  }
];

@NgModule({
  declarations: [
    InvoicesComponent,
    CreateUpdateInvoiceComponent,
    AddItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SidebarModule,
    GridModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    CreateUpdateInvoiceComponent,
    AddItemComponent
  ]
})
export class InvoicesModule { }
