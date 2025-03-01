import { DeleteCampaignUseCase } from '@app/usecases/campaign/delete-campaign.use-case';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getLoggerToken } from 'nestjs-pino';
import { LoggerServiceMock } from '@test/mocks/logger.service.mock';
import { Campaign } from '@domain/entities/campaign.entity';
import { CampaignStatus } from '@shared/const/status-campaign';

const mockDto = (props?: Partial<Campaign>) => {
  return {
    name: 'Campanha 6',
    createdAt: new Date(),
    startDate: new Date('2026-08-28'),
    endDate: new Date('2026-09-28'),
    status: CampaignStatus.ACTIVE,
    category: 'Tecnologia',
    ...props,
  };
};

describe('deleteCampaign', () => {
  const mockRepository = {
    deleteCampaign: jest.fn((deleteCampaignDto) => {
      return {
        message: `Campaign with ID ${deleteCampaignDto.id} successfully deleted.`,
      };
    }),
    findCampaign: jest.fn().mockImplementation(() => mockDto()),
  };

  let deleteCampaignUseCase: DeleteCampaignUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteCampaignUseCase,
        {
          provide: CampaignRepository,
          useValue: mockRepository,
        },
        {
          provide: getLoggerToken(DeleteCampaignUseCase.name),
          useClass: LoggerServiceMock,
        },
        {
          provide: 'pino-params',
          useValue: {},
        },
      ],
    }).compile();

    deleteCampaignUseCase = module.get<DeleteCampaignUseCase>(
      DeleteCampaignUseCase,
    );

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(deleteCampaignUseCase).toBeDefined();
  });

  it('should delete a campaign', async () => {
    const dto = { id: 1 };
    jest
      .spyOn(mockRepository, 'findCampaign')
      .mockResolvedValueOnce(mockDto({ id: 1 }));

    const result = await deleteCampaignUseCase.call(dto);

    expect(result.message).toEqual(
      `Campaign with ID ${dto.id} successfully deleted.`,
    );
    expect(mockRepository.deleteCampaign).toHaveBeenCalledWith(dto);
  });

  it('should throw an error if campaign does not exist', async () => {
    mockRepository.findCampaign.mockRejectedValueOnce(
      new Error('error') as never,
    );

    await expect(deleteCampaignUseCase.call({ id: 999 })).rejects.toThrow();
  });

  it('should throw an error if campaign does not exist', async () => {
    mockRepository.findCampaign.mockResolvedValueOnce(mockDto());

    await expect(deleteCampaignUseCase.call({ id: 1 })).rejects.toThrow();
  });
});
