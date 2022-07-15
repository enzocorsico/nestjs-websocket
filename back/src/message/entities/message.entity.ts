import { Chat } from "src/chat/entities/chat.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contenu: string;

    @ManyToOne(type => Chat, chat => chat.messages, { nullable: false, onDelete: "CASCADE" })
    chat: Chat
}
