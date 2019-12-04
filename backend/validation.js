export function validateUsername(username) {
    return [
        username == null,
        username.length < 3,
        username.length > 30,
        !/^[a-zA-Z0-9]+$/.test(username),
    ].every(Boolean);
}

export function validatePassword(password) {
    return [
        password == null,
        password.length < 6,
        password.length > 100,
    ].every(Boolean);
}

export function validateTitle(title) {
    return [
        title == null,
        title.length < 1,
        title.length > 100,
    ].every(Boolean);
}

export function validateContent(content, allowEmpty) {
    return [
        content == null,
        !allowEmpty && content.length < 1,
        content != null && content.length > 1000000,
    ].every(Boolean);
}