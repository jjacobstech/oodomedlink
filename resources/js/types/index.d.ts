import { Config } from "ziggy-js";

export interface Notification{

        id: string;
    data: any;
    read_at: string;
    created_at: string;

}
export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  notifications: Notification[];
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
    admin: Admin;
    notifications: Notification[];
  };
  session_data: string;
  success: string;
  error: string;
  ziggy: Config & { location: string; base_url: string };
};
