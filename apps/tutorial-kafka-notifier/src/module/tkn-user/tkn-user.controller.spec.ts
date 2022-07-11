import { Test, TestingModule } from '@nestjs/testing';
import { TknUserController } from './tkn-user.controller';

describe('TknUserController', () => {
  let controller: TknUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TknUserController],
    }).compile();

    controller = module.get<TknUserController>(TknUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
