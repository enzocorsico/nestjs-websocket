import { Chat } from "src/chat/entities/chat.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contenu: string;

    @CreateDateColumn()
    dateCreation: Date;

    @ManyToOne(type => Chat, chat => chat.messages, { nullable: false, onDelete: "CASCADE" })
    chat: Chat
}
