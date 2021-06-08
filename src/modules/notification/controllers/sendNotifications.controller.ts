import { JwtAuthGuard } from '@auth/guards/accessToken.guard';
import { ResponseTransformInterceptor } from '@interceptors/responseTransform.interceptor';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateNotficationResponseDto } from '@notification/dtos/createNotificationResponse.dto';
import { SendNotificationMetadataDto } from '@notification/dtos/sendNotification.dto';
import { NotificationEntity } from '@notification/entities/notification.entity';
import { SendNotificationService } from '@notification/services/sendNotification.service';

@Controller('notifications')
export class SendNotificationsController {
  constructor(private _sendNotificationsService: SendNotificationService) {}

  @Post('teams-to-tournaments')
  @ApiTags('Notifications')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Successfully created',
    type: CreateNotficationResponseDto,
  })
  async teamToTournament(
    @Body() sendNotificationMetadataDto: SendNotificationMetadataDto,
  ): Promise<NotificationEntity> {
    return await this._sendNotificationsService.createNotificationTeamToTournament(
      sendNotificationMetadataDto,
    );
  }
}
