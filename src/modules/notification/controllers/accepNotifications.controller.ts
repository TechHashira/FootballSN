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
import { CreateReactionNotificationDto } from '@notification/dtos/CreateReactionNotification.dto';
import { ReactionNotificationService } from '@notification/services/reactionNotification.service';

@Controller('notifications/reactions')
export class AcceptNotificationsController {
  constructor(
    private _reactionNotificationService: ReactionNotificationService,
  ) {}

  @Post('teams-tournaments-accept')
  @ApiTags('Notifications')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    type: CreateNotficationResponseDto,
    description: 'Send a notification to the Coach owner of the team',
  })
  async acceptTeamToTournament(
    @Body() createReactionNotificationDto: CreateReactionNotificationDto,
  ) {
    return await this._reactionNotificationService.teamAllowedOnTournamentNotification(
      createReactionNotificationDto,
    );
  }
}
