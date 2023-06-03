import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  tableName: "clients",
  timestamps: false,
})
export class ClientModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  declare id: string;

  @Column({ allowNull: false })
  declare name: string;

  @Column({ allowNull: false })
  declare email: string;

  @Column({ allowNull: true })
  declare document: string;

  @Column({ allowNull: true })
  declare street: string;

  @Column({ allowNull: true })
  declare number: string;

  @Column({ allowNull: true })
  declare zipCode: string;

  @Column({ allowNull: true })
  declare city: string;

  @Column({ allowNull: true })
  declare complement: string;

  @Column({ allowNull: true })
  declare state: string;

  @Column({ allowNull: false })
  declare createdAt: Date;

  @Column({ allowNull: false })
  declare updatedAt: Date;
}

//@Column({ allowNull: true })
//declare address: string;

//  @HasMany(() => CheckoutModel)
//  declare orders: CheckoutModel[];

// @BelongsTo(() => CheckoutModel)
//  declare order: string;
