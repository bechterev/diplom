import { Test, TestingModule } from '@nestjs/testing';
import { SupportrequestService } from './supportrequest.service';

describe('SupportrequestService', () => {
  let service: SupportrequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportrequestService],
    }).compile();

    service = module.get<SupportrequestService>(SupportrequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
