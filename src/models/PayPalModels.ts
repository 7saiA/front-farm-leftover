export interface PayPalApprovalDto {
    cartId: string;
    approvalUrl: string;
}

export interface PayPalUrlsDto {
    cancelUrl: string;
    successUrl: string;
}