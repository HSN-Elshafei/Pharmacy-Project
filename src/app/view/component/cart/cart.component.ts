import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Carts } from 'src/app/interfaces/carts.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  carts: Carts[] = []
  cartOps!: Subscription
  readonly tax=0
  readonly shipping=0
  constructor(private cs: CartService) {
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.cartOps = this.cs.getCart().subscribe((data) => {
      this.carts = data.map((element) => {
        const id = element.payload.doc.id;
        const data = element.payload.doc.data() as Record<string, any>; // Assuming data is of type any
        return {
          id,
          ...data,
        };
      });
    });
  }


  totalPrice(){
    let x=0
    for (let i = 0; i < this.carts.length; i++) {
      x+=this.carts[i].price!*this.carts[i].amount!
    }
    return x
  }
  total(){

    return this.totalPrice()+this.shipping+this.tax
  }
  delete(index:any){
    this.cs.delete(this.carts[index].id)
  }
}