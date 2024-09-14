import { AuthenticationEntity } from "./authentication.entity";

export interface AuthenticationRepository {
  login(props: { email: string, password: string }): Promise<AuthenticationEntity>
}
