import { Item } from './item.interface';

export interface Invoice {
    _id: string;
    invoiceId: string;
    totalValue: string;
    totalVat: string;
    items: Item[];
    paid: string;
}