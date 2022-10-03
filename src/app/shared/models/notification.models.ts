export type SeverityValue = "success" | "error" | "info";

export interface Notification {
  message: string
  severity: SeverityValue
}
