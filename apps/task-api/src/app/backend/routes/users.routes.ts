import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';
import { UserPrimitives } from '../../../context/users/domain/users.entity';
import { authenticationApplication, userApplication } from '../../injection';
import { BaseRouterCrud } from './crud.routes';
import schemaValidator from '../middlewares/schema-validation';
import { authenticateHandler } from '../middlewares/authentication-handler';

export class UserRoutes extends BaseRouterCrud<UserPrimitives> {
  static routeName = '/users';

  constructor() {
    super(
      {
        list: UserRoutes.handleList,
        create: UserRoutes.handleCreate,
      },
      {
        create: [schemaValidator('user/create')],
        list: [authenticateHandler],
      },
      [
        {
          method: 'post',
          path: '/update-profile',
          handler: UserRoutes.handleUpdateProfile,
          middlewares: [schemaValidator('user/update'), authenticateHandler],
        },
      ]
    );
  }

  private static async handleList(req: Request, res: Response): Promise<void> {
    try {
      const users = await userApplication.getAll();
      res.send({
        results: users.map((user) =>
          user.toPrimitives((p) => ({
            id: p.id,
            email: p.email,
            roles: p.roles,
            username: p.username,
          }))
        ),
      });
    } catch (error) {
      res.status(500).send({ error: 'Failed to retrieve users' });
    }
  }

  private static async handleCreate(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = uuid();
      await userApplication.create({ ...req.body, id });
      res.send({ ok: true, user: id });
    } catch (error) {
      res.status(500).send({ error: 'Failed to create user' });
    }
  }

  private static async handleUpdateProfile(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id, ...updates } = req.body;
      await userApplication.update(id, updates);
      const newToken = await authenticationApplication.refreshToken(
        req.headers.authorization.replace('Bearer ', '')
      );
      res.send({ ok: true, userId: id, newToken });
    } catch (error) {
      res.status(500).send({ error: 'Failed to update profile user' });
    }
  }
}
