import { EncryptService } from '../../shared/domain/encrypt.service';
import { JwtProvider } from '../../shared/domain/providers/jwt.provider';
import { UserRepository } from '../../users/domain/users.repository';

export class AuthenticationApplication {
  constructor(
    private userRepository: UserRepository,
    private jwt: JwtProvider
  ) {}

  async refreshToken(token: string) {
    return this.jwt.refreshToken(token);
  }

  async login(props: { email: string; password: string }) {
    const encryptService = new EncryptService();
    const user = await this.userRepository.findOne({ email: props.email });
    if (!user) throw new Error('Email does not exist.');

    const isSamePassword = await encryptService.compare(
      props.password,
      user.password
    );
    if (!isSamePassword) {
      throw new Error('Credentials wrong.');
    }

    return this.jwt.generate({
      id: user.id,
      email: user.email,
      roles: user.roles,
    });
  }
}
