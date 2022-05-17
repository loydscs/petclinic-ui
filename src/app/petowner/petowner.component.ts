import { Component, OnInit, Type } from '@angular/core';
import { UserService } from '../services/user.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

import {Subject} from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-petowner',
  templateUrl: './petowner.component.html',
  styleUrls: ['./petowner.component.css']
})
export class PetownerComponent implements OnInit {
  petowners: any = [];
    petowner: any = {};
    errorMessage: string = "";

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  constructor(private router:Router, public userService: UserService, private modalService: NgbModal) {
    this.petowners = []
    this.petowner = {}

   }
   

  currentPetOwner = null;
  currentIndex = -1;
  name = '';
  closeResult!: string;

  ngOnInit(): void {
    this.getPetOwners();
    this.dtOptions = {
      pageLength: 5,
      processing: true
    };
  }

  getPetOwners(): void {
    this.userService.getAllPetOnwers()
      .subscribe((users: any) => {
        this.petowners = users;
      })
  }

  setCurrentPetOwner(petowner: any, index: number): void {
    this.currentPetOwner = petowner;
    this.currentIndex = index;
  }

   editModal(content: any, petowner: any) {
      this.petowner = petowner;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.savePetOwner();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.savePetOwner();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  savePetOwner(){
        this.petowner['role'] = {"id": environment.petOwnerRoleId}
        this.userService.createPetOwner(this.petowner)
    .subscribe({
        next:data=>{
        this.getPetOwners();
        },
        error:data=>{
        this.errorMessage = "Something went wrong!";
        }
    }).add(()=>{

    })
  }

  deletePetOwner(petownerId: number){
    if(confirm("Are you sure to delete ")) {
        this.userService.deletePetOwner(petownerId)
    .subscribe({
        next:data=>{
        this.getPetOwners();
        },
        error:data=>{
        this.errorMessage = "Something went wrong!";
        }
    })
    } else {
       this.errorMessage = "Something went wrong!";
    }
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
