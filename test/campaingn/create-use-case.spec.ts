import { CreateCampaignUseCase } from "@app/usecases/campaign/create-campaign.use-case";
import { Campaign, CampaignStatus } from "@domain/campaign/campaign.entity";
import { CampaignRepository } from "@domain/repositories/campaign.repository";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { CreateCampaignDto } from "@presentation/campaign/dto/create-campaign.dto";

const mockedCreateCampaignUseCase = {
    provide: CreateCampaignUseCase,
    useValue: {
        call: jest.fn().mockImplementation((campaign: CreateCampaignDto) => {
            return {
                ...campaign,
                status: campaign.status ?? CampaignStatus.ACTIVE,
            };
        }),
    },
};

const mockDto = (props?: Partial<CreateCampaignDto>) => {
    return {
        name: 'Campanha 6',
        createdAt: new Date(),
        startDate: new Date('2025-02-27'),
        endDate: new Date('2025-02-28'),
        status: CampaignStatus.ACTIVE,
        category: 'Tecnologia',
        ...props,
    };
}
describe('createCampaign', () => {
    const mockRepository = {
        createCampaign: jest.fn((data) => (data))
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
          ],
        }).compile();
    
        createCampaignUseCase = module.get<CreateCampaignUseCase>(CreateCampaignUseCase);
    
        jest.clearAllMocks();
      });


      it('should be defined', () => {
        expect(createCampaignUseCase).toBeDefined();
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
  
        // expect(createdCampaign).toEqual({
        //     ...dto,
        //     status: CampaignStatus.ACTIVE, // Deve estar preenchido corretamente
        //   });
        
          expect(mockRepository.createCampaign).toHaveBeenCalledWith({
            ...dto,
            status: CampaignStatus.ACTIVE, // Verificando se foi criado corretamente
          });
      });

      it('if the end date is before the start date, should throw an error', async () => {
        const dto = mockDto({ endDate: new Date('2025-02-25'), startDate: new Date('2025-02-26') });
  
        await expect(createCampaignUseCase.call(dto)).rejects.toThrow();
      });


      it('if the end date for less than date now, should be status expired', async () => {
        const dto = mockDto({ endDate: new Date('2021-02-28') });
  
        mockRepository.createCampaign.mockResolvedValue(dto);
  
        const createdCampaign = await createCampaignUseCase.call(dto);
  
        expect(createdCampaign.status).toEqual(CampaignStatus.EXPIRED);
      });

      it('if the end date is before the start date, should throw an error', async () => {
        const dto = mockDto({ endDate: new Date('2025-02-25'), startDate: new Date('2025-02-26') });
  
        mockRepository.createCampaign.mockResolvedValue(dto);
  
        await expect(createCampaignUseCase.call(dto)).rejects.toThrow();
      });
});