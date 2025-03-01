import { CreateCampaignUseCase } from '@app/usecases/campaign/create-campaign.use-case';
import { CampaignStatus } from '@shared/const/status-campaign';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateCampaignDto } from '@presentation/campaign/dto/create-campaign.dto';
import { getLoggerToken } from 'nestjs-pino';
import { LoggerServiceMock } from '@test/mocks/logger.service.mock';

const mockDto = (props?: Partial<CreateCampaignDto>) => {
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
describe('createCampaign', () => {
  const mockRepository = {
    createCampaign: jest.fn((data) => data),
  };

  let createCampaignUseCase: CreateCampaignUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateCampaignUseCase,
        {
          provide: CampaignRepository,
          useValue: mockRepository,
        },
        {
          provide: getLoggerToken(CreateCampaignUseCase.name),
          useClass: LoggerServiceMock,
        },
        {
          provide: 'pino-params',
          useValue: {},
        },
      ],
    }).compile();

    createCampaignUseCase = module.get<CreateCampaignUseCase>(
      CreateCampaignUseCase,
    );

    jest
      .useFakeTimers()
      .setSystemTime(new Date('2025-03-01T12:00:00Z').getTime());

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(createCampaignUseCase).toBeDefined();
    expect(createCampaignUseCase).toBeInstanceOf(CreateCampaignUseCase);
  });

  it('should create a campaign', async () => {
    const dto = mockDto();

    const result = await createCampaignUseCase.call(dto);

    expect(result).toEqual(dto);
    expect(mockRepository.createCampaign).toHaveBeenCalledWith(dto);
  });

  it('should create a campaign without status', async () => {
    const dto = mockDto({ status: null });

    const createdCampaign = await createCampaignUseCase.call(dto);

    expect(createdCampaign).toEqual({
      ...dto,
      status: CampaignStatus.ACTIVE,
    });

    expect(mockRepository.createCampaign).toHaveBeenCalledWith({
      ...dto,
      status: CampaignStatus.ACTIVE,
    });
  });

  it('if the end date is before the start date, should throw an error', async () => {
    const dto = mockDto({
      endDate: new Date('2025-05-25'),
      startDate: new Date('2025-06-26'),
    });

    await expect(createCampaignUseCase.call(dto)).rejects.toThrow();
  });

  it('if the end date for less than date now, should be status expired', async () => {
    const dto = mockDto({
      startDate: new Date('2025-03-02'),
      endDate: new Date('2025-02-26'),
    });

    const createdCampaign = await createCampaignUseCase.call(dto);

    expect(createdCampaign.status).toEqual(CampaignStatus.EXPIRED);
  });

  it('if the end date is before the start date, should throw an error', async () => {
    const dto = mockDto({
      startDate: new Date('2025-06-26'),
      endDate: new Date('2025-03-25'),
    });

    mockRepository.createCampaign.mockResolvedValue(dto);

    await expect(createCampaignUseCase.call(dto)).rejects.toThrow();
  });

  it('if the start date is before the now, should throw an error', async () => {
    const dto = mockDto({
      startDate: new Date('2024-06-26'),
      endDate: new Date('2025-03-25'),
    });

    mockRepository.createCampaign.mockResolvedValue(dto);

    await expect(createCampaignUseCase.call(dto)).rejects.toThrow();
  });

  it('if the end date for less than start date, should throw an error', async () => {
    const dto = mockDto({
      endDate: new Date('2026-02-25'),
      startDate: new Date('2026-02-26'),
    });

    await expect(createCampaignUseCase.call(dto)).rejects.toThrow();
  });
});
