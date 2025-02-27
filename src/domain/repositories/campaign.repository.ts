import { Campaign } from "@domain/campaign/campaign.entity";
import { CreateCampaignDto } from "@presentation/campaign/dto/create-campaign.dto";
import { DeleteCampaignDto } from "@presentation/campaign/dto/delete-campaign.dto";
import { FindCampaignDto } from "@presentation/campaign/dto/find-campaign.dto";
import { UpdateCampaignDto } from "@presentation/campaign/dto/update-campaign.dto";

export abstract class CampaignRepository {
  createCampaign: (createCampaignDto: CreateCampaignDto) => Promise<Campaign>;
  deleteCampaign: (deleteCampaign: DeleteCampaignDto) => Promise<object>;
  findCampaign: (findCampaign: FindCampaignDto) => Promise<Campaign | null>;
  updateCampaign: (updateCampaign: UpdateCampaignDto) => Promise<Campaign>;
  listCampaigns: () => Promise<Campaign[]>;
}
