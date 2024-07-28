import Database from '../db/Database';
import User, { UserRow } from '../Models/User';

class UserService {
  private db = Database.getInstance();


  public async getUserById(userId: number): Promise<User | null> {
    const [rows] = await this.db.execute<UserRow[]>('CALL GetUserById(?)', [userId]);

    // TypeScript should now recognize that rows is an array of UserRow
    const user = rows[0] ? new User(rows[0].id, rows[0].name, rows[0].email) : null;
    return user;
  }
  
  


}

export default UserService;
