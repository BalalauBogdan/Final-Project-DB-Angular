import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(private httpClient: HttpClient) { }

  public getAllCountries() {
    return this.httpClient.get(`http://localhost:8080/api/countries/`)
  }

  public createCountry(name: string, capital: string, officialLanguage: string, population: number) {
    let body = {
      "name": name,
      "capital": capital,
      "officialLanguage": officialLanguage,
      "population": population
    }

    return this.httpClient.post(`http://localhost:8080/api/countries/`, body);
  }

  public updateCountry(id: number, name: string, capital: string, officialLanguage: string, population: number) {
    let body = {
      "id": id,
      "name": name,
      "capital": capital,
      "officialLanguage": officialLanguage,
      "population": population
    }

    return this.httpClient.post(`http://localhost:8080/api/countries/update`, body);
  }

  public deleteCountry(id: number) {
    return this.httpClient.delete(`http://localhost:8080/api/countries/${id}`)
  }
}
