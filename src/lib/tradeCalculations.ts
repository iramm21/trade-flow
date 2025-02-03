// src/lib/tradeCalculations.ts

/**
 * Calculate a basic trade estimate based on material, labor, and overhead costs.
 * @param materialCost - The cost of materials.
 * @param laborCost - The cost of labor.
 * @param overhead - Additional overhead costs.
 * @returns Total estimated cost.
 */
export function calculateEstimate(
  materialCost: number,
  laborCost: number,
  overhead: number
): number {
  return materialCost + laborCost + overhead;
}

/**
 * Example: Calculate margin percentage.
 * @param cost - The total cost.
 * @param price - The selling price.
 * @returns Margin percentage.
 */
export function calculateMargin(cost: number, price: number): number {
  if (price === 0) return 0;
  return ((price - cost) / price) * 100;
}
