import { Base } from "./base.interface";
import { UserType } from "../enums/usertype.enum";

export interface User extends Base {
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  physicalAddress?: string;
  type: UserType;
  img?: string | null;
}