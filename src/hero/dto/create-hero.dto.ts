import { BaseStatsDto } from './base-stats.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHeroDto {
  public name: string;
  public surname: string;
  public race: string;
  public campaignCode: string;
  public baseStats: BaseStatsDto;

}
