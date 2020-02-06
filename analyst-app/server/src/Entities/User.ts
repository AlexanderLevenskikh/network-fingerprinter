import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'uuid', name: 'user_id' })
    userId: string;

    @Column({ type: 'varchar', length: 100, name: 'user_name' })
    userName: string;

    @Column({ type: 'varchar', length: 255, name: 'password_hash' })
    passwordHash: string;

    @Column({ type: 'boolean', name: 'is_admin' })
    isAdmin: boolean;

    @Column({ type: 'varchar', nullable: true, length: 100, name: 'first_name' })
    firstName: string;

    @Column({ type: 'varchar', nullable: true, length: 100, name: 'last_name' })
    lastName: string;

    @Column({ type: 'varchar', nullable: true, length: 100, name: 'middle_name' })
    middleName: string;
}
