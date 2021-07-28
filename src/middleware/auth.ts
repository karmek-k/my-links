import { authenticate } from 'passport';

export function auth(req: Express.Request, res: Express.Response, next: any) {
  authenticate('local', { session: false })(req, res, next);
}
