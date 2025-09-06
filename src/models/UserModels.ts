import type {ProductDto} from "./ProductModels.ts";

export interface UserDto {
    userName: string;
    email: string;
    phone: string;
    farmName: string;
    city: string;
    street: string;
    products: ProductDto[];
}

export interface FarmDto extends AllFarmDto{
    products: ProductDto[];
}

export interface AllFarmDto{
    farmName: string;
    email: string;
    phone: string;
    city: string;
    street: string;
}