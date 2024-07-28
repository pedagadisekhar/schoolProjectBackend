import { RowDataPacket } from 'mysql2';

export default class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
  ) {}
}

export interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
}
