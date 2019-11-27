export function validateUsername(username) {
    if (username == null) return false;
    if (username.length < 3) return false;
    if (username.length > 30) return false;
    if (!/^[a-zA-Z0-9]+$/.test(username)) return false;
    return true;
}

export function validatePassword(password) {
    if (password == null) return false;
    if (password.length < 6) return false;
    if (password.length > 100) return false;
    return true;
}

export function validateTitle(title) {
    if (title == null) return false;
    if (title.length < 1) return false;
    if (title.length > 100) return false;
    return true
}

export function validateContent(content, allowEmpty) {
    if (content == null) return false;
    if (!allowEmpty && content.length < 1) return false;
    if (content != null && content.length > 1000000) return false;
    return true
}