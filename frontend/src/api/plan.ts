interface ProductsResponse {
  monthly: {
    price: string;
    currency: string;
    trial_days: number;
  };
  year: {
    price: string;
    currency: string;
    trial_days: number;
  };
}
export const getProducts = async (): Promise<ProductsResponse> => {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};