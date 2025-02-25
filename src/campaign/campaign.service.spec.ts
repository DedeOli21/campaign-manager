import { Test, TestingModule } from '@nestjs/testing';
import { CampaignService } from './campaign.service';
import { Campaign, CampaignStatus } from './entities/campaign.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

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
    softDelete: jest.fn(),
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

  describe('create', () => {
    it('should create a campaign', async () => {
      const newCampaign: Campaign = {
        id: 6,
        name: 'Campanha 6',
        createdAt: new Date(),
        startDate: new Date('2025-02-26'),
        endDate: new Date('2025-02-28'),
        status: CampaignStatus.PAUSED,
        category: 'Tecnologia',
      };

      mockRepository.save.mockResolvedValue(newCampaign);

      const createdCampaign = await service.create(newCampaign);

      expect(createdCampaign).toEqual(newCampaign);
      expect(mockRepository.save).toHaveBeenCalledWith(newCampaign);
    });

    it('should create a campaign', async () => {
      const newCampaign = {
        id: 6,
        name: 'Campanha 6',
        createdAt: new Date(),
        startDate: new Date('2025-02-26'),
        endDate: new Date('2025-02-28'),
        category: 'Tecnologia',
      };

      mockRepository.save.mockResolvedValue(newCampaign as Campaign);

      const createdCampaign = await service.create(newCampaign as Campaign); ;

      expect(createdCampaign).toEqual(newCampaign);
      expect(mockRepository.save).toHaveBeenCalledWith({...newCampaign, status: CampaignStatus.ACTIVE});
    });

    it('if the end date is before the start date, should throw an error', async () => {
      const newCampaign: Campaign = {
        id: 6,
        name: 'Campanha 6',
        createdAt: new Date(),
        startDate: new Date('2025-02-20'),
        endDate: new Date('2025-02-19'),
        status: CampaignStatus.ACTIVE,
        category: 'Tecnologia',
      };

      mockRepository.save.mockResolvedValue(newCampaign);

      await expect(service.create(newCampaign)).rejects.toThrow();
    });

    it('if the end date for less than date now, should be status expired', async () => {
      const newCampaign: Campaign = {
        id: 6,
        name: 'Campanha 6',
        createdAt: new Date(),
        startDate: new Date('2025-02-27T10:00:00.000Z'),
        endDate: new Date('2025-02-24T11:00:00.000Z'),
        status: CampaignStatus.EXPIRED,
        category: 'Tecnologia',
      };

      mockRepository.save.mockResolvedValue(newCampaign);

      const createdCampaign = await service.create(newCampaign);

      expect(createdCampaign.status).toEqual(CampaignStatus.EXPIRED);
    });

    it('if the end date is before the start date, should throw an error', async () => {
      const newCampaign: Campaign = {
        id: 6,
        name: 'Campanha 6',
        createdAt: new Date(),
        startDate: new Date('2025-02-29'),
        endDate: new Date('2025-02-26'),
        status: CampaignStatus.ACTIVE,
        category: 'Tecnologia',
      };

      mockRepository.save.mockResolvedValue(newCampaign);

      await expect(service.create(newCampaign)).rejects.toThrow();
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('find', () => {
    it('should return an array of campaigns', async () => {
      const campaigns = await service.findAll();
      expect(campaigns).toHaveLength(5);
      expect(campaigns).toEqual(mockCampaigns);
    });

    it('should return a campaign by id', async () => {
      const campaign = await service.findOne(1);
      expect(campaign).toEqual(mockCampaigns[0]);
    });

    it('should throw an error if campaign does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(6)).rejects.toThrow();
    });
  })

  describe('update', () => {
    it('should update a campaign', async () => {
      const updatedCampaign: Campaign = {
        id: 1,
        name: 'Campanha 1 atualizada',
        createdAt: new Date(),
        startDate: new Date('2025-02-26'),
        endDate: new Date('2025-02-28'),
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

    it('should create without input date, and status', async () => {
      const updatedCampaign = {
        id: 1,
        name: 'Campanha 1 atualizada',
        createdAt: new Date(),
        category: 'Marketing',
      };

      const campaign = mockCampaigns[0];

      mockRepository.findOne.mockResolvedValue(campaign);
      mockRepository.save.mockResolvedValue(updatedCampaign);

      const result = await service.update(updatedCampaign.id, updatedCampaign);

      expect(result).toEqual(updatedCampaign);
    })
  })

  describe('remove', () => {
    it('should remove a campaign', async () => {
      const campaign = mockCampaigns[0];
  
      mockRepository.findOne.mockResolvedValue(campaign);
  
      await service.remove(campaign.id);
  
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: campaign.id },
      });
  
      expect(mockRepository.softDelete).toHaveBeenCalledWith(campaign.id);
    });
  });

});
