import { Test, TestingModule } from '@nestjs/testing';
import { ExternalStatsProviderController } from './external-stats-provider.controller';
import { ExternalStatsProviderService } from './external-stats-provider.service';

describe('ExternalStatsProviderController', () => {
  let externalStatsProviderController: ExternalStatsProviderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExternalStatsProviderController],
      providers: [ExternalStatsProviderService],
    }).compile();

    externalStatsProviderController = app.get<ExternalStatsProviderController>(ExternalStatsProviderController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(externalStatsProviderController.getHello()).toBe('Hello World!');
    });
  });
});
