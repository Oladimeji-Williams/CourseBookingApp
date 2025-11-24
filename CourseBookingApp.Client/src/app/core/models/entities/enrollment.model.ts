import { Base } from "./base.interface";

export interface Enrollment extends Base {
  userId: number;
  courseId: number;
  isActive: boolean;
}
