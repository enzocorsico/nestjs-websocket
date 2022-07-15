import { HttpException, Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';

@Injectable()
export class ChatService {
  async create(createChatDto: CreateChatDto) {
    try {
      let chat = new Chat();
      chat.nom = createChatDto.nom;

      return await chat.save();
    } catch (e) {
      throw new HttpException(e.sqlMessage, 400);
    }
  }

  findAll() {
    return Chat.find({
      relations: ["messages"]
    });
  }

  async findOne(id: number) {
    return Chat.findOne({
      where: {
        id: id
      },
      relations: ["messages"]
    })
  }

  async update(id: number, updateChatDto: UpdateChatDto) {
    try {
      let chat = await Chat.findOneBy({
        id: id
      });

      chat.nom = updateChatDto.nom;

      return await chat.save();
    } catch (e) {
      throw new HttpException("Une erreur est survenue lors de la modification", 400);
    }
  }

  async remove(id: number) {
    try {
      let chat = await Chat.findOneBy({
        id: id
      });

      return await chat.remove();
    } catch (e) {
      throw new HttpException("Une erreur est survenue lors de la suppression", 400);
    }
  }
}
