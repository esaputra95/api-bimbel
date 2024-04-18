import { students_gender, students_statusStudy } from "@prisma/client";

export interface StudentInterface {
    id: string;
    name: string;
    studyProgram: string;
    phone: string;
    school: string;
    placeBirth: string;
    dateBirth: Date;
    country: string;
    province: string;
    city: string;
    address: string;
    gender: students_gender;
    classGrade: string;
    university: string;
    statusStudy: students_statusStudy;
    parentName: string;
    parentPhone: string;
    image: string;
    agreement: number;
    userCreate: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    email: string;
}