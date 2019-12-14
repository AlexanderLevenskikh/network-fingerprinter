import { Controller, Get } from '@nestjs/common';
import { FlowViewProvider } from '../../DAL/Flow/FlowViewProvider';

@Controller('api/flow')
export class FlowController {
    constructor(private readonly flowViewProvider: FlowViewProvider) {}

    @Get('list')
    async getFlows(): Promise<any> {
        return this.flowViewProvider.getFlows();
    }
}
