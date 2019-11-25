import { Controller, Get } from '@nestjs/common';
import { FlowViewProvider } from '../../flow/flow.view.provider';

@Controller('api/flow')
export class FlowController {
    constructor(private readonly flowViewProvider: FlowViewProvider) {}

    @Get('list')
    async getFlows(): Promise<any> {
        return this.flowViewProvider.getFlows();
    }
}
