import { IsNotEmpty } from "class-validator";

export class CreateMessageDto {
    @IsNotEmpty()
    contenu: string;

    @IsNotEmpty()
    chatId: number;
}
