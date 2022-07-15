import { IsNotEmpty } from 'class-validator';

export class UpdateChatDto {
    @IsNotEmpty()
    nom: string;
}
