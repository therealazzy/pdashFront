const API_URL = 'http://localhost:3001'
const TIMEOUT_DURATION = 5000; // 5 seconds timeout

class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_DURATION);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new ApiError('Request timed out. Please check if the server is running.', 0);
        }
        throw new ApiError('Network error. Please check your connection and if the server is running.', 0);
    }
}

async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new ApiError(
            error.message || 'An error occurred while fetching the data',
            response.status
        );
    }
    return response.json();
}

export async function getLaunchItems() {
    try {
        const response = await fetchWithTimeout(`${API_URL}/launch-items`);
        return await handleResponse(response);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Failed to fetch launch items: Network error', 0);
    }
}

export async function addLaunchItems(item) {
    try {
        const response = await fetchWithTimeout(`${API_URL}/launch-items`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        });
        return await handleResponse(response);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Failed to add launch item: Network error', 0);
    }
}

export async function launchItemById(id) {
    try {
        const response = await fetchWithTimeout(`${API_URL}/launch/id/${id}`, {
            method: 'POST',
        });
        return await handleResponse(response);
    } catch (error) {
        if (error instanceof ApiError) {
            throw error;
        }
        throw new ApiError('Failed to launch item: Network error', 0);
    }
}