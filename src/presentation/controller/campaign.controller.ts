import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateCampaignUseCase } from '../../application/campaign/create-campaign.use-case';
import { UpdateCampaignDto } from '../campaign/dto/update-campaign.dto';
import { CreateCampaignDto } from '../campaign/dto/create-campaign.dto';
import { FindAllCampaignUseCase } from 'src/application/campaign/findAll-campaign.use-case';
import { FindCampaignUseCase } from 'src/application/campaign/find-campaign.use-case';
import { UpdateCampaignUseCase } from 'src/application/campaign/update-campaign.use-case';
import { DeleteCampaignUseCase } from 'src/application/campaign/delete-campaign.use-case';

@Controller('campaigns')
export class CampaignController {
  constructor(
    private readonly createCampaign: CreateCampaignUseCase,
    private readonly findAllCampaign: FindAllCampaignUseCase,
    private readonly findCampaign: FindCampaignUseCase,
    private readonly deleteCampaign: DeleteCampaignUseCase,
    private readonly updateCampaign: UpdateCampaignUseCase,
  ) {}

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.createCampaign.call(createCampaignDto);
  }

  @Get()
  findAll() {
    return this.findAllCampaign.call();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.findCampaign.call({id});
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.updateCampaign.call({ id, ...updateCampaignDto});
  }

  @Delete(':id')
  softDelete(@Param('id') id: number) {
    return this.deleteCampaign.call({id});
  }
}
