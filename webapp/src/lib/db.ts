import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { seedItems } from "./seed-data";
import type { Item, Member, Invite, Role } from "./types";

export type { Role, Item, Member, Invite } from "./types";

declare global {
  var __checklistDb: Database.Database | undefined;
}

function openDb(): Database.Database {
  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  const dbPath = path.join(dataDir, "app.db");

  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
    CREATE TABLE IF NOT EXISTS items (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      subcategory TEXT NOT NULL,
      title TEXT NOT NULL,
      details TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      checked INTEGER NOT NULL DEFAULT 0,
      position INTEGER NOT NULL,
      updated_by_name TEXT NOT NULL DEFAULT '',
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS members (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('OWNER','EDITOR','VIEWER')),
      created_at TEXT NOT NULL,
      last_seen_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS invites (
      id TEXT PRIMARY KEY,
      token TEXT NOT NULL UNIQUE,
      role TEXT NOT NULL CHECK (role IN ('EDITOR','VIEWER')),
      label TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL,
      revoked INTEGER NOT NULL DEFAULT 0,
      uses_count INTEGER NOT NULL DEFAULT 0,
      created_by_name TEXT NOT NULL DEFAULT ''
    );
  `);

  const itemCount = (db.prepare("SELECT COUNT(*) AS c FROM items").get() as { c: number }).c;
  if (itemCount === 0) {
    const insert = db.prepare(`
      INSERT INTO items (id, category, subcategory, title, details, notes, checked, position, updated_by_name, updated_at)
      VALUES (@id, @category, @subcategory, @title, @details, '', 0, @position, '', @updatedAt)
    `);
    const insertMany = db.transaction((rows: typeof seedItems) => {
      rows.forEach((row, index) => {
        insert.run({
          id: randomUUID(),
          category: row.category,
          subcategory: row.subcategory,
          title: row.title,
          details: row.details,
          position: index,
          updatedAt: new Date().toISOString(),
        });
      });
    });
    insertMany(seedItems);
  }

  return db;
}

export function getDb(): Database.Database {
  if (!globalThis.__checklistDb) {
    globalThis.__checklistDb = openDb();
  }
  return globalThis.__checklistDb;
}

function getRow<T>(sql: string, params?: unknown): T | undefined {
  const stmt = getDb().prepare(sql);
  return (params !== undefined ? stmt.get(params) : stmt.get()) as T | undefined;
}

function allRows<T>(sql: string): T[] {
  return getDb().prepare(sql).all() as T[];
}

type ItemRow = {
  id: string;
  category: string;
  subcategory: string;
  title: string;
  details: string;
  notes: string;
  checked: number;
  position: number;
  updated_by_name: string;
  updated_at: string;
};

type MemberRow = {
  id: string;
  name: string;
  role: Role;
  created_at: string;
  last_seen_at: string;
};

type InviteRow = {
  id: string;
  token: string;
  role: Role;
  label: string;
  created_at: string;
  revoked: number;
  uses_count: number;
  created_by_name: string;
};

function rowToItem(row: ItemRow): Item {
  return {
    id: row.id,
    category: row.category,
    subcategory: row.subcategory,
    title: row.title,
    details: row.details,
    notes: row.notes,
    checked: !!row.checked,
    position: row.position,
    updatedByName: row.updated_by_name,
    updatedAt: row.updated_at,
  };
}

function rowToMember(row: MemberRow): Member {
  return {
    id: row.id,
    name: row.name,
    role: row.role,
    createdAt: row.created_at,
    lastSeenAt: row.last_seen_at,
  };
}

function rowToInvite(row: InviteRow): Invite {
  return {
    id: row.id,
    token: row.token,
    role: row.role,
    label: row.label,
    createdAt: row.created_at,
    revoked: !!row.revoked,
    usesCount: row.uses_count,
    createdByName: row.created_by_name,
  };
}

export function listItems(): Item[] {
  return allRows<ItemRow>("SELECT * FROM items ORDER BY position ASC").map(rowToItem);
}

export function updateItem(
  id: string,
  changes: { checked?: boolean; notes?: string },
  updatedByName: string
): Item | null {
  const db = getDb();
  const existing = getRow<ItemRow>("SELECT * FROM items WHERE id = ?", id);
  if (!existing) return null;

  const next = {
    checked:
      changes.checked !== undefined ? (changes.checked ? 1 : 0) : existing.checked,
    notes: changes.notes !== undefined ? changes.notes : existing.notes,
  };

  db.prepare(
    `UPDATE items SET checked = @checked, notes = @notes, updated_by_name = @updatedByName, updated_at = @updatedAt WHERE id = @id`
  ).run({
    id,
    checked: next.checked,
    notes: next.notes,
    updatedByName,
    updatedAt: new Date().toISOString(),
  });

  return rowToItem(getRow<ItemRow>("SELECT * FROM items WHERE id = ?", id)!);
}

export function countMembers(): number {
  return getRow<{ c: number }>("SELECT COUNT(*) AS c FROM members")!.c;
}

export function countOwners(): number {
  return getRow<{ c: number }>(
    "SELECT COUNT(*) AS c FROM members WHERE role = 'OWNER'"
  )!.c;
}

export function createMember(name: string, role: Role): Member {
  const db = getDb();
  const id = randomUUID();
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO members (id, name, role, created_at, last_seen_at) VALUES (@id, @name, @role, @now, @now)`
  ).run({ id, name, role, now });
  return rowToMember(getRow<MemberRow>("SELECT * FROM members WHERE id = ?", id)!);
}

