import { api } from "@/lib/api";

export async function createNoteApi(payload, token) {
    const response = await api.post('note/', payload, { token });
    return response?.data ?? response
}

export async function fetchPublicNotesApi({
    page=1,
    perPage=12, 
    q= '',
    sort='created_at',
    order='desc'
} = {}){
    const params = new URLSearchParams(
        {
            page: String(page), 
            per_page: String(perPage),
            sort,
            order
        }
    )

    if(q) params.set('q', q)

        const response = await api.get(`note/?${params.toString()}`)
        const data = response?.data ?? response

        return {
            items: data.items ?? [],
            meta: data.meta ?? { page:1, per_page:12, total:0, page:1 }
        }
}