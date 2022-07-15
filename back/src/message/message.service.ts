import { HttpException, Injectable } from '@nestjs/common';
import { Chat } from 'src/chat/entities/chat.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  async create(createMessageDto: CreateMessageDto) {
    try {
      let message = new Message();

      message.contenu = createMessageDto.contenu;
      message.chat = await Chat.findOneBy({
        id: createMessageDto.chatId
      });

      return await message.save();
    } catch (e) {
      throw new HttpException(e.sqlMessage, 400);
    }
  }

  findAll() {
    return Message.find({
      relations: ["chat"]
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
