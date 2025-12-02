// src/app/core/models/dto/user.dto.ts

import { UserType } from "../models/enums/user-type.enum";

export interface UserDto {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  physicalAddress?: string;
  type: UserType;
  img?: string | null;
  created?: Date | null;
  modified?: Date | null;
}

// Fields optional so delete() works
export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  physicalAddress?: string;
}
