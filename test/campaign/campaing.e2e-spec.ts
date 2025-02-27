import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CampaignStatus } from '@shared/const/status-campaign';
import { setupDataSource } from './setup';
import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';

describe('Campaign API Integration Tests', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const datasource = await setupDataSource();

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DataSource)
      .useValue(datasource)
      .compile();

    app = moduleFixture.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/campaigns (POST) - deve criar uma nova campanha', async () => {
    const createCampaignDto = {
      name: 'Nova Campanha',
      startDate: '2026-02-28T00:00:00.000Z',
      endDate: '2026-03-28T00:00:00.000Z',
      category: 'Tecnologia',
    };

    const response = await request(app.getHttpServer())
      .post('/campaigns')
      .send(createCampaignDto)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toEqual(createCampaignDto.name);
    expect(response.body.status).toEqual(CampaignStatus.ACTIVE);
  });

  it('/campaigns (GET) - deve retornar todas as campanhas', async () => {
    const response = await request(app.getHttpServer())
      .get('/campaigns')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('/campaigns/:id (GET) - deve retornar uma campanha específica', async () => {
    const createCampaignDto = {
      name: 'Campanha para Busca',
      startDate: '2026-02-28T00:00:00.000Z',
      endDate: '2026-03-28T00:00:00.000Z',
      category: 'Marketing',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/campaigns')
      .send(createCampaignDto)
      .expect(201);

    const campaignId = createResponse.body.id;

    const response = await request(app.getHttpServer())
      .get(`/campaigns/${campaignId}`)
      .expect(200);

    expect(response.body.id).toEqual(campaignId);
    expect(response.body.name).toEqual(createCampaignDto.name);
  });

  it('/campaigns/:id (PUT) - deve atualizar uma campanha existente', async () => {
    const createCampaignDto = {
      name: 'Campanha para Atualização',
      startDate: '2026-02-28T00:00:00.000Z',
      endDate: '2026-03-28T00:00:00.000Z',
      category: 'Eventos',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/campaigns')
      .send(createCampaignDto)
      .expect(201);

    const campaignId = createResponse.body.id;

    const updateCampaignDto = {
      name: 'Campanha Atualizada',
      category: 'Atualização',
    };

    const updateResponse = await request(app.getHttpServer())
      .put(`/campaigns/${campaignId}`)
      .send(updateCampaignDto)
      .expect(200);

    expect(updateResponse.body.name).toEqual(updateCampaignDto.name);
    expect(updateResponse.body.category).toEqual(updateCampaignDto.category);
  });

  it('/campaigns/:id (DELETE) - deve remover (soft delete) uma campanha', async () => {
    const createCampaignDto = {
      name: 'Campanha para Deleção',
      startDate: '2026-02-28T00:00:00.000Z',
      endDate: '2026-03-28T00:00:00.000Z',
      category: 'Social',
    };

    const createResponse = await request(app.getHttpServer())
      .post('/campaigns')
      .send(createCampaignDto)
      .expect(201);

    const campaignId = createResponse.body.id;

    const deleteResponse = await request(app.getHttpServer())
      .delete(`/campaigns/${campaignId}`)
      .expect(200);

    expect(deleteResponse.body).toHaveProperty('message');
  });
});
