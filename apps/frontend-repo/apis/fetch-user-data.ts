import { UserType } from "@repo/shared-types";

export const fetchUserData = async (): Promise<UserType[]> => {
  return fetch("http://127.0.0.1:4000/fetch-user-data", {
    headers: {
      "content-type": "application/json",
      authorization: "Bearer shortlist-rifky-rangkuti",
    },
    method: "GET",
  }).then((r) => r.json());
};
