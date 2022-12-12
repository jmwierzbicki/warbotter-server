import { ApiProperty } from '@nestjs/swagger';

export class BaseStatsDto {
  @ApiProperty()
  ws: number;
  bs: number;
  s: number;
  t: number;
  ag: number;
  int: number;
  wp: number;
  fel: number;
  a: number;
  w: number;
  m: number;
  mag: number;
  ip: number;
  fp: number;
}
