import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { level_types } from "../helpers/commons";

@Entity()
class User extends BaseEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({
    type: "enum",
    enum: [level_types.LEVEL_MANAGER, level_types.LEVEL_VIEWONLY],
  })
  tipe: string;
}

export { User };
