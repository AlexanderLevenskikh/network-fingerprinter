import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    permissionId: string;

    @Column({ length: 100 })
    description: string;
}
