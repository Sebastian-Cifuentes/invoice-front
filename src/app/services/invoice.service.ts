import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Invoice } from '../interfaces/invoice.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private apiUrl = `${environment.apiUrl}/invoice`;

  constructor(
    private readonly http: HttpClient
  ) { }

  getAll() {
    return this.http.get<{invoices: Invoice[]}>(`${this.apiUrl}/getAll`);
  }

  getById(id: string) {
    return this.http.get<{invoice: Invoice}>(`${this.apiUrl}/getById/${id}`);
  }

  create( invoice: Invoice ) {
    return this.http.post<{invoice: Invoice; message: string}>(`${this.apiUrl}/create`, invoice);
  }
  
  update( invoice: Invoice ) {
    console.log(invoice)
    return this.http.put<{invoice: Invoice; message: string}>(`${this.apiUrl}/update/${invoice._id}`, invoice);
  }

  delete( id: string ) {
    return this.http.delete<{message: string}>(`${this.apiUrl}/remove/${id}`);
  }

}
