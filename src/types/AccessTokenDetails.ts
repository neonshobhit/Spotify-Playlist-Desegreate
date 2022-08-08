export type AccessTokenDetails = {
  grant_type: string;
  refresh_token: undefined | string;
  code: string | undefined;
  redirect_uri: string;
};
