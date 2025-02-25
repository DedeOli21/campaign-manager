import { BadRequestException } from '@nestjs/common';
import { isBefore, startOfDay, toDate, startOfToday, isAfter } from 'date-fns';
import { CampaignStatus } from 'src/campaign/entities/campaign.entity';

export function validateCampaignDates(
  startDate: Date,
  endDate: Date,
  status?: CampaignStatus,
): CampaignStatus {

  const today = startOfDay(new Date());
  const start = toDate(startDate);
  const end = toDate(endDate);

  console.log('startDate', start);
  console.log('endDate', end);
  console.log(today)


  if (isBefore(startDate, today)) {
    throw new BadRequestException(
      'A data de início deve ser igual ou posterior à data atual.',
    );
  }

  if (isBefore(endDate, today)) {
    console.log('EXPIRED')
    return CampaignStatus.EXPIRED;
  }

  if (isBefore(endDate,startDate)) {
    throw new BadRequestException(
      'A data final deve ser maior que a data inicial.',
    );
  }

  return status ? status : CampaignStatus.ACTIVE;
}
