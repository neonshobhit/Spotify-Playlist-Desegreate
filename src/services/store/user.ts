import * as Store from "../store";
import { getPlaylists } from "../../services/playlist";
import { getUser } from "../../services/user";
import type { User } from "../../types/User";

export const updateUser = () => {
  getUser().then((userData) => {
    if (!userData.error) {
      const user: User = {
        name: userData.data.display_name,
        id: userData.data.id,
      };
      localStorage.setItem("user", JSON.stringify(user));
      Store.user.set(user);
    } else {
      // handle error
    }
  });
};
// getUser().then((data) => {
//     const user:User = {
//       name: data.data.display_name,
//       id: data.data.id,
//     };
//     localStorage.setItem("user", JSON.stringify(user));
//     getPlaylists().then((data) => {
//       console.log(data.data);

//       for (let i = 0; i < data.data.items.length; ++i) {
//         playlists.push(data.data.items[i]);
//         expanded[i] = false;
//       }
//       showPlaylist = true;
//     });
