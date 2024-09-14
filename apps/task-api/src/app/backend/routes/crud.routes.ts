import express, { Router, Request, Response, RequestHandler } from 'express';

export type CRUDHandlers<T> = {
  list?: (req: Request, res: Response, data: T[]) => void;
  detail?: (req: Request, res: Response, data: T[]) => void;
  create?: (req: Request, res: Response, data: T[]) => void;
  update?: (req: Request, res: Response, data: T[]) => void;
  delete?: (req: Request, res: Response, data: T[]) => void;
};

export type Middleware = RequestHandler;
export abstract class BaseRouterCrud<T> {
  static routeName: string;

  private router: Router;
  private data: T[] = [];

  constructor(
    private handlers: CRUDHandlers<T>,
    private middlewares: {
      list?: Middleware[];
      detail?: Middleware[];
      create?: Middleware[];
      update?: Middleware[];
      delete?: Middleware[];
    } = {},
    private extraRoutes?: Array<{
      method: 'get' | 'post' | 'patch' | 'delete';
      path: string;
      middlewares?: Middleware[];
      handler?: (req: Request, res: Response, data: T[]) => void;
    }>
  ) {

    this.router = express.Router();

    this.initializeRoutes();
    this.initializeExtraRoutes();
  }

  private initializeRoutes() {
    this.route('get', '/', this.middlewares.list, this.handlers.list);
    this.route('get', '/:id', this.middlewares.detail, this.handlers.detail);
    this.route('post', '/', this.middlewares.create, this.handlers.create);
    this.route('patch', '/:id', this.middlewares.update, this.handlers.update);
    this.route('delete', '/:id', this.middlewares.delete, this.handlers.delete);
  }

  private initializeExtraRoutes() {
    this.extraRoutes?.map((route) => {
      this.route(route.method, route.path, route.middlewares, route.handler);
    });
  }

  private route(
    method: 'get' | 'post' | 'patch' | 'delete',
    path: string,
    middlewares: Middleware[] = [],
    handler?: (req: Request, res: Response, data: T[]) => void
  ) {
    const middlewaresAndHandler = [
      ...middlewares,
      (req: Request, res: Response) => {
        if (handler) {
          handler(req, res, this.data);
        }
      },
    ];
    this.router[method](path, ...middlewaresAndHandler);
  }

  public getRouter(): Router {
    return this.router;
  }
}
