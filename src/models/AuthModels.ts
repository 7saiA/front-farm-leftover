export interface UserRegisterDto {
    login: string;
    userName?: string;
    email: string;
    password: string;
    phone: string;
    farmName?: string;
    city?: string;
    street?: string;
}

export interface LoginPasswordDto {
    login: string;
    password: string;
}