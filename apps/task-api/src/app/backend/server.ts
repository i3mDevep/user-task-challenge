import express, { Express } from 'express';
import * as path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors'
import { TaskRoutes } from './routes/tasks.routes';
import { errorHandler } from './middlewares/error-handler';
import { UserRoutes } from './routes/users.routes';
import { LoginRoute } from './routes/login.route';
import { authenticateHandler } from './middlewares/authentication-handler';

export class ExpressApi {
  private port: number = Number(process.env.PORT) || 3333;
  constructor(private app: Express) {
    this.globalMiddlewares();
    this.mainRoutes();
    this.apiRoutes();

    this.app.use(errorHandler);

    this.run();
  }

  globalMiddlewares() {
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.app.use('/assets', express.static(path.join(__dirname, 'assets')));
  }

  run() {
    const server = this.app.listen(this.port, () => {
      console.log(`Listening  at http://localhost:${this.port}/api`);
    });
    server.on('error', console.error);
  }

  mainRoutes() {
    this.app.get('/api', (_, res) => {
      res.send({ message: 'Welcome to task-api!' });
    });
  }

  apiRoutes() {
    const api = express.Router();

    const taskRoutes = new TaskRoutes();
    const userRoutes = new UserRoutes();
    const loginRoute = new LoginRoute();

    api.use(LoginRoute.routeName, loginRoute.getRouter());
    api.use(TaskRoutes.routeName, authenticateHandler, taskRoutes.getRouter());
    api.use(UserRoutes.routeName, userRoutes.getRouter());

    this.app.use('/api', api)
  }
}
