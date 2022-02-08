import { getUserLocation } from "./distance";

export const cleanInterests = (user) => {
  let updatedInterests = [];

  for (let i = 0; i < user.interests.length; i++) {
    updatedInterests.push(user.interests[i][0]);
  }
  user.interests = updatedInterests;
  return user;
};
