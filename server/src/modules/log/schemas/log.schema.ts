import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Log {
  @Prop({ required: true })
  ip: string;

  @Prop({ required: true })
  logLevel: string;

  @Prop({ required: true })
  message: string;
}

const LogSchema = SchemaFactory.createForClass(Log);

LogSchema.set('timestamps', true);

export { LogSchema };
