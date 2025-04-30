export interface Cuti {
    id?: string;
    employeeId: string;
    reason: string;
    startDate: string;
    endDate: string;
}

export interface PegawaiWithCuti {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    address: string;
    gender: string;
    cuti: Cuti[];
}