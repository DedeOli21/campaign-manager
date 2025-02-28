import { UpdateCampaignUseCase } from '@app/usecases/campaign/update-campaign.use-case';
import { CampaignStatus } from '@shared/const/status-campaign';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCampaignDto } from '@presentation/campaign/dto/update-campaign.dto';
import { LoggerServiceMock } from '@test/mocks/logger.service.mock';
import { getLoggerToken } from 'nestjs-pino';

const mockDto = (props?: Partial<UpdateCampaignDto>) => {
  return {
    id: 1,
    name: 'Campanha 6',
    createdAt: new Date('2025-02-27'),
    startDate: new Date('2025-06-27'),
    endDate: new Date('2025-06-28'),
    status: CampaignStatus.ACTIVE,
    category: 'Tecnologia',
    ...props,
  };
};

describe('updateCampaign', () => {
  const mockRepository: Partial<CampaignRepository> = {
    updateCampaign: jest.fn().mockResolvedValue(mockDto()),
    findCampaign: jest.fn().mockResolvedValue(mockDto()),
  };

  let updateCampaignUseCase: UpdateCampaignUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateCampaignUseCase,
        {
          provide: CampaignRepository,
          useValue: mockRepository,
        },
        {
          provide: getLoggerToken(UpdateCampaignUseCase.name),
          useClass: LoggerServiceMock,
        },
        {
          provide: 'pino-params',
          useValue: {},
        },
      ],
    }).compile();

    updateCampaignUseCase = module.get<UpdateCampaignUseCase>(
      UpdateCampaignUseCase,
    );

    jest.clearAllMocks();
  });

  it('should update a campaign', async () => {
    const dto = mockDto();

    const result = await updateCampaignUseCase.call(dto);

    expect(mockRepository.updateCampaign).toHaveBeenCalledWith(dto);

    expect(result).toEqual(dto);
  });

  it('should update a campaign without input date and status', async () => {
    const dto = mockDto({
      startDate: undefined,
      endDate: undefined,
      status: undefined,
    });

    const expectedResult = mockDto();

    const result = await updateCampaignUseCase.call(dto);

    expect(result).toEqual(expectedResult);
  });

  it('should throw an error when repository throws', async () => {
    const dto = mockDto();

    const error = new Error('Error updating campaign');

    mockRepository.updateCampaign = jest.fn().mockRejectedValue(error);

    await expect(updateCampaignUseCase.call(dto)).rejects.toThrow();
  });

  it('should throw an error when dont find campaing', async () => {
    const dto = mockDto();

    mockRepository.findCampaign = jest.fn().mockResolvedValueOnce(null);

    await expect(updateCampaignUseCase.call(dto)).rejects.toThrow();
  });
});
