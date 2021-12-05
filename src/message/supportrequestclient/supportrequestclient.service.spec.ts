import { Test, TestingModule } from '@nestjs/testing';
import { SupportRequestClientService } from './supportrequestclient.service';

describe('SupportrequestclientService', () => {
  let service: SupportRequestClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportRequestClientService],
    }).compile();

    service = module.get<SupportRequestClientService>(SupportRequestClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
