import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import NotificationError from "../../@shared/domain/notification/notification.error";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/invoice.product.entity";
import InvoiceValidatorFactory from "../factory/invoice.validator.factory";

type InvoiceProps = {
  id?: Id; // criado automaticamente
  name: string;
  document: string;
  address: Address; // value object
  items: Product[]; // Product entity
  createdAt?: Date; // criada automaticamente
  updatedAt?: Date; // criada automaticamente
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _items: Product[];
  private _address: Address;

  constructor(props: InvoiceProps) {
    super(props.id);
    this._name = props.name;
    this._document = props.document;
    this._items = props.items;
    this._address = props.address;

    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  get name() {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get items() {
    return this._items;
  }

  get address() {
    return this._address;
  }

  validate() {
    InvoiceValidatorFactory.create().validate(this);
  }

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
