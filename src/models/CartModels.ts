export interface AddToCartDto {
    productId: string;
    quantity: number;
}

export interface CartItemDto {
    cartItemId: number;
    imgUrl: string;
    productId: string;
    productName: string;
    pricePerUnit: string;
    unit: string;
    quantity: number;
    subtotal: string;
}

export interface CartResponseDto {
    cartId: string;
    items: CartItemDto[];
    totalPrice: string;

}