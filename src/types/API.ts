export type APIRequest = {
    endpoint: string,
    method: string,
    body: undefined|string
}

export type APIResponse = {
    data: undefined|any,
    error: undefined|string
}