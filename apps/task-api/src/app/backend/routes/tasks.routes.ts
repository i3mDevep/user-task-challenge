import { v4 as uuid } from 'uuid';
import { Request, Response } from 'express';
import { TaskPrimitives } from '../../../context/tasks/domain/task.entity';
import { taskApplication } from '../../injection';
import { BaseRouterCrud } from './crud.routes';
import schemaValidator from '../middlewares/schema-validation';

export class TaskRoutes extends BaseRouterCrud<TaskPrimitives> {
  static routeName = '/tasks';

  constructor() {
    super(
      {
        list: TaskRoutes.handleList,
        create: TaskRoutes.handleCreate,
        update: TaskRoutes.handleUpdate,
        delete: TaskRoutes.handleDelete,
      },
      {
        create: [schemaValidator('task/create')],
        update: [schemaValidator('task/update')],
      }
    );
  }

  private static async handleList(req: Request, res: Response): Promise<void> {
    try {
      const isUser: boolean = (req.body.roles ?? ['user']).includes('user');
      const query = isUser ? { user_id: req.body.id } : undefined;
      const tasks = await taskApplication.getAll(query);
      res.send({ results: tasks });
    } catch (error) {
      res.status(500).send({ error: 'Failed to retrieve tasks' });
    }
  }

  static async handleCreate(req: Request, res: Response): Promise<void> {
    try {
      const id = uuid();
      const isUser: boolean = (req.body.roles ?? ['user']).includes('user');
      const props = isUser
        ? { ...req.body, id, user_id: req.body.id }
        : { ...req.body, id };

      await taskApplication.create(props);
      res.send({ ok: true, task: id });
    } catch (error) {
      res.status(500).send({ error: 'Failed to create task' });
    }
  }

  private static async handleUpdate(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id, ...updates } = req.body;
      const isUser: boolean = (req.body.roles ?? ['user']).includes('user');
      const props = isUser
        ? { ...updates, id, user_id: updates.id }
        : { ...updates, id };

      const task = await taskApplication.getById(id);

      if (isUser && task.user_id !== props.user_id) {
        throw new Error('This task is not your');
      }

      await taskApplication.update(id, props);
      res.send({ ok: true, task: id });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  private static async handleDelete(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      await taskApplication.delete(id);
      res.send({ ok: true, task: id });
    } catch (error) {
      res.status(500).send({ error: 'Failed to delete task' });
    }
  }
}
