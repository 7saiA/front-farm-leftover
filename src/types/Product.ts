export interface UserForProductDto {
    login: string;
    email: string;
    phone: string;
    role: string;
    farmName: string | null;
    city: string | null;
    street: string | null;
}

export interface Product {
    productId: number;
    productName: string;
    pricePerUnit: number;
    unit: string;
    availableQuantity: number;
    userForProductDto: UserForProductDto;
}