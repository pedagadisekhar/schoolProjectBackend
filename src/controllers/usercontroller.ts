import { Request, Response } from 'express';
import UserService from '../services/userservice';
import ResponseHandler from '../utils/ResponseHandler';

class UserController {
  private userService = new UserService();

  public async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.id);
      const user = await this.userService.getUserById(userId);
      ResponseHandler.success(res, user);
    } catch (error) {
      if (error instanceof Error) {
        ResponseHandler.error(res, error.message);
      } else {
        ResponseHandler.error(res, 'An unexpected error occurred');
      }
    }
  }
}

export default UserController;
