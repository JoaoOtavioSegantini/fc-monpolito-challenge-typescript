import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import NotificationError from "../../@shared/domain/notification/notification.error";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientAdmValidatorFactory from "../factory/client-adm.validator.factory";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  address?: string;
  city?: string;
  document?: string;
  complement?: string;
  street?: string;
  number?: string;
  state?: string;
  zipCode?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Client extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _address: string;
  private _street: string;
  private _number: string;
  private _complement: string;
  private _city: string;
  private _state: string;
  private _document: string;
  private _zipCode: string;

  constructor(props: ClientProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;
    this._city = props.city;
    this._complement = props.complement;
    this._street = props.street;
    this._number = props.number;
    this._state = props.state;
    this._document = props.document;
    this._zipCode = props.zipCode;

    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  changeName(value: string) {
    this._name = value;
  }

  changeEmail(value: string) {
    this._email = value;
  }

  changeAddress(value: string) {
    this._address = value;
  }

  validate() {
    ClientAdmValidatorFactory.create().validate(this);
  }
  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get address(): string {
    return this._address;
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

  public get document(): string {
    return this._document;
  }
  public get state(): string {
    return this._state;
  }

  public get zipCode(): string {
    return this._zipCode;
  }
}
