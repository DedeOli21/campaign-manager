import { ListCampaignUseCase } from '@app/usecases/campaign/list-campaign.use-case';
import { CampaignStatus } from '@domain/campaign/campaign.entity';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { Test, TestingModule } from '@nestjs/testing';

const mockDto = () => {
  return [
    {
      id: 1,
      name: 'Campanha 6',
      createdAt: new Date('2025-02-27'),
      startDate: new Date('2025-02-27'),
      endDate: new Date('2025-02-28'),
      status: CampaignStatus.ACTIVE,
      category: 'Tecnologia',
    },
    {
      id: 1,
      name: 'Campanha 6',
      createdAt: new Date('2025-02-27'),
      startDate: new Date('2025-02-27'),
      endDate: new Date('2025-02-28'),
      status: CampaignStatus.ACTIVE,
      category: 'Tecnologia',
    },
    {
      id: 1,
      name: 'Campanha 6',
      createdAt: new Date('2025-02-27'),
      startDate: new Date('2025-02-27'),
      endDate: new Date('2025-02-28'),
      status: CampaignStatus.ACTIVE,
      category: 'Tecnologia',
    },
    {
      id: 1,
      name: 'Campanha 6',
      createdAt: new Date('2025-02-27'),
      startDate: new Date('2025-02-27'),
      endDate: new Date('2025-02-28'),
      status: CampaignStatus.ACTIVE,
      category: 'Tecnologia',
    },
    {
      id: 1,
      name: 'Campanha 6',
      createdAt: new Date('2025-02-27'),
      startDate: new Date('2025-02-27'),
      endDate: new Date('2025-02-28'),
      status: CampaignStatus.ACTIVE,
      category: 'Tecnologia',
    },
    {
      id: 1,
      name: 'Campanha 6',
      createdAt: new Date('2025-02-27'),
      startDate: new Date('2025-02-27'),
      endDate: new Date('2025-02-28'),
      status: CampaignStatus.ACTIVE,
      category: 'Tecnologia',
    },
  ];
};
describe('findCampaign', () => {
  const mockRepository = {
    listCampaigns: jest.fn().mockResolvedValue(mockDto()),
  };

  let listCampaignUseCase: ListCampaignUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListCampaignUseCase,
        {
          provide: CampaignRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    listCampaignUseCase = module.get<ListCampaignUseCase>(ListCampaignUseCase);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(listCampaignUseCase).toBeDefined();
  });

  it('should return a list of campaigns', async () => {
    const expectedCampaigns = mockDto();

    const campaigns = await listCampaignUseCase.call();

    expect(campaigns).toEqual(expectedCampaigns);
    expect(mockRepository.listCampaigns).toHaveBeenCalledTimes(1);
  });

  it('should throw an error if repository fails', async () => {
    mockRepository.listCampaigns.mockRejectedValueOnce(
      new Error('Campaign not found'),
    );

    await expect(listCampaignUseCase.call()).rejects.toThrow(
      'Campaign not found',
    );
  });
});
