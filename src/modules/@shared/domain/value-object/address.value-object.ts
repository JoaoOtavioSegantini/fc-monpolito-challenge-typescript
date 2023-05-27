import ValueObject from "./value-object.interface";

export default class Address implements ValueObject {
  private _street: string;
  private _number: string;
  private _complement: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;

  constructor(
    street: string,
    complement: string,
    number: string,
    city: string,
    state: string,
    zipCode: string
  ) {
    this._city = city;
    this._complement = complement;
    this._street = street;
    this._number = number;
    this._state = state;
    this._zipCode = zipCode;
  }

  public get street(): string {
    return this._street;
  }

  public get complement(): string {
    return this._complement;
  }

  public get number(): string {
    return this._number;
  }

  public get city(): string {
    return this._city;
  }

  public get state(): string {
    return this._state;
  }

  public get zipCode(): string {
    return this._zipCode;
  }
}
