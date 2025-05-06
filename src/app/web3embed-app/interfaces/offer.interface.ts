type UUID = string;

export interface Token {
    token_network_id: UUID;
    token_id: UUID;
    symbol: string;
    name: string;
    standard: 'NATIVE' | 'ERC20' | 'ERC721';
    contract_address: string;
    decimals: number;
    expected_amount: number;
    offer_wallet_id: UUID;
  }
  
  /**
   * Payment method information
   */
  export interface PaymentMethod {
    wallet_id: UUID;
    wallet_address: string;
    wallet_label: string;
    network_id: UUID;
    network_name: string;
    network_chain_id: number;
    accepted_tokens: Token[];
  }
  
  /**
   * Complete offer response
   */
  export interface OfferResponse {
    offer_id: UUID;
    offer_title: string;
    description: string | null;
    price_usd: number | null;
    deadline: string | null; // ISO date string format
    created_at: string; // ISO date string format
    updated_at: string; // ISO date string format
    payment_methods: PaymentMethod[];
  }