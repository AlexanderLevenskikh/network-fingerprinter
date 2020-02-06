import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn({ type: 'uuid' })
    userid: string;

    @Column({ type: 'varchar', length: 100 })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    passwordhash: string;

    @Column({ type: 'boolean' })
    isadmin: boolean;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    firstname: string;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    lastname: string;

    @Column({ type: 'varchar', nullable: true, length: 100 })
    middlename: string;
}
