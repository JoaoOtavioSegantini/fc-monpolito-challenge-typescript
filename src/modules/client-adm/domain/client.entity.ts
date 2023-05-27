import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import NotificationError from "../../@shared/domain/notification/notification.error";
import Id from "../../@shared/domain/value-object/id.value-object";
import ClientAdmValidatorFactory from "../factory/client-adm.validator.factory";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Client extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _address: string;

  constructor(props: ClientProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;

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
}
