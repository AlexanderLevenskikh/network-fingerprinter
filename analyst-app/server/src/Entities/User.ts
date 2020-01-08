import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    userId: string;

    @Column({ type: 'varchar', length: 100 })
    userName: string;

    @Column({ type: 'varchar', length: 255 })
    passwordHash: string;

    @Column('boolean')
    isAdmin: boolean;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    firstName: string;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    lastName: string;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    middleName: string;
}
