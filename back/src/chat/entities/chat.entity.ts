import { Message } from "src/message/entities/message.entity";
import { BaseEntity, Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    nom: string;

    @OneToMany(type => Message, message => message.chat)
    messages: Message[];
}
