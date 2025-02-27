import { DeleteCampaignUseCase } from '@app/usecases/campaign/delete-campaign.use-case';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { Test, TestingModule } from '@nestjs/testing';

describe('deleteCampaign', () => {
  const mockRepository = {
    deleteCampaign: jest.fn((deleteCampaignDto) => {
      return {
        message: `Campaign with ID ${deleteCampaignDto.id} successfully deleted.`,
      };
    }),
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

    const result = await deleteCampaignUseCase.call(dto);

    expect(result).toEqual({
      message: `Campaign with ID ${dto.id} successfully deleted.`,
    });
    expect(mockRepository.deleteCampaign).toHaveBeenCalledWith(dto);
  });

  it('should throw an error if campaign does not exist', async () => {
    mockRepository.deleteCampaign.mockRejectedValueOnce(
      new Error('Campaign not found') as never,
    );

    await expect(deleteCampaignUseCase.call({ id: 999 })).rejects.toThrow();
  });
});
