// ─── Utilities ───────────────────────────────────────────────
import { C } from "../styles/theme";

let _uid = 200;
export const uid = () => ++_uid;

export const stateColor = (s) =>
  s === "HEALTHY" ? C.healthy : s === "INJURY" ? C.injury : C.rest;

export const fmtDate = (d) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("fr-FR") : "–";

export const fmtMoney = (n) =>
  Number(n).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

export const evtColor = (t) =>
  t === "Training"
    ? C.btnGreen
    : t === "Competition"
    ? "#4A6A9A"
    : t === "Medical"
    ? C.injury
    : t === "Maintenance"
    ? "#6A7A4A"
    : "#5A5A7A";

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
