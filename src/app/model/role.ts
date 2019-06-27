export class Role {
  static VIEWER = 1;
  static VOTER = 2;
  static PERFORMER = 3;

  id: string;
  user: string;
  type: number;
}
