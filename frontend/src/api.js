import wait from "./wait-promise.js";

let authToken;

export function setAuthToken(newAuthToken) {
    authToken = newAuthToken;
}

export async function fetchPosts(username, oldestDateLoaded, postsToLoad) {
    // TODO
    await wait(1000 * 3);
    return [
        {
            title: "This is a test title #1",
            content: "Bla bla bla bla bla bla bla bla. ".repeat(100),
            datePosted: new Date(),
            postSlug: "this-is-a-test-title-1",
            author: {
                username: "tobloef"
            },
        },
        {
            title: "This is a test title #2",
            content: "Bla bla bla bla bla bla bla bla. ".repeat(100),
            datePosted: new Date(),
            postSlug: "this-is-a-test-title-2",
            author: {
                username: "tobloef"
            },
        },
        {
            title: "This is a test title #3",
            content: "Bla bla bla bla bla bla bla bla. ".repeat(100),
            datePosted: new Date(),
            postSlug: "this-is-a-test-title-3",
            author: {
                username: "tobloef"
            },
        },
    ]
}

export async function fetchPost(postSlug) {
    // TODO
    await wait(1000 * 3);
    return {
        title: "This is a test title #1",
        content: "Bla bla bla bla bla bla bla bla. ".repeat(100),
        datePosted: new Date(),
        postSlug: "this-is-a-test-title-1",
        author: {
            username: "tobloef"
        },
    };
}

export async function fetchUser(username) {
    // TODO
    await wait(1000 * 3);
    return {
        username: "tobloef"
    };
}

export async function login(username, password) {
    // TODO
    await wait(1000 * 3);
}

export async function registerUser(username, password) {
    // TODO
    await wait(1000 * 3);
}

export async function createPost(title, content) {
    // TODO
    await wait(1000 * 3);
}

