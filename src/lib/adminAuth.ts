"use client";

const KEY = "nn-admin-auth";

export function login(user: string, pass: string): boolean {
  if (user === "admin" && pass === "admin") {
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    return true;
  }
  return false;
}

export function isAuthed(): boolean {
  try {
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function logout() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
