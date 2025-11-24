import { Base } from "./base.interface";
import { CourseType } from "../enums/coursetype.enum";

export interface Course extends Base {
  title: string;
  description: string;
  price: number;
  type: CourseType;
  img?: string;
  soldOut: boolean;
  onSale: boolean;
}