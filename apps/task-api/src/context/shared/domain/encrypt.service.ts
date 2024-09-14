import bcrypt from 'bcrypt';

export class EncryptService {
  private readonly saltRounds = 10;

  async encrypt(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.saltRounds);
    const hashedValue = await bcrypt.hash(value, salt);
    return hashedValue;
  }

  async compare(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
