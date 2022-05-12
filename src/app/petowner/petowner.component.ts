import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { DataTableDirective } from 'angular-datatables';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-petowner',
  templateUrl: './petowner.component.html',
  styleUrls: ['./petowner.component.css']
})
export class PetownerComponent implements OnInit {
  petowners: any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(public userService: UserService) {
    this.petowners = []

   }

  // ngOnInit(): void {
  // }
  currentPetOwner = null;
  currentIndex = -1;
  name = '';
  // dtOptions: DataTables.Settings = {};




  ngOnInit(): void {
    this.getPetOwners();
    this.dtOptions = {
      // pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

  getPetOwners(): void {
    this.userService.getAllPetOnwers()
      .subscribe((users: any) => {
        this.petowners = users;
        // this.dtTrigger.next();
      })
        // users => {
        //   this.petowners = users;
        // },
        // error => {
        //   console.log(error);
        // }));
  }

  // refresh(): void {
  //   this.readProducts();
  //   this.currentProduct = null;
  //   this.currentIndex = -1;
  // }

  setCurrentPetOwner(petowner: any, index: number): void {
    this.currentPetOwner = petowner;
    this.currentIndex = index;
  }

  // deleteAllProducts(): void {
  //   this.productService.deleteAll()
  //     .subscribe(
  //       response => {
  //         console.log(response);
  //         this.readProducts();
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  // searchByName(): void {
  //   this.productService.searchByName(this.name)
  //     .subscribe(
  //       products => {
  //         this.products = products;
  //         console.log(products);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
