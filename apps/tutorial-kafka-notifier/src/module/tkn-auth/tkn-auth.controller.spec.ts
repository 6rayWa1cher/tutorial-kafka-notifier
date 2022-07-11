import { Test, TestingModule } from '@nestjs/testing';
import { TknAuthController } from './tkn-auth.controller';

describe('AppAuthController', () => {
  let controller: TknAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TknAuthController],
    }).compile();

    controller = module.get<TknAuthController>(TknAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
