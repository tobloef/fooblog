/**
 * Helper for creating promises that times out.
 * @param milliseconds Milliseconds to wait before timing out.
 * @param promise The promise to possibly time out.
 * @return {Promise} The new promise, that will time out.
 */
export default function timeoutablePromiseWrapper(milliseconds, promise) {
    const timeout = new Promise((resolve, reject) => {
       setTimeout(() => {
           reject(new Error(`Timed out after ${milliseconds} ms.`))
       }, milliseconds)
    });
    return Promise.race([
        promise,
        timeout
    ])
}