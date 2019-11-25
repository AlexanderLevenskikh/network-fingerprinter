import { Module } from '@nestjs/common';
import { FlowModule } from './Modules/FlowModule';

@Module({
  imports: [FlowModule],
})
export class AppModule {}
