import express, { Router } from 'express';
import { authenticationApplication } from '../../injection';
import schemaValidator from '../middlewares/schema-validation';

export class LoginRoute {
  static routeName = '/login';

  private router: Router;

  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post('/', schemaValidator('login'), async (req, res) => {
      try {
        const token = await authenticationApplication.login(req.body);
        res.json({ token });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    this.router.post('/refresh', schemaValidator('refresh'), async (req, res) => {
      try {
        const token = await authenticationApplication.refreshToken(req.body);
        res.json({ newToken: token });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}
