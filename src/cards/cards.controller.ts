import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('endpoints')
@Controller('cards')
@UseGuards(AuthGuard('jwt'))
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(
    @Body(ValidationPipe) createCardDto: CreateCardDto,
    @Request() req: any,
    ) {
    const userId = req.user.id;
    createCardDto.userId = userId;
    return this.cardsService.create(createCardDto);
  }

  @Get()
  findAll(@Request() req: any,) {
    const userId = req.user.id;
    return this.cardsService.findAll(userId);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Request() req: any,
    ) {
    const userId = req.user.id;
    return this.cardsService.findOne(+id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(+id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: any) {
     const userId = req.user.id;
    return this.cardsService.remove(+id, userId);
  }
}
