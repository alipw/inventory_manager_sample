import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class Vendor extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ unique: true })
  nama: string;
}

export { Vendor };
