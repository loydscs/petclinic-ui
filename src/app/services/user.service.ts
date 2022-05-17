import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/user';
import { environment } from './../../environments/environment';

const baseURL = 'http://localhost:8081/api/v1';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllPetOnwers(): Observable<any> {
    return this.httpClient.get(`${baseURL}/users/role/${environment.petOwnerRoleId}`);
  }

  createPetOwner(petowner: Object): Observable<any> {
    return this.httpClient.post(`${baseURL}/users/create`, petowner);
  }

  updatePetOwner(petowner: Object): Observable<any> {
    return this.httpClient.post(`${baseURL}/users/update`, petowner);
  }

  deletePetOwner(petownerId: number): Observable<any> {
    return this.httpClient.delete(`${baseURL}/users/delete/${petownerId}`);
  }
}
