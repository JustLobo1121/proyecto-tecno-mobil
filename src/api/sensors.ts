import { apiFetch, toQuery } from "./client";

export const getSensors = (params: any) => apiFetch(`/sensors${toQuery(params)}`);
export const getSensor = (id: any) => apiFetch(`/sensors/${id}`);