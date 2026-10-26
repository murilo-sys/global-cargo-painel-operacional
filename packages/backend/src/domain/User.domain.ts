import { userSchema } from "../schema/user.schema";

export class User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly defaultHub: string;

  constructor(data: unknown) {
    const user = userSchema.parse(data);

    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.defaultHub = user.defaultHub;
  }

  getOperationalContext() {}
}
