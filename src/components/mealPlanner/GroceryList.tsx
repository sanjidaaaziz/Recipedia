import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  generateGroceryList,
  clearGroceryList,
} from "../../store/mealPlannerSlice";
import Button from "../common/Button";
import { ShoppingCart, Printer, Download, RefreshCw } from "lucide-react";

const GroceryList: React.FC = () => {
  const dispatch = useDispatch();
  const groceryList = useSelector(
    (state: RootState) => state.mealPlanner.groceryList
  );
  const mealPlan = useSelector((state: RootState) => state.mealPlanner.plan);

  const handleGenerateList = () => {
    dispatch(generateGroceryList());
  };

  const handleClearList = () => {
    dispatch(clearGroceryList());
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const content = "Recipedia Grocery List\n\n" + groceryList.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "grocery-list.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Check if meal plan is empty
  const isMealPlanEmpty = Object.keys(mealPlan).length === 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <ShoppingCart size={22} className="mr-2 text-orange-500" />
          Grocery List
        </h3>
        <div className="flex space-x-2">
          <Button
            onClick={handleGenerateList}
            variant="primary"
            size="sm"
            icon={<RefreshCw size={16} />}
            disabled={isMealPlanEmpty}
          >
            Generate
          </Button>
          <Button
            onClick={handleClearList}
            variant="outline"
            size="sm"
            disabled={groceryList.length === 0}
          >
            Clear
          </Button>
        </div>
      </div>

      {isMealPlanEmpty ? (
        <div className="text-center py-8 text-gray-500">
          <p>Add meals to your meal plan to generate a grocery list.</p>
        </div>
      ) : groceryList.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>
            Click "Generate" to create your grocery list based on your meal
            plan.
          </p>
        </div>
      ) : (
        <>
          <div className="border rounded-lg mb-4">
            <ul className="divide-y">
              {groceryList.map((item, index) => (
                <li key={index} className="p-3 flex items-center">
                  <input
                    type="checkbox"
                    id={`item-${index}`}
                    className="mr-3 h-5 w-5 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                  />
                  <label
                    htmlFor={`item-${index}`}
                    className="text-gray-700 cursor-pointer"
                  >
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <Button
              onClick={handlePrint}
              variant="outline"
              size="sm"
              icon={<Printer size={16} />}
            >
              Print
            </Button>
            <Button
              onClick={handleDownload}
              variant="outline"
              size="sm"
              icon={<Download size={16} />}
            >
              Download
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default GroceryList;
