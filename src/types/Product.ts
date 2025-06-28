export interface UserForProductDto {
    login: string;
    name: string;
    email: string;
    phone: string;
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