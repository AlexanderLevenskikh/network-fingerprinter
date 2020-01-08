import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    permissionId: string;
}
