"use client";

export class AuthStorage {
  private static AUTH_STORAGE_KEY = "auth-storage";

  static checkIsLogged() {
    const isLogged = localStorage.getItem(AuthStorage.AUTH_STORAGE_KEY);

    return isLogged == "true";
  }

  static registerIsLogged() {
    localStorage.setItem(AuthStorage.AUTH_STORAGE_KEY, "true");
  }

  static unregisterIsLogged() {
    localStorage.removeItem(AuthStorage.AUTH_STORAGE_KEY);
  }
}

