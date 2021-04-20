import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTournamentDto } from '../dtos/createTournament.dto';
import { TournamentDto } from '../dtos/tournament.dto';
import { TournamentService } from '../services/tournament.service';

@Controller('v1')
export class TournamentController {}
