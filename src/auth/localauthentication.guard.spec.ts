import { LocalauthenticationGuard } from './localauthentication.guard';

describe('LocalauthenticationGuard', () => {
  it('should be defined', () => {
    expect(new LocalauthenticationGuard()).toBeDefined();
  });
});
