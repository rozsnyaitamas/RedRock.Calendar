import { UserRole } from "@redrock/generated-html-client/models";
import { Color } from "../shared/color";

export interface User {
  id: string;
  fullName: string;
  userName:string;
  color: Color;
  role: UserRole
}
