/**
 * Resolves an asset path based on the Vite base URL.
 * @param {string} path - The path to the asset (e.g., "assets/images/profile.jpg").
 * @returns {string} - The resolved path including the base URL.
 */
export const getAssetPath = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;

    // Clean the path to remove leading slash
    const cleanPath = path.replace(/^\//, '');

    // Vite's import.meta.env.BASE_URL handles the base path (e.g. /repo-name/)
    return `${import.meta.env.BASE_URL}${cleanPath}`;
};
