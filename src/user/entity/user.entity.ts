import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { ROLE } from "../constant/user.role";


@Entity()
export class User extends BaseEntity {

    @PrimaryColumn()
    id: string;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    password: string;

    @Column({ type: 'enum', enum: Object.values(ROLE) })
    role: ROLE;

    @Column({ type: 'varchar', nullable: true })
    refreshToken: string | null;
}