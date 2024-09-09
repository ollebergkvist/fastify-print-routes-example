import { type FastifyInstance } from "fastify";
import {
  type FastifyPluginAsyncZod,
  type ZodTypeProvider,
} from "fastify-type-provider-zod";
import z from "zod";

const testRoute: FastifyPluginAsyncZod = async function (
  fastify: FastifyInstance
) {
  fastify.withTypeProvider<ZodTypeProvider>().route({
    method: "POST",
    url: "/test",
    schema: {
      querystring: z.object({
        fullName: z.string(),
        address: z.string(),
      }),
    },
    async handler(request, reply) {
      const { fullName, address } = request.query;

      try {
        return reply.code(200).send();
      } catch (error) {
        fastify.log.error(error);
      }
    },
  });
};

export default testRoute;
