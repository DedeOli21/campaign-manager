import { DeleteCampaignUseCase } from '@app/usecases/campaign/delete-campaign.use-case';
import { CampaignRepository } from '@domain/repositories/campaign.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { getLoggerToken } from 'nestjs-pino';
import { LoggerServiceMock } from '@test/mocks/logger.service.mock';

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

    const result = await deleteCampaignUseCase.call(dto);

    expect(result).toEqual(`Campaign with ID ${dto.id} successfully deleted.`);
    expect(mockRepository.deleteCampaign).toHaveBeenCalledWith(dto);
  });

  it('should throw an error if campaign does not exist', async () => {
    mockRepository.deleteCampaign.mockRejectedValueOnce(
      new Error('error') as never,
    );

    await expect(deleteCampaignUseCase.call({ id: 999 })).rejects.toThrow();
  });

  // it('should call logger.error on exception', async () => {
  //   jest
  //     .spyOn(mockRepository, 'deleteCampaign')
  //     .mockRejectedValue(new Error('Deletion failed') as never);

  //   await expect(deleteCampaignUseCase.call({ id: 1 })).rejects.toThrow();
  //   expect(logger.error).toHaveBeenCalledWith(expect.any(Error));
  // });
});
