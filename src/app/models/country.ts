export class Country {

  private _id: number;
  private _name: string;
  private _capital: string;
  private _officialLanguage: string;
  private _population: number;

  constructor(id: number, name: string, capital: string, officialLanguage: string, population: number) {
    this._id = id;
    this._name = name;
    this._capital = capital;
    this._officialLanguage = officialLanguage;
    this._population = population;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get capital(): string {
    return this._capital;
  }

  set capital(value: string) {
    this._capital = value;
  }

  get officialLanguage(): string {
    return this._officialLanguage;
  }

  set officialLanguage(value: string) {
    this._officialLanguage = value;
  }

  get population(): number {
    return this._population;
  }

  set population(value: number) {
    this._population = value;
  }
}
