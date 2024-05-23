const fastify = require("fastify")({ logger: true });
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";

// Load environment variables
config();

// Middleware to check API key
const apiKeyMiddleware = async (request, reply) => {
  const apiKey = process.env.API_KEY;
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader || authorizationHeader !== `Bearer ${apiKey}`) {
    reply.status(401).send({ status: "error", message: "Unauthorized" });
  }
};

const setup = async () => {
  const prisma = new PrismaClient();
  await fastify.register(require("@fastify/swagger"));
  await fastify.register(require("@fastify/swagger-ui"), {
    routePrefix: "/documentation",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next();
      },
      preHandler: function (request, reply, next) {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject;
    },
    transformSpecificationClone: true,
  });

  // Schema for the request body
  const registerDomainSchema = {
    body: {
      type: "object",
      required: ["subdomain", "url"],
      properties: {
        subdomain: { type: "string" },
        url: { type: "string", format: "uri" },
      },
    },
  };

  // Register a new subdomain with a URL to redirect to
  fastify.post(
    "/v1/register-domain",
    { schema: registerDomainSchema, preHandler: apiKeyMiddleware },
    async (request, reply) => {
      const { subdomain, url } = request.body as {
        subdomain: string;
        url: string;
      };

      try {
        await prisma.redirect.create({
          data: { subdomain, url },
        });
        return reply.status(200).send({ status: "ok" });
      } catch (error) {
        return reply
          .status(400)
          .send({ status: "error", message: "Failed to register domain" });
      }
    },
  );

  // Handle redirection based on the subdomain
  fastify.get("/", async (request, reply) => {
    const host = request.headers.host;
    const subdomain = host?.split(".")[0];

    if (subdomain) {
      const redirect = await prisma.redirect.findUnique({
        where: { subdomain },
      });

      if (redirect) {
        return reply.redirect(301, redirect.url);
      }
    }

    return reply
      .status(404)
      .send({ status: "error", message: "Subdomain not found" });
  });

  // Custom error handler
  fastify.setErrorHandler((error, request, reply) => {
    if (error.validation) {
      // Handle validation errors
      reply.status(400).send({
        status: "error",
        message: "Invalid request",
        details: error.validation,
      });
    } else {
      // Handle other errors
      reply.status(500).send({
        status: "error",
        message: "Internal Server Error",
      });
    }
  });
  return fastify;
};

const start = async () => {
  await setup();
  try {
    await fastify.listen({
      port: 3000,
      host: "0.0.0.0",
    });
    console.log(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
