import { secrets } from "../Config";
import type { APIRequest, APIResponse } from "../types/API";
import {updateAccessToken} from './updateAccessToken'

const APICall = async (req: APIRequest) => {
  let accessToken = localStorage.getItem("spotifyAccessToken");
  return await fetch(
    secrets.spotifyAPI + req.endpoint,
    {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
      body: req.body
    }
  );
};

export const callSpotify = async (req: APIRequest): Promise<APIResponse> => {
  return await APICall(req)
    .then(async r => {
      if (r.status === 401) {
        let refreshToken = localStorage.getItem("spotifyRefreshToken");
        await updateAccessToken(refreshToken, undefined);
        let APIResp =
                await APICall(req)
                    .then(async r => await r.json())
        return {
          data: APIResp,
          error: undefined,
        };
      } else if (r.status === 200) {
        return {
          data: await r.json(),
          error: undefined
        };
      }
    })
    .catch((e) => {
      console.log(e);
      return {
        error: e.message,
        data: undefined
      };
    });
};
