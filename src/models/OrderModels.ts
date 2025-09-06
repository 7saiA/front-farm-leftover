export type OrderStatus =
    | "CREATED"
    | "READY_FOR_PICKUP"
    | "CONFIRMED_BY_USER"
    | "CONFIRMED_BY_FARM"
    | "COMPLETED"
    | "CANCELLED_BY_USER"
    | "CANCELLED_BY_FARM"
    | "REFUNDED";

export interface OrderResponseDto {
    orderId: string;
    orderStatus: OrderStatus;

    createdAt: Date;
    updatedAt: Date;
    readyForPickupTime: Date;
    userConfirmedTime: Date;
    farmConfirmedTime: Date;
    cancelledTime: Date;

    username: string;
    userPhone: string;
    farmName: string;
    city: string;
    street: string;

    items: OrderItemDto[];
    totalPrice: string;
    cancellationReason: string;
}

export interface OrderItemDto {
    productId: string;
    imgUrl: string;
    productName: string;
    quantity: number;
    unit: string;
    pricePerUnit: string;
    subtotal: string;
}
