import {Expose} from "class-transformer";
import {IsString, IsObject, IsOptional} from "class-validator";

export class ListArticleResponse {

  @Expose()
  @IsString()
  uri?: string;

  @Expose()
  @IsString()
  uuid?: string;

  @Expose()
  @IsString()
  @IsOptional()
  title?: string;

  @Expose()
  @IsString()
  body?: string;

  @Expose()
  @IsString()
  date?: string;

  @Expose()
  @IsString()
  time?: string;

  @Expose()
  @IsString()
  image?: string;

  @Expose()
  @IsObject()
  source?: object;

  @Expose()
  @IsString()
  url?: string;
}
