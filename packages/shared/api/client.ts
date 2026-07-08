import { Platform } from 'react-native';
import { 
    OrderCardData, 
    mapCustomerOrder, 
    mapDriverTrip, 
    mapPendingAction, 
    RawOrder, 
    RawTripStop, 
    RawPendingAction 
} from '../types/order';

const getLocalhost = () => {
  try {
    return Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
  } catch (e) {
    return 'localhost';
  }
};

export const API_BASE_URL = `http://${getLocalhost()}:4000`;

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function fetchJSON<T>(
    endpoint: string, 
    options?: RequestInit & { abortSignal?: AbortSignal }
): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const isWrite = options?.method && options.method !== 'GET' && options.method !== 'HEAD';
    const headers = new Headers(options?.headers);
    if (isWrite && !headers.has('Idempotency-Key')) {
        const uuid = typeof crypto !== 'undefined' && crypto.randomUUID 
            ? crypto.randomUUID() 
            : Math.random().toString(36).substring(2, 15);
        headers.set('Idempotency-Key', uuid);
    }

    try {
        const response = await fetch(url, {
            ...options,
            headers,
            signal: options?.abortSignal
        });

        if (!response.ok) {
            throw new ApiError(response.status, `HTTP Error ${response.status}: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.log('Request aborted:', url);
        }
        throw error;
    }
}

export async function getOrders(customerId: string, signal?: AbortSignal): Promise<OrderCardData[]> {
    const rawData = await fetchJSON<RawOrder[]>(`/orders?customerId=${encodeURIComponent(customerId)}`, { abortSignal: signal });
    return rawData.map(mapCustomerOrder);
}

export async function getTrips(driverId: string, signal?: AbortSignal): Promise<OrderCardData[]> {
    const rawData = await fetchJSON<RawTripStop[]>(`/trips?driverId=${encodeURIComponent(driverId)}`, { abortSignal: signal });
    return rawData.map(mapDriverTrip);
}

export async function getPendingActions(adminId: string, signal?: AbortSignal): Promise<OrderCardData[]> {
    const rawData = await fetchJSON<RawPendingAction[]>(`/pending-actions?adminId=${encodeURIComponent(adminId)}`, { abortSignal: signal });
    return rawData.map(mapPendingAction);
}
