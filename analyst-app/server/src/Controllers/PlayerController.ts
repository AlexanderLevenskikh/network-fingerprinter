import { Controller, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthExceptionFilter } from '../Filters/AuthExceptionsFilter';
import { AuthenticatedGuard } from '../Services/Guards/AuthenticatedGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlayerService } from '../Services/Player/PlayerService';

@UseFilters(AuthExceptionFilter)
@UseGuards(AuthenticatedGuard)
@Controller('api/player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadDump(@UploadedFile() file) {
        await this.playerService.uploadDump(file.buffer);
    }
}
