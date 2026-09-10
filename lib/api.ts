import { Location, Disease, Facility, CaseRecord, DiagnosticTest, User, AuthSession } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

function getAuthHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("sentinel_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  // Auth
  async login(email: string, password: string): Promise<AuthSession> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.detail || "Authentication failed");
    }
    const data: AuthSession = await res.json();
    if (typeof window !== "undefined") {
      localStorage.setItem("sentinel_token", data.access_token);
      localStorage.setItem("sentinel_user", JSON.stringify(data));
    }
    return data;
  },

  logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("sentinel_token");
      localStorage.removeItem("sentinel_user");
    }
  },

  getCurrentUser(): AuthSession | null {
    if (typeof window === "undefined") return null;
    const userStr = localStorage.getItem("sentinel_user");
    return userStr ? JSON.parse(userStr) : null;
  },

  // Locations
  async getStates(): Promise<Location[]> {
    const res = await fetch(`${API_BASE_URL}/locations/states`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) return [];
    return res.json();
  },

  async getLgasForState(stateCode: string): Promise<Location[]> {
    const res = await fetch(`${API_BASE_URL}/locations/states/${stateCode}/lgas`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) return [];
    return res.json();
  },

  // Diseases
  async getDiseases(): Promise<Disease[]> {
    const res = await fetch(`${API_BASE_URL}/diseases`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) return [];
    return res.json();
  },

  // Facilities
  async getFacilities(locationId?: string): Promise<Facility[]> {
    const url = locationId
      ? `${API_BASE_URL}/facilities?location_id=${locationId}`
      : `${API_BASE_URL}/facilities`;
    const res = await fetch(url, { headers: { ...getAuthHeader() } });
    if (!res.ok) return [];
    return res.json();
  },

  // Cases
  async getCases(diseaseId?: string): Promise<CaseRecord[]> {
    const url = diseaseId
      ? `${API_BASE_URL}/cases?disease_id=${diseaseId}`
      : `${API_BASE_URL}/cases`;
    const res = await fetch(url, { headers: { ...getAuthHeader() } });
    if (!res.ok) return [];
    return res.json();
  },

  // Diagnostics
  async getTests(): Promise<DiagnosticTest[]> {
    const res = await fetch(`${API_BASE_URL}/tests`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) return [];
    return res.json();
  },

  // Users
  async getUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE_URL}/users`, {
      headers: { ...getAuthHeader() },
    });
    if (!res.ok) return [];
    return res.json();
  },
};
