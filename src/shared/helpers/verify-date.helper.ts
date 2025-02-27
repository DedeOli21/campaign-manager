import { BadRequestException } from '@nestjs/common';
import { isBefore, startOfDay, toDate } from 'date-fns';
import { CampaignStatus } from '@shared/const/status-campaign';

export function validateCampaignDates(
  startDate: Date,
  endDate: Date,
  status?: CampaignStatus,
): CampaignStatus {
  const today = startOfDay(new Date());
  const start = startOfDay(toDate(startDate));
  const end = startOfDay(toDate(endDate));

  if (isBefore(start, today)) {
    throw new BadRequestException(
      'A data de início deve ser igual ou posterior à data atual.',
    );
  }

  if (isBefore(end, today)) {
    return CampaignStatus.EXPIRED;
  }

  if (isBefore(end, start)) {
    throw new BadRequestException(
      'A data final deve ser maior que a data inicial.',
    );
  }

  return status ?? CampaignStatus.ACTIVE;
}
