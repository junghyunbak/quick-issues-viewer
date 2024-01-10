import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { OAuthService } from './oauth.service';
import type { Request, Response } from 'express';
import { TokenCreateDto } from './dto/TokenCreate.dto';

@Controller('oauth')
export class OAuthController {
  constructor(private readonly authService: OAuthService) {}

  @Post('login')
  async login(
    @Body() body: TokenCreateDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { code } = body;

    const { accessToken, refreshToken } =
      await this.authService.getGithubAccessToken(code);

    res.cookie('gh_rt', refreshToken);

    return { accessToken };
  }

  /**
   * TODO: 기존 토큰 무효화까지 구현
   */
  @Post('logout')
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('gh_rt');
  }

  @Post('slient-refresh')
  async slientRefresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { gh_rt } = req.cookies;

    try {
      const { accessToken, refreshToken } =
        await this.authService.refreshAccessToken(gh_rt);

      res.cookie('gh_rt', refreshToken);

      return { accessToken, refreshToken };
    } catch (e) {
      return null;
    }
  }
}
