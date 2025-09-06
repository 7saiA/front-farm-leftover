export interface ProductDto {
    productId: string;
    productName: string;
    pricePerUnit: string;
    unit: string;
    availableQuantity: number;
    farmName: string;
    imgUrl: string;
}

export interface FarmProductDto {
    productId: string;
    productName: string;
    pricePerUnit: string;
    unit: string;
    availableQuantity: number;
    imgUrl: string;
}

export interface NewProductDto {
    productName: string;
    pricePerUnit: string;
    unit: string;
    availableQuantity: number;
}