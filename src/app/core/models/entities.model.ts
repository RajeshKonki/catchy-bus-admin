export interface Bus {
    id: string;
    busNumber: string;
    routeId: string;
    routeName: string;
    collegeId: string;
    collegeName: string;
    title: string;
    description: string;
    capacity: number;
    status: 'Active' | 'Inactive' | 'Maintenance' | string;
    tripStatus?: 'started' | 'ended' | 'scheduled' | string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface Driver {
    id: string;
    name: string;
    email: string;
    phone: string;
    licenseNumber: string;
    collegeId: string;
    collegeName?: string;
    busId?: string;
    busNumber?: string;
    status: 'Active' | 'Inactive' | string;
    isOnline?: boolean;
    profilePicture?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface Route {
    id: string;
    name: string;
    startPoint?: string;
    endPoint?: string;
    stops?: RouteStop[];
    totalDistance?: number;
    totalDuration?: number;
    status: 'Active' | 'Inactive' | string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface RouteStop {
    id: string;
    name: string;
    address?: string;
    latitude: number;
    longitude: number;
    order: number;
}

export interface College {
    id: string;
    name: string;
    address: string;
    contactPerson: string;
    email: string;
    phone: string;
    status: 'Active' | 'Inactive' | string;
    logo?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

export interface Student {
    id: string;
    name: string;
    email: string;
    rollNumber: string;
    collegeId: string;
    routeId: string;
    stopId: string;
    busPassId?: string;
    status: 'Active' | 'Inactive' | string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
}
