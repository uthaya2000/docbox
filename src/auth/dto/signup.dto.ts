import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  name: string;

  @IsEnum(UserRole)
  @IsOptional()
  role: UserRole;
}
