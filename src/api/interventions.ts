import { apiFetch, toQuery } from "./client"

export const getInterventions = (param: any) => apiFetch(`/interventions${toQuery(param)}?status=open`)

export const closeInterventions = (data: any) => {
    apiFetch("/interventions", {
        method: "PATCH",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
    })
}