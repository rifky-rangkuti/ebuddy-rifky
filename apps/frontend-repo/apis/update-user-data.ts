import { UserType } from "@repo/shared-types";

export const updateUserData = async (data: UserType) => {
  return fetch("http://127.0.0.1:4000/update-user-data", {
    headers: {
      "content-type": "application/json",
      authorization: "Bearer shortlist-rifky-rangkuti",
    },
    method: "PUT",
    body: JSON.stringify(data),
  }).then((r) => r.json());
};
