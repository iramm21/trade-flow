"use client";

import { useState } from "react";
import { calculateEstimate, calculateMargin } from "@/lib/tradeCalculations";

export default function TradeCalculator() {
  const [materialCost, setMaterialCost] = useState<number>(0);
  const [laborCost, setLaborCost] = useState<number>(0);
  const [overhead, setOverhead] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [estimate, setEstimate] = useState<number | null>(null);
  const [margin, setMargin] = useState<number | null>(null);

  function handleCalculate() {
    const est = calculateEstimate(materialCost, laborCost, overhead);
    setEstimate(est);
    setMargin(calculateMargin(est, price));
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Trade Calculator</h1>
      <div className="space-y-4 max-w-md">
        <input
          type="number"
          placeholder="Material Cost"
          value={materialCost}
          onChange={(e) => setMaterialCost(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Labor Cost"
          value={laborCost}
          onChange={(e) => setLaborCost(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Overhead"
          value={overhead}
          onChange={(e) => setOverhead(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Selling Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleCalculate}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Calculate
        </button>
        {estimate !== null && (
          <div>
            <p>Estimated Cost: ${estimate.toFixed(2)}</p>
            <p>Margin: {margin?.toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
