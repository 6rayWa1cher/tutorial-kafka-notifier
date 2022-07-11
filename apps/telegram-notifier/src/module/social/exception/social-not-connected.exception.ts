export class SocialNotConnectedException extends Error {
  constructor(socialName: string, userId: number) {
    super(`Social "${socialName}" is not connected for the user ${userId}`);
  }
}
