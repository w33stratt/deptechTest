import { Cuti } from "../../list-cuti/dtos/list-cuti.dtos";

export interface Pegawai {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    address: string;
    gender: string;
}

export interface pegawaiCuti extends Pegawai {
    cuti: Cuti[];
}

