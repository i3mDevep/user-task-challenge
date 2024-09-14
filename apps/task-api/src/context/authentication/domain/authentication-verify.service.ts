import { JwtProvider } from '../../shared/domain/providers/jwt.provider';

export class AuthenticationVerifyServices {
  constructor(private jwkProvider: JwtProvider) {}
  async call(token: string) {
    return this.jwkProvider.verify(token);
  }
}
