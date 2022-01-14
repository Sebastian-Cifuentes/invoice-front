import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../../../interfaces/item.interface';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html'
})
export class AddItemComponent implements OnInit {

  form!: FormGroup;
  showForm = false;
  @Input() items: Item[] = [];
  @Output() onadditem: EventEmitter<Item[]> = new EventEmitter();

  constructor(
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      value: ['', Validators.required],
      vat: ['', Validators.required],
    });
  }

  save() {
    if(this.form.invalid) {
      return;
    }

    const { ...item } = this.form.value;
    console.log(this.items)

    this.items.push(item);
    this.form.reset();
    this.onadditem.emit(this.items);
    
  }



}
