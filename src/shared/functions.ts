import logger from 'jet-logger';


/**
 * Print an error object if it's truthy. Useful for testing.
 */
export function pErr(err?: Error): void {
    if (!!err) {
        logger.err(err);
    }
}

/**
 * Get a random number between 1 and 1,000,000,000,000
 */
export function getRandomInt(): number {
    return Math.floor(Math.random() * 1_000_000_000_000);
}

export function makeId(length = 6) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
