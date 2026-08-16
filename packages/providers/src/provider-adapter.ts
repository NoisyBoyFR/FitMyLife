/**
 * Contract for permitted product and service data providers.
 * Concrete response types will be introduced with the product catalog.
 */
export interface ProviderAdapter {
  search(query: string): Promise<unknown[]>;
  getProduct(id: string): Promise<unknown>;
  getPrice(id: string): Promise<unknown>;
  getAvailability(id: string): Promise<unknown>;
  getDeliveryOptions(id: string): Promise<unknown[]>;
  getStoreAvailability(id: string): Promise<unknown[]>;
  getOfferDetails(id: string): Promise<unknown>;
}
