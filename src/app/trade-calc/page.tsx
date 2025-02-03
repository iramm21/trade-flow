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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Trade Calculator
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Material Cost</label>
            <input
              type="number"
              placeholder="Enter material cost"
              value={materialCost}
              onChange={(e) => setMaterialCost(Number(e.target.value))}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Labor Cost</label>
            <input
              type="number"
              placeholder="Enter labor cost"
              value={laborCost}
              onChange={(e) => setLaborCost(Number(e.target.value))}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Overhead</label>
            <input
              type="number"
              placeholder="Enter overhead"
              value={overhead}
              onChange={(e) => setOverhead(Number(e.target.value))}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Selling Price</label>
            <input
              type="number"
              placeholder="Enter selling price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleCalculate}
            className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Calculate
          </button>
          {estimate !== null && (
            <div className="mt-6 border-t pt-4">
              <p className="text-lg font-medium text-gray-800">
                Estimated Cost:{" "}
                <span className="font-bold">${estimate.toFixed(2)}</span>
              </p>
              <p className="text-lg font-medium text-gray-800">
                Margin: <span className="font-bold">{margin?.toFixed(2)}%</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
