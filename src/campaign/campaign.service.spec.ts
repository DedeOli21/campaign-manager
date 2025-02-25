import { Test, TestingModule } from '@nestjs/testing';
import { CampaignService } from './campaign.service';
import { Campaign, CampaignStatus } from './entities/campaign.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { create } from 'domain';

describe('CampaignService', () => {
  let service: CampaignService;
  let repository: Repository<Campaign>;

  const mockCampaigns: Campaign[] = [
    {
      id: 1,
      name: 'Campanha 1',
      createdAt: new Date(),
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      status: CampaignStatus.ACTIVE,
      category: 'Marketing',
    },
    {
      id: 2,
      name: 'Campanha 2',
      createdAt: new Date(),
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      status: CampaignStatus.PAUSED,
      category: 'Financeiro',
    },
    {
      id: 3,
      name: 'Campanha 3',
      createdAt: new Date(),
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      status: CampaignStatus.EXPIRED,
      category: 'Educação',
    },
    {
      id: 4,
      name: 'Campanha 4',
      createdAt: new Date(),
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      status: CampaignStatus.ACTIVE,
      category: 'Saúde',
    },
    {
      id: 5,
      name: 'Campanha 5',
      createdAt: new Date(),
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      status: CampaignStatus.ACTIVE,
      category: 'Esportes',
    },
  ];

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(mockCampaigns),
    findOne: jest.fn().mockResolvedValue(mockCampaigns[0]),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CampaignService,
        {
          provide: getRepositoryToken(Campaign),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CampaignService>(CampaignService);
    repository = module.get<Repository<Campaign>>(getRepositoryToken(Campaign));

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of campaigns', async () => {
    const campaigns = await service.findAll();
    expect(campaigns).toHaveLength(5);
    expect(campaigns).toEqual(mockCampaigns);
  });

  it('should create a campaign', async () => {
    const newCampaign: Campaign = {
      id: 6,
      name: 'Campanha 6',
      createdAt: new Date(),
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      status: CampaignStatus.ACTIVE,
      category: 'Tecnologia',
    };

    mockRepository.save.mockResolvedValue(newCampaign);

    const createdCampaign = await service.create(newCampaign);

    expect(createdCampaign).toEqual(newCampaign);
    expect(mockRepository.save).toHaveBeenCalledWith(newCampaign);
  });

  it('should update a campaign', async () => {
    const updatedCampaign: Campaign = {
      id: 1,
      name: 'Campanha 1 atualizada',
      createdAt: new Date(),
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      status: CampaignStatus.ACTIVE,
      category: 'Marketing',
    };
  
    mockRepository.findOne.mockResolvedValue(updatedCampaign);
    mockRepository.save.mockResolvedValue(updatedCampaign);
  
    await service.update(updatedCampaign.id, updatedCampaign);

    const result = await service.update(updatedCampaign.id, updatedCampaign);

    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { id: updatedCampaign.id },
    });
  
    expect(mockRepository.save).toHaveBeenCalledWith(updatedCampaign);
  
    expect(result).toEqual(updatedCampaign);
  });
});
