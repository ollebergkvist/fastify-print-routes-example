import Fastify from "fastify";
import { join } from "path";
import { fileURLToPath } from "url";
import autoLoad from "@fastify/autoload";
import fastifyPrintRoutes from "fastify-print-routes";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

export default function createFastifyInstance() {
  const fastify = Fastify({
    logger: true,
  });

  return fastify;
}

const directoryName = fileURLToPath(new URL(".", import.meta.url));

const app = createFastifyInstance();

app.register(fastifyPrintRoutes, { useColors: true, compact: true });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(autoLoad, {
  dir: join(directoryName, "routes"),
  maxDepth: 4,
  scriptPattern: /(?<!\.d)\.(ts|tsx|js|jsx)$/,
});

const start = async () => {
  try {
    await app.listen({ port: 3000, host: "http://localhost" });
  } catch (error) {
    app.log.error(error);
    // @ts-ignore
    process.exit(1);
  }
};

start();
