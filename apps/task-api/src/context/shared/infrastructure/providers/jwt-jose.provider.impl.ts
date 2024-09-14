import * as jose from 'jose';
import { JwtProvider } from '../../domain/providers/jwt.provider';

export class JwtJoseProviderImpl implements JwtProvider {
  private secretKey: Uint8Array;
  private issuer: string;
  private audience: string;

  constructor() {
    this.secretKey = new TextEncoder().encode('my_secret_key_12345');
    this.audience = 'urn:task-api:customers';
    this.issuer = 'urn:task-api:issuer';
  }

  async verify(token: string): Promise<Record<string, any>> {
    const res = await jose.jwtVerify(token, this.secretKey);
    return res.payload;
  }

  async generate(payload: Record<string, any>): Promise<string> {
    const jwt = await new jose.SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setIssuer(this.issuer)
      .setAudience(this.audience)
      .setExpirationTime('23h')
      .sign(this.secretKey);

    return jwt;
  }

  async refreshToken(token: string): Promise<string> {
    const payload = await this.verify(token);

    const newToken = await this.generate({
      ...payload,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 23),
    });

    return newToken;
  }
}
