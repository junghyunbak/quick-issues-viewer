import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App } from 'octokit';
import { type GitHubAppUserAuthenticationWithExpiration } from '@octokit/auth-oauth-app/dist-types/types';

@Injectable()
export class OAuthService {
  constructor(private configService: ConfigService) {}

  githubApp = new App({
    appId: this.configService.get('GITHUB_APP_ID'),
    privateKey: this.configService.get('GITHUB_APP_PRIVATE_KEY'),
    oauth: {
      clientId: this.configService.get('GITHUB_APP_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GITHUB_APP_OAUTH_CLIENT_SECRET'),
    },
  });

  async getGithubAccessToken(code: string) {
    const response = await this.githubApp.oauth.createToken({ code });

    const { authentication } = response;

    const { token: accessToken, refreshToken } =
      authentication as GitHubAppUserAuthenticationWithExpiration;

    return { accessToken, refreshToken };
  }

  async getGithubUserInfo(accessToken: string) {
    try {
      const response = await this.githubApp.oauth.checkToken({
        token: accessToken,
      });

      const {
        data: {
          user: { login },
        },
      } = response;

      return login;
    } catch (e) {
      return null;
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const { authentication } = await this.githubApp.oauth.refreshToken({
      refreshToken,
    });

    return {
      accessToken: authentication.token,
      refreshToken: authentication.refreshToken,
    };
  }
}
