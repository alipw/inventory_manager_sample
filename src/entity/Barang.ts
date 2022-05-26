import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { Kategori } from "./Kategori";
import { Vendor } from "./Vendor";

@Entity()
class Barang extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column()
  stok: number;

  @Column()
  nama: string;

  @ManyToMany(() => Kategori)
  @JoinTable()
  kategori: Kategori[];

  @ManyToOne(() => Vendor, (vendor) => vendor.id)
  vendor: Vendor;
}

export { Barang };
