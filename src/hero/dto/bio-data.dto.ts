import { ApiProperty } from '@nestjs/swagger';


export class BioDataDto {
  race: string;
  gender: string;
  eyes: string;
  hair: string;
  age: number;
  height: number;
  starSymbol: string;
  specialMarks: string;
  placeOfBirth: string;
  family: string;
  mentalIssues: string;
  scarsAndWounds: string;
  deity: string;
  story: string;
}
