import { Controller, Get, UseGuards } from '@nestjs/common';
import { FlowViewProvider } from '../DAL/Flow/FlowViewProvider';
import { AuthenticatedGuard } from '../Services/Guards/AuthenticatedGuard';

@UseGuards(AuthenticatedGuard)
@Controller('api/flow')
export class FlowController {
    constructor(private readonly flowViewProvider: FlowViewProvider) {
    }

    @Get('list')
    async getFlows(): Promise<any> {
        return this.flowViewProvider.getFlows();
    }
}
