import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { Campaign } from './entities/campaign.entity';

@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  create(@Body() createCampaignDto: Campaign) {
    return this.campaignService.create(createCampaignDto);
  }

  @Get()
  findAll() {
    return this.campaignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.campaignService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignService.update(id, updateCampaignDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: number) {
    return this.campaignService.remove(id);
  }
}
