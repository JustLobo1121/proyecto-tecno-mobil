import { apiFetch, toQuery } from "./client";

export const getSites = (params: any) => apiFetch(`/sites${toQuery(params)}`);
export const getSite = (id: any) => apiFetch(`/sites/${id}`);