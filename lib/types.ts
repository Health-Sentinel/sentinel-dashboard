export type AdminLevel = "ADMIN_0" | "ADMIN_1" | "ADMIN_2" | "ADMIN_3" | "ADMIN_4";

export type RoleEnum = "SYSTEM_ADMIN" | "EPIDEMIOLOGIST" | "SURVEILLANCE_OFFICER" | "FACILITY_WORKER";

export type TransmissionType = "VECTOR_BORNE" | "WATERBORNE" | "AIRBORNE_DROPLET" | "DIRECT_CONTACT";

export type ClinicalSeverity = "MILD" | "MODERATE" | "SEVERE" | "CRITICAL";

export type CaseClassification = "SUSPECTED" | "PROBABLE" | "CONFIRMED" | "DISCARDED";

export type CaseStatus = "ACTIVE" | "RECOVERED" | "TRANSFERRED" | "DECEASED" | "LOST_TO_FOLLOWUP";

export type DiagnosticStatus = "POSITIVE" | "NEGATIVE" | "INDETERMINATE" | "INVALID";

export type DiagnosticTechnology = "RDT_LATERAL_FLOW" | "MICROSCOPY" | "STOOL_CULTURE" | "RT_PCR" | "ANTIGEN_RAPID_STRIP";

export interface Location {
  location_id: string;
  admin_level: AdminLevel;
  country_code: string;
  state_code?: string;
  state_name?: string;
  lga_name?: string;
  ward_name?: string;
  parent_location_id?: string;
  h3_index_res8?: string;
  centroid_lat?: number;
  centroid_lon?: number;
  created_at: string;
}

export interface Disease {
  disease_id: string;
  common_name: string;
  scientific_name: string;
  icd11_code: string;
  transmission_type: TransmissionType;
  incubation_min_days: number;
  incubation_max_days: number;
  serial_interval_days?: number;
  is_active: boolean;
  created_at: string;
}

export interface Facility {
  facility_id: string;
  name: string;
  facility_type: string;
  location_id: string;
  is_sentinel_site: boolean;
  bed_capacity: number;
  created_at: string;
}

export interface CaseRecord {
  case_id: string;
  person_id: string;
  disease_id: string;
  location_id: string;
  classification: CaseClassification;
  clinical_severity: ClinicalSeverity;
  case_status: CaseStatus;
  symptom_onset_date?: string;
  confirmation_date?: string;
  outcome_date?: string;
  created_at: string;
  updated_at: string;
}

export interface DiagnosticTest {
  test_id: string;
  case_id?: string;
  disease_id: string;
  technology: DiagnosticTechnology;
  sample_type: string;
  status: DiagnosticStatus;
  kit_manufacturer?: string;
  quantitative_value?: number;
  cv_control_line_intensity?: number;
  cv_test_line_intensity?: number;
  signal_to_noise_ratio?: number;
  verified_by_human: boolean;
  created_at: string;
}

export interface User {
  user_id: string;
  email: string;
  full_name: string;
  role: RoleEnum;
  is_active: boolean;
  location_id?: string;
  created_at: string;
}

export interface AuthSession {
  access_token: string;
  token_type: string;
  user_id: string;
  email: string;
  full_name: string;
  role: RoleEnum;
}
