import {FastifyInstance, FastifyPluginAsync, FastifyReply, FastifyRequest} from "fastify";
import * as UserController from "../controllers/userController";
import * as NewsController from "../controllers/newsController";
import * as TopicController from "../controllers/topicController";
import * as NewsFetchController from "../controllers/newsFetchController";
import {validateBody} from "../plugins/validate";
import {CreateTopicRequest} from "../dto/topicDto";

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

  fastify.register(async (topicRoutes: FastifyInstance) => {
    topicRoutes.post('', {preValidation: validateBody(CreateTopicRequest)}, TopicController.NewCreateTopic)
  }, {prefix: "/topic"});

  fastify.register(async (newsFetchRoutes: FastifyInstance) => {
    newsFetchRoutes.post('/:id', NewsFetchController.SingleNewsFetchController);
    newsFetchRoutes.post('', NewsFetchController.AllTopicsFetchController);
  }, {prefix: "/news-fetch"});
};
export default apiRoutes;