export function getMemberById(id: string): Member | null {
  const row = getRow<MemberRow>("SELECT * FROM members WHERE id = ?", id);
  return row ? rowToMember(row) : null;
}

export function touchMemberLastSeen(id: string): void {
  getDb()
    .prepare("UPDATE members SET last_seen_at = ? WHERE id = ?")
    .run(new Date().toISOString(), id);
}

export function listMembers(): Member[] {
  return allRows<MemberRow>("SELECT * FROM members ORDER BY created_at ASC").map(
    rowToMember
  );
}

export function updateMemberRole(id: string, role: Role): Member | null {
  const db = getDb();
  const existing = getRow<MemberRow>("SELECT * FROM members WHERE id = ?", id);
  if (!existing) return null;
  db.prepare("UPDATE members SET role = ? WHERE id = ?").run(role, id);
  return rowToMember(getRow<MemberRow>("SELECT * FROM members WHERE id = ?", id)!);
}

export function deleteMember(id: string): void {
  getDb().prepare("DELETE FROM members WHERE id = ?").run(id);
}

export function createInvite(
  role: "EDITOR" | "VIEWER",
  label: string,
  createdByName: string
): Invite {
  const db = getDb();
  const id = randomUUID();
  const token = randomUUID().replace(/-/g, "");
  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO invites (id, token, role, label, created_at, revoked, uses_count, created_by_name)
     VALUES (@id, @token, @role, @label, @now, 0, 0, @createdByName)`
  ).run({ id, token, role, label, now, createdByName });
  return rowToInvite(getRow<InviteRow>("SELECT * FROM invites WHERE id = ?", id)!);
}

export function listInvites(): Invite[] {
  return allRows<InviteRow>("SELECT * FROM invites ORDER BY created_at DESC").map(
    rowToInvite
  );
}

export function getInviteByToken(token: string): Invite | null {
  const row = getRow<InviteRow>("SELECT * FROM invites WHERE token = ?", token);
  return row ? rowToInvite(row) : null;
}

export function revokeInvite(id: string): void {
  getDb().prepare("UPDATE invites SET revoked = 1 WHERE id = ?").run(id);
}

export function incrementInviteUse(id: string): void {
  getDb()
    .prepare("UPDATE invites SET uses_count = uses_count + 1 WHERE id = ?")
    .run(id);
}
