import {FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest} from "fastify";
import * as UserController from "src/controllers/user.controllers";
import * as NewsController from "src/controllers/news.controller";

const apiRoutes: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/ping", async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    reply.code(200).send({
      success: true,
      message: "pong",
    });
  });

  // route with authentication here
  fastify.register(async (authRoutes: FastifyInstance): Promise<void> => {
    authRoutes.addHook("preValidation", fastify.customAuthenticate);

    fastify.register(
      async (userRoutes: FastifyInstance): Promise<void> => {
        userRoutes.get("/profile", UserController.UserGetProfileController);
      },
      {
        prefix: "user",
      }
    );
  });

  fastify.register(async (newsRoutes: FastifyInstance) => {
    newsRoutes.get("/", NewsController.NewsListController);
    newsRoutes.get("/trending", NewsController.NewsTrendingController);
  }, {prefix: "/news"});

};
export default apiRoutes;
