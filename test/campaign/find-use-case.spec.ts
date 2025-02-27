import { FindCampaignUseCase } from '@app/usecases/campaign/find-campaign.use-case';
import { CampaignStatus } from '@domain/entities/campaign.entity';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { FindCampaignDto } from '@presentation/campaign/dto/find-campaign.dto';

const mockDto = (props?: Partial<FindCampaignDto>) => {
  return [
    {
      id: 1,
      name: 'Campanha 6',
      createdAt: new Date('2025-02-26'),
      startDate: new Date('2025-02-27'),
      endDate: new Date('2025-02-28'),
      status: CampaignStatus.ACTIVE,
      category: 'Tecnologia',
      ...props,
    },
  ];
};
describe('findCampaign', () => {
  const mockRepository = {
    findCampaign: jest.fn(({ id }) => {
      const campaign = mockDto().find((c) => c.id === id);
      return campaign ?? null;
    }),
  };

  let findCampaignUseCase: FindCampaignUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindCampaignUseCase,
        {
          provide: CampaignRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    findCampaignUseCase = module.get<FindCampaignUseCase>(FindCampaignUseCase);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(findCampaignUseCase).toBeDefined();
  });

  it('should return a campaign by id', async () => {
    const dto = mockDto()[0];

    const campaign = await findCampaignUseCase.call({ id: dto.id });

    expect(campaign).toEqual(dto);
  });

  it('should throw an error if campaign does not exist', async () => {
    mockRepository.findCampaign.mockRejectedValueOnce(
      new Error('Campaign not found') as never,
    );

    await expect(findCampaignUseCase.call({ id: 999 })).rejects.toThrow();
  });
});
