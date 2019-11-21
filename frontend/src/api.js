import wait from "./wait-promise.js";

let authToken;

export function setAuthToken(newAuthToken) {
    authToken = newAuthToken;
}

async function get(url, queryParams) {
    if (queryParams != null) {
        url += generateQueryString(queryParams);
    }
    const response = await fetch(url, {
        method: "GET",
        headers: {
        },
    });
    return await response.json();
}

async function post(url, data, queryParams) {
    if (queryParams != null) {
        url += generateQueryString(queryParams);
    }
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": authToken ? `Bearer ${authToken}` : null,
        },
        body: JSON.stringify(data)
    });
    return await response.json();
}

function generateQueryString(query) {
    const hasAnyValues = Object.entries(query).filter(([key, value]) => value != null).length > 0;
    if (query == null || !hasAnyValues) {
        return "";
    }
    return "?" + Object.entries(query)
        .filter(([key, value]) => value != null)
        .map(([key, value]) => {
            // noinspection JSCheckFunctionSignatures
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
        })
        .join("&");
}

export async function fetchPosts(username, minDate, limit) {
    const response = await get(`/posts`, {
        username,
        minDate,
        limit,
    });
    return await response.json();
}

export async function fetchPost(postUrlSlug) {
    const response = await get(`/posts/${postUrlSlug}`);
    return await response.json();
}

export async function fetchPostComments(postUrlSlug) {
    const response = await get(`/posts/${postUrlSlug}/comments`);
    return await response.json();
}

export async function fetchUser(username) {
    const response = await get(`/users/${username}`);
    return await response.json();
}

export async function login(username, password) {
    const response = await post(`/auth/login`, {
        username,
        password,
    });
    return await response.json();
}

export async function registerUser(username, password) {
    const response = await post(`/auth/register`, {
        username,
        password,
    });
    return await response.json();
}

export async function createPost(title, content) {
    const response = await post(`/posts`, {
        title,
        content,
    });
    return await response.json();
}

export async function createComment(postUrlSlug, content) {
    const response = await post(`/posts/${postUrlSlug}/comments`, {
        content,
    });
    return await response.json();
}

