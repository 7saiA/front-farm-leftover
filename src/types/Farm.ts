export interface ProductForFarmDto {
    productId: number;
    productName: string;
    pricePerUnit: number;
    unit: string;
    availableQuantity: number;
}

export interface FarmDto {
    login: string;
    name: string;
    email: string;
    phone: string;
    farmName: string | null;
    city: string | null;
    street: string | null;
    products: ProductForFarmDto[];
}