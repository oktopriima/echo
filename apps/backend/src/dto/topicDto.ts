import {Expose} from "class-transformer";
import {IsNotEmpty, IsString} from "class-validator";

export class CreateTopicRequest {
  @Expose()
  @IsNotEmpty()
  @IsString()
  owner!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  keyword!: string;

  @Expose()
  @IsString()
  categories!: string;

  @Expose()
  @IsString()
  country!: string;

  @Expose()
  @IsString()
  language!: string;

  @Expose()
  @IsString()
  sorting!: string;
}