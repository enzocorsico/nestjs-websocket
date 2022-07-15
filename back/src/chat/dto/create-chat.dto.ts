import { IsNotEmpty } from "class-validator";

export class CreateChatDto {
    @IsNotEmpty()
    nom: string;
}
