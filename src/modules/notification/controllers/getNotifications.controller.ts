import { JwtAuthGuard } from '@auth/guards/accessToken.guard';
import { ResponseTransformInterceptor } from '@interceptors/responseTransform.interceptor';
import {
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GetNotficationResponseDto } from '@notification/dtos/getNotificationsResponse.dto';
import { GetNotificationsService } from '@notification/services/getNotification.service';

@Controller('notifications')
export class GetNotificationsController {
  constructor(private _getNotificationService: GetNotificationsService) {}

  @Get()
  @ApiTags('Notifications')
  @UseInterceptors(ResponseTransformInterceptor, ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: GetNotficationResponseDto,
  })
  async getNotifications(
    @Request() { user },
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    limit = limit > 20 ? 20 : limit;
    return await this._getNotificationService.getNotificationsByUserId(user, {
      limit,
      page,
    });
  }
}
