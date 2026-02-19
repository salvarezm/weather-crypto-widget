const parsed = parseInt(process.env.MAX_AGE_IN_SECONDS ?? '', 10);
export const MAX_AGE_IN_SECONDS = isNaN(parsed) ? 300 : parsed;
