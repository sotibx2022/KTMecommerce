import { connectToDB } from "@/config/db";
import UserModel from "@/models/users.model";
interface AuthUser {
  email?: string | null;
  name?: string | null;
  image?: string | null;
}
export const registerOrFetchUser = async (user: AuthUser) => {
  await connectToDB();
  if (!user?.email) {
    throw new Error("Email is required to register or fetch user.");
  }
  const existingUser = await UserModel.findOne({ email: user.email });
  if (existingUser) {
    return existingUser;
  }
  const newUser = new UserModel({
    email: user.email,
    fullName: user.name || "",
    profileImage: user.image || null,
    roles: ["user"],
    accountStatus: "customer",
  });
  await newUser.save();
  return newUser;
};
