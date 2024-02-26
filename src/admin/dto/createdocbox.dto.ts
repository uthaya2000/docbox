import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDocBoxDto {
  @IsNotEmpty()
  displayName: string;

  @IsOptional()
  userId: number;
}
