import { User } from "../domain/User.domain";
import { HubRepository } from "../repositories/hub.repository";

export class UserUseCase {
  constructor(private hubRepo: HubRepository) {}

  async createUser(rawData: unknown): Promise<User> {
    const validHubs = await this.hubRepo.listAllHubs();

    const user = new User(rawData);

    const isHubValid = validHubs.includes(user.defaultHub);
    const safeHub = isHubValid ? user.defaultHub : "SAO";

    //if wasn't a valid hub
    if (!isHubValid) {
      return new User({ ...(rawData as object), defaultHub: safeHub });
    }

    return user;
  }
}
