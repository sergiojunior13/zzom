"use client";

export class AuthStorage {
  private static AUTH_STORAGE_KEY = "auth-storage";

  static checkIsLogged() {
    const authStorageValue = localStorage.getItem(AuthStorage.AUTH_STORAGE_KEY);
    if (!authStorageValue) return null;

    try {
      const { username } = JSON.parse(authStorageValue) as { username: string };

      return username !== null;
    } catch {
      return false;
    }
  }

  static getUsername() {
    const authStorageValue = localStorage.getItem(AuthStorage.AUTH_STORAGE_KEY);
    if (!authStorageValue)
      throw new Error("Autenticação inválida, por favor faça login novamente.");

    const { username } = JSON.parse(authStorageValue) as { username: string };

    if (!username)
      throw new Error("Autenticação inválida: faltando username. Por favor faça login novamente.");

    return username;
  }

  static registerIsLogged(username: string) {
    localStorage.setItem(AuthStorage.AUTH_STORAGE_KEY, JSON.stringify({ username }));
  }

  static unregisterIsLogged() {
    localStorage.removeItem(AuthStorage.AUTH_STORAGE_KEY);
  }
}
