import { Column, Entity, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn, TableForeignKey } from 'typeorm';
import { Permission } from './Permission';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @ManyToMany(type => Permission, ({ permissionId }) => permissionId)
    @JoinTable()
    permissions: Permission[];

    @Column({ length: 100 })
    name: string;

    @Column({ length: 100 })
    firstName: string;

    @Column({ length: 100 })
    lastName: string;

    @Column({ nullable: true, length: 100 })
    middleName: string;

    @Column({ type: 'nvarchar', length: 255 })
    passwordHash: string;
}
