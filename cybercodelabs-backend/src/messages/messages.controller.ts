import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';
import { MessageResponse } from './messages.types';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messages: MessagesService) {}

  @Post()
  async create(
    @Body() dto: CreateMessageDto,
  ): Promise<{ status: string; data: MessageResponse }> {
    const data = await this.messages.create(dto);
    return { status: 'ok', data };
  }

  @Get()
  async findAll(): Promise<{ status: string; data: MessageResponse[] }> {
    const data = await this.messages.findAll();
    return { status: 'ok', data };
  }
}
