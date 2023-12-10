import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException({
        code: 'auth.username-or-pass-verify-failed',
      });
    }

    if (!(await this.verifyPass(user.password, pass))) {
      throw new UnauthorizedException({
        code: 'auth.username-or-pass-verify-failed',
      });
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  private async verifyPass(
    encryptedPass: string,
    plainPass: string,
  ): Promise<boolean> {
    return await compare(plainPass, encryptedPass);
  }
}
