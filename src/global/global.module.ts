import { Global, Module } from '@nestjs/common';
import { UserProvider } from './user.provider';

@Global()
@Module({
  providers: [UserProvider],
  exports: [UserProvider],
})
export class GlobalModule {}
