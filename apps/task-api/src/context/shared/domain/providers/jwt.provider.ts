/* eslint-disable @typescript-eslint/no-explicit-any */
export interface JwtProvider {
  generate(payload: Record<string, any>): Promise<string>
  verify(token: string): Promise<Record<string, any>>
  refreshToken(token: string): Promise<string>
}
