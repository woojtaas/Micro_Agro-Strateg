export type Role = "OWNER" | "EDITOR" | "VIEWER";

export type Item = {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  details: string;
  notes: string;
  checked: boolean;
  position: number;
  updatedByName: string;
  updatedAt: string;
};

export type Member = {
  id: string;
  name: string;
  role: Role;
  createdAt: string;
  lastSeenAt: string;
};

export type Invite = {
  id: string;
  token: string;
  role: Role;
  label: string;
  createdAt: string;
  revoked: boolean;
  usesCount: number;
  createdByName: string;
};

export const ROLE_LABELS: Record<Role, string> = {
  OWNER: "Właściciel",
  EDITOR: "Edytor",
  VIEWER: "Podgląd",
};
