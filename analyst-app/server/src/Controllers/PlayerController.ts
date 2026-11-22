import { BadRequestException, Controller, HttpException, HttpStatus, Post, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthExceptionFilter } from '../Filters/AuthExceptionsFilter';
import { PlayerUploadExceptionFilter } from '../Filters/PlayerUploadExceptionFilter';
import { AuthenticatedGuard } from '../Services/Guards/AuthenticatedGuard';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlayerService, MAX_PCAP_BYTES } from '../Services/Player/PlayerService';

// Keep the existing route and multipart field ("file"). The limit is enforced by multer
// before the buffer reaches the import worker.
@UseFilters(AuthExceptionFilter)
@UseGuards(AuthenticatedGuard)
@Controller('api/player')
export class PlayerController {
    constructor(private readonly playerService: PlayerService) {}

    @Post('upload')
    @UseFilters(PlayerUploadExceptionFilter)
    @UseInterceptors(FileInterceptor('file', { limits: { fileSize: MAX_PCAP_BYTES } }))
    async uploadDump(@UploadedFile() file) {
        if (!file || !file.buffer || !file.buffer.length) {
            throw new BadRequestException('A non-empty PCAP file is required');
        }
        return this.playerService.uploadDump(file.buffer);
    }
}
