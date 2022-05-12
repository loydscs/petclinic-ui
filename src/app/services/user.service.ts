import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role } from '../models/user';
import { environment } from './../../environments/environment';

const baseURL = 'http://localhost:8081/api/v1/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getAllPetOnwers(): Observable<any> {
    return this.httpClient.get(`${baseURL}/role/${environment.petOwnerRoleId}`);
  }

  // read(id): Observable<any> {
  //   return this.httpClient.get(`${baseURL}/${id}`);
  // }

  // create(data): Observable<any> {
  //   return this.httpClient.post(baseURL, data);
  // }

  // update(id, data): Observable<any> {
  //   return this.httpClient.put(`${baseURL}/${id}`, data);
  // }

  // delete(id): Observable<any> {
  //   return this.httpClient.delete(`${baseURL}/${id}`);
  // }

  // deleteAll(): Observable<any> {
  //   return this.httpClient.delete(baseURL);
  // }

  // searchByName(name): Observable<any> {
  //   return this.httpClient.get(`${baseURL}?name=${name}`);
  // }
}
