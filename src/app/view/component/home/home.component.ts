import { CartService } from './../../../services/cart.service';
import { DrugsService } from 'src/app/services/drugs.service';
import { Drugs } from './../../../interfaces/drugs.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  drugs: Drugs[] = []
  drugsOps!: Subscription 
  
 
  
  constructor(private gs: DrugsService,private cs:CartService,private router: Router) {
  }

  ngOnInit(): void {
    this.drugsOps=this.gs.getAllDrugs().subscribe((data) => {
      this.drugs = data.map((element) => {
        const id = element.payload.doc.id;
        const data = element.payload.doc.data() as Record<string, any>; // Assuming data is of type any
        return {
          id,
          ...data,
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.drugsOps.unsubscribe();
  }

  addToCart(id: any) {
    let selectedDurg=this.drugs[id]
    let data={
      name:selectedDurg.name,
      amount: 1,
      price: selectedDurg.price,
      imageUrl:selectedDurg.imageUrl,
    }
    this.cs.addToCart(data).then(()=>this.router.navigate(['cart'])).catch(()=>this.router.navigate(['cart']))

  }
}
