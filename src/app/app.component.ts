import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Country} from "./models/country";
import {CountryService} from "./services/country.service";
import {Location, NgForOf} from "@angular/common";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgForOf, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Final-Project-Angular';
  countries: Country[] = [];
  private id: number = -1;

  country = new FormControl('');
  capital = new FormControl('');
  officialLanguage = new FormControl('');
  population = new FormControl('');

  constructor(private countryService: CountryService, private location: Location) { }

  ngOnInit() {
    this.getAllCountries();
  }

  private refreshPage() {
    this.location.go(this.location.path());
    window.location.reload();
  }

  public getAllCountries() {
    this.countryService.getAllCountries().subscribe((response: any) => {
      if (response.status === 200 && response.data) {
        this.countries = response.data.map((countryData: any) => {
          return {
            id: countryData.id,
            name: countryData.name,
            capital: countryData.capital,
            officialLanguage: countryData.officialLanguage,
            population: countryData.population
          };
        });

      } else {
        console.error('Failed to retrieve countries.');
      }
    });
  }

  public onCreate() {
    let country = this.country.getRawValue()!;
    let capital = this.capital.getRawValue()!;
    let officialLanguage = this.officialLanguage.getRawValue()!;
    let population = this.population.getRawValue()!;

    if (country === "" || capital === "" || officialLanguage === "" || population === "") {
      alert("Some fields are empty");
    } else {
      let populationNr = parseInt(population);
      this.countryService.createCountry(country, capital, officialLanguage, populationNr).subscribe((response: any) => {
        console.log(response);
        this.refreshPage();
      });
    }
  }

  public onDelete(id: number) {
    this.countryService.deleteCountry(id).subscribe((response: any) => {
      console.log(response);
      this.refreshPage();
    });
  }

  public onUpdateTable(id: number, name: string, capital: string, officialLanguage: string, population: number) {
    this.id = id;
    this.country = new FormControl(name);
    this.capital = new FormControl(capital);
    this.officialLanguage = new FormControl(officialLanguage);
    this.population = new FormControl(population.toString());
  }

  public onUpdateForm() {
    let country = this.country.getRawValue()!;
    let capital = this.capital.getRawValue()!;
    let officialLanguage = this.officialLanguage.getRawValue()!;
    let population = parseInt(this.population.getRawValue()!);

    if (this.id != -1) {
      this.countryService.updateCountry(this.id, country, capital, officialLanguage, population).subscribe((response: any) => {
        console.log(response);
        this.refreshPage();
      });

      this.id = -1;
    }
  }
}
