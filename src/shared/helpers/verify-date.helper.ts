import { BadRequestException } from '@nestjs/common';
import { CampaignStatus } from 'src/campaign/entities/campaign.entity';

export function validateCampaignDates(
  startDate: Date,
  endDate: Date,
  status?: CampaignStatus,
): CampaignStatus {
  const now = new Date();

  if (startDate < now) {
    throw new BadRequestException(
      'A data de início deve ser igual ou posterior à data atual.',
    );
  }

  if (endDate <= startDate) {
    throw new BadRequestException(
      'A data final deve ser maior que a data inicial.',
    );
  }

  if (endDate < now) {
    return CampaignStatus.EXPIRED;
  }

  return status && Object.values(CampaignStatus).includes(status)
    ? status
    : CampaignStatus.ACTIVE;
}
