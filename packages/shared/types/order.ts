export interface OrderCardData {
    id: string;
    title: string;
    subtitle: string;
    amount: number;
    badge?: string;
    trailing?: string;
    iconText?: string;
    isBreached?: boolean;
    mode: "customer" | "driver" | "admin";
}

export interface RawOrder {
    id: string;
    customerId?: string;
    customerName: string;
    address: string;
    amountPaise: number;
    sku: { code: string; name: string; qty?: number };
    status: string;
    placedAt: string;
    eta: string | null;
}

export interface RawTripStop {
    seq: number;
    orderId: string;
    driverId?: string;
    customerName: string;
    sku: string;
    address: string;
    distanceKm: number;
    status: string;
    etaMin: number | null;
}

export interface RawPendingAction {
    id: string;
    adminId?: string;
    category: string;
    summary: string;
    priority: string;
    ageMinutes: number;
    slaMinutes: number;
    action: string;
}

export function mapCustomerOrder(order: RawOrder): OrderCardData {
    return {
        id: order.id,
        title: order.sku.name,
        subtitle: order.status.charAt(0).toUpperCase() + order.status.slice(1).replace(/_/g, ' '),
        amount: order.amountPaise,
        badge: order.status,
        trailing: "Tomorrow", // Mock date to match mockup layout
        mode: "customer"
    };
}

export function mapDriverTrip(trip: RawTripStop): OrderCardData {
    return {
        id: trip.orderId,
        title: `${trip.customerName} · ${trip.sku}`,
        subtitle: `${trip.address} · ${trip.distanceKm} km`,
        iconText: trip.status === 'done' ? '✓' : String(trip.seq),
        amount: 0, 
        badge: trip.status,
        trailing: trip.status === 'active' ? 'Open' : undefined,
        mode: "driver"
    };
}

export function mapPendingAction(action: RawPendingAction): OrderCardData {
    const isBreached = action.ageMinutes > action.slaMinutes;
    let theme = 'slate';
    if (action.category === 'cash') theme = 'emerald';
    else if (action.category === 'mi_empty') theme = 'amber';
    else if (action.category === 'unassigned') theme = 'violet';
    else if (action.category === 'kyc') theme = 'rose';
    else if (action.category === 'prior_delivery') theme = 'sky';

    return {
        id: action.id,
        title: action.summary,
        subtitle: isBreached ? `${action.ageMinutes}m ⚠` : `${action.ageMinutes}m`,
        amount: 0,
        badge: theme, // hijack badge for theme color
        trailing: action.action === 'approve' ? 'Approve' : 'Assign →',
        mode: "admin",
        isBreached
    };
}
