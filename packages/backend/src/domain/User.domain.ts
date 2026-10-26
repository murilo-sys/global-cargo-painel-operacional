import { HUB_REGISTRY } from "../const/hubsRegistry.const";

export interface UserProps {
  id: string;
  email: string;
  name: string;
  defaultHub?: string;
}

export class User {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly defaultHub: string;

  constructor(user: UserProps) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.defaultHub = user.defaultHub ?? "SAO";
  }

  getOperationalContext() {
    const config = HUB_REGISTRY[this.defaultHub] ?? HUB_REGISTRY["SAO"];
    return {
      hub: this.defaultHub,
      filial: config?.filial,
      location: config?.location
    };
  }
}

(() => {
  const user = new User({ email: "teste", defaultHub: "c", id: "123", name: "teste" });
  console.log(user.getOperationalContext());
})();
