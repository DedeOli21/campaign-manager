import { Test, TestingModule } from '@nestjs/testing';
import { CreateCampaignUseCase } from '@app/usecases/campaign/create-campaign.use-case';
import { DeleteCampaignUseCase } from '@app/usecases/campaign/delete-campaign.use-case';
import { FindCampaignUseCase } from '@app/usecases/campaign/find-campaign.use-case';
import { FindAllCampaignUseCase } from '@app/usecases/campaign/findAll-campaign.use-case';
import { UpdateCampaignUseCase } from '@app/usecases/campaign/update-campaign.use-case';
import { Campaign, CampaignStatus } from '@domain/campaign/campaign.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CampaignService', () => {
  let createCampaign: CreateCampaignUseCase;
  let deleteCampaign: DeleteCampaignUseCase;
  let findCampaign: FindCampaignUseCase;
  let findAllCampaign: FindAllCampaignUseCase;
  let updateCampaign: UpdateCampaignUseCase;

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
        CreateCampaignUseCase,
        DeleteCampaignUseCase,
        FindAllCampaignUseCase,
        FindCampaignUseCase,
        UpdateCampaignUseCase,
        {
          provide: getRepositoryToken(Campaign),
          useValue: mockRepository,
        },
      ],
    }).compile();

    createCampaign = module.get<CreateCampaignUseCase>(CreateCampaignUseCase);
    deleteCampaign = module.get<DeleteCampaignUseCase>(DeleteCampaignUseCase);
    updateCampaign = module.get<UpdateCampaignUseCase>(UpdateCampaignUseCase);
    findAllCampaign = module.get<FindAllCampaignUseCase>(
      FindAllCampaignUseCase,
    );
    findCampaign = module.get<FindCampaignUseCase>(FindCampaignUseCase);

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

      const createdCampaign = await createCampaign.call(newCampaign);

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

      const createdCampaign = await createCampaign.call(
        newCampaign as Campaign,
      );

      expect(createdCampaign).toEqual(newCampaign);
      expect(mockRepository.save).toHaveBeenCalledWith({
        ...newCampaign,
        status: CampaignStatus.ACTIVE,
      });
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

      await expect(createCampaign.call(newCampaign)).rejects.toThrow();
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

      const createdCampaign = await createCampaign.call(newCampaign);

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

      await expect(createCampaign.call(newCampaign)).rejects.toThrow();
    });
  });

  it('should be defined', () => {
    expect(createCampaign).toBeDefined();
  });

  describe('find', () => {
    it('should return an array of campaigns', async () => {
      const campaigns = await findAllCampaign.call();
      expect(campaigns).toHaveLength(5);
      expect(campaigns).toEqual(mockCampaigns);
    });

    it('should return a campaign by id', async () => {
      const campaign = await findCampaign.call({ id: 1 });
      expect(campaign).toEqual(mockCampaigns[0]);
    });

    it('should throw an error if campaign does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(findCampaign.call({ id: 1 })).rejects.toThrow();
    });
  });

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

      await updateCampaign.call({ id: updatedCampaign.id, ...updatedCampaign });

      const result = await updateCampaign.call({
        id: updatedCampaign.id,
        ...updatedCampaign,
      });

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

      const result = await updateCampaign.call({
        id: updatedCampaign.id,
        ...updatedCampaign,
      });

      expect(result).toEqual(updatedCampaign);
    });
  });

  describe('remove', () => {
    it('should remove a campaign', async () => {
      const campaign = mockCampaigns[0];

      mockRepository.findOne.mockResolvedValue(campaign);

      await deleteCampaign.call({ id: campaign.id });

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: campaign.id },
      });

      expect(mockRepository.softDelete).toHaveBeenCalledWith(campaign.id);
    });
  });
});
