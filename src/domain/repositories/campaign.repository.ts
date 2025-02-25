export abstract class CampaignRepository {
    createCampaign: (createCampaignDto) => Promise<any>;
    deleteCampaign: (id: number) => Promise<any>;
    findCampaign: (id: number) => Promise<any>;
    updateCampaign: (id: number, updateCampaignDto: any) => Promise<any>;
    listCampaigns: () => Promise<any>;
}