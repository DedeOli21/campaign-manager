import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateCampaignUseCase } from '@app/usecases/campaign/create-campaign.use-case';
import { UpdateCampaignDto } from '@presentation/campaign/dto/update-campaign.dto';
import { CreateCampaignDto } from '@presentation/campaign/dto/create-campaign.dto';
import { ListCampaignUseCase } from '@app/usecases/campaign/list-campaign.use-case';
import { FindCampaignUseCase } from '@app/usecases/campaign/find-campaign.use-case';
import { UpdateCampaignUseCase } from '@app/usecases/campaign/update-campaign.use-case';
import { DeleteCampaignUseCase } from '@app/usecases/campaign/delete-campaign.use-case';
import { NotFoundSwagger } from '@shared/swagger/not-found.swagger';
import { InternalServerError } from '@shared/swagger/internal-server-error.swagger';

@ApiTags('Campaigns')
@Controller('campaigns')
export class CampaignController {
  constructor(
    private readonly createCampaign: CreateCampaignUseCase,
    private readonly findAllCampaign: ListCampaignUseCase,
    private readonly findCampaign: FindCampaignUseCase,
    private readonly deleteCampaign: DeleteCampaignUseCase,
    private readonly updateCampaign: UpdateCampaignUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova campanha' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Campanha criada com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor',
    type: InternalServerError,
  })
  async create(@Body() createCampaignDto: CreateCampaignDto) {
    return await this.createCampaign.call(createCampaignDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lista todas as campanhas' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de campanhas retornada com sucesso.',
  })
  async findAll() {
    return await this.findAllCampaign.call();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtém uma campanha pelo ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da campanha',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Campanha encontrada com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Campanha não encontrada.',
    type: NotFoundSwagger,
  })
  async findOne(@Param('id') id: number) {
    return await this.findCampaign.call({ id });
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualiza uma campanha existente' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da campanha a ser atualizada',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Campanha atualizada com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Campanha não encontrada.',
    type: NotFoundSwagger,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Erro interno do servidor.',
    type: InternalServerError,
  })
  async update(
    @Param('id') id: number,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return await this.updateCampaign.call({ id, ...updateCampaignDto });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove (soft delete) uma campanha' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID da campanha a ser removida',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Campanha removida com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Campanha não encontrada.',
    type: NotFoundSwagger,
  })
  async softDelete(@Param('id') id: number) {
    return await this.deleteCampaign.call({ id });
  }
}
