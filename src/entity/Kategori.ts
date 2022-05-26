import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class Kategori extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ unique: true })
  nama: string;
}

export { Kategori };
