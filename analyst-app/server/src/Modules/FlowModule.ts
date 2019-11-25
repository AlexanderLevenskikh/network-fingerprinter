import { Module } from '@nestjs/common';
import { FlowController } from '../Web/Controllers/FlowController';
import { FlowViewProvider } from '../DAL/Flow/FlowViewProvider';

@Module({
    imports: [],
    controllers: [FlowController],
    providers: [FlowViewProvider],
})
export class FlowModule {}
