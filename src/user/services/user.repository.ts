import { SignUpDto } from "../dtos/signup.dto";
import { userModel } from "../../db/models/user.model";

class UserRepository {
  createUser(signUpDto: SignUpDto) {
    return userModel.create(signUpDto);
  }
  findByEmail(email: string) {
    return userModel.findOne({ email }).lean().exec();
  }
}

export const userRepository = new UserRepository();
