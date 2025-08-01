import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";
import {FastifyRequest, FastifyReply} from "fastify";

export function validateBody<T extends object>(dtoClass: new () => T) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const dto = plainToInstance(dtoClass, request.body, {
      excludeExtraneousValues: true,
    });

    const errors = await validate(dto);

    if (errors.length > 0) {
      const messages = errors.map((err) => ({
        property: err.property,
        messages: Object.values(err.constraints || {}),
      }));

      reply.code(400).send({
        success: false,
        message: "Validation failed",
        errors: messages,
      });
      return;
    }

    request.body = dto as any;
  };
}
