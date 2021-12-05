import { Test, TestingModule } from '@nestjs/testing';
import { SupportrequestController } from './supportrequest.controller';
import { SupportrequestService } from './supportrequest.service';

describe('SupportrequestController', () => {
  let controller: SupportrequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupportrequestController],
      providers: [SupportrequestService],
    }).compile();

    controller = module.get<SupportrequestController>(SupportrequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
