import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { ROLE } from "../constant/user.role";

@Entity()
export class User extends BaseEntity {
    constructor() {
        super();
        this.id = uuid(); // Generate a new UUID for the id
    }

    @PrimaryGeneratedColumn('uuid')
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