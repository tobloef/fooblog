/**
 * Promise that delays for an amount of time.
 * @param ms Milliseconds to wait.
 * @returns {Promise}
 */
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export default wait;