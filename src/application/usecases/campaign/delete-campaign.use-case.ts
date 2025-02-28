import { Injectable } from '@nestjs/common';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { DeleteCampaignDto } from '@presentation/campaign/dto/delete-campaign.dto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@Injectable()
export class DeleteCampaignUseCase {
  constructor(
    private readonly campaingRepository: CampaignRepository,

    @InjectPinoLogger(DeleteCampaignUseCase.name)
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(DeleteCampaignUseCase.name);
  }

  async call(deleteCampaignDto: DeleteCampaignDto): Promise<string | Error> {
    try {
      this.logger.info('DeleteCampaignUseCase START');
      const { message } =
        await this.campaingRepository.deleteCampaign(deleteCampaignDto);

      this.logger.info(message);

      return message;
    } catch (error) {
      this.logger.error(error);
      throw new error();
    }
  }
}
