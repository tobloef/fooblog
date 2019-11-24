
let authToken;
let baseUrl = "http://localhost:3001";

export function setAuthToken(newAuthToken) {
    authToken = newAuthToken;
}

export function setBaseUrl(newBaseUrl) {
    baseUrl = newBaseUrl;
}

export async function fetchPosts(maxDate, limit) {
    const response = await get(`/posts`, {
        maxDate,
        limit,
    });
    return await response.json();
}

export async function fetchUserPosts(username, maxDate, limit) {
    const response = await get(`/users/${username}/posts`, {
        maxDate,
        limit,
    });
    return await response.json();
}

export async function fetchPost(username, postUrlSlug) {
    const response = await get(`/users/${username}/posts/${postUrlSlug}`);
    return await response.json();
}

export async function fetchPostComments(username, postUrlSlug) {
    const response = await get(`/users/${username}/posts/${postUrlSlug}/comments`);
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
    return await response.text();
}

export async function registerUser(username, password) {
    await post(`/auth/register`, {
        username,
        password,
    });
}

export async function createPost(title, content) {
    const response = await post(`/posts`, {
        title,
        content,
    });
    return await response.json();
}

export async function createComment(username, postUrlSlug, content) {
    const response = await post(`/users/${username}/posts/${postUrlSlug}/comments`, {
        content,
    });
    return await response.json();
}

async function get(url, queryParams) {
    if (url.startsWith("/")) {
        url = baseUrl + url;
    }
    if (queryParams != null) {
        url += generateQueryString(queryParams);
    }

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Authorization": authToken ? `Bearer ${authToken}` : null,
        },
    });
    if (response.status !== 200) {
        const error = new Error(`Request responded with non-success code: ${response.status} - ${response.statusText}`);
        error.status = response.status;
        throw error;
    }
    return response;
}

async function post(url, data, queryParams) {
    if (url.startsWith("/")) {
        url = baseUrl + url;
    }
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
    if (response.status !== 200) {
        const error = new Error(`Request responded with non-success code: ${response.status} - ${response.statusText}`);
        error.status = response.status;
        throw error;
    }
    return response;
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