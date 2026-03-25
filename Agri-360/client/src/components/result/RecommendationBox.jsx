import React, { useState } from "react";

const RecommendationBox = ({ recommendations }) => {
  const [completed, setCompleted] = useState(new Set());

  if (!recommendations || recommendations.length === 0) return null;

  const toggleCompleted = (index) => {
    const newCompleted = new Set(completed);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
    } else {
      newCompleted.add(index);
    }
    setCompleted(newCompleted);
  };

  const completedCount = completed.size;
  const totalCount = recommendations.length;
  const progressPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="bg-slate-800/80 rounded-2xl p-6 shadow-inner border border-slate-700 hover:border-slate-600 transition-colors duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg mr-3">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              ></path>
            </svg>
          </div>
          <h3 className="text-lg font-bold text-white">Recommended Actions</h3>
        </div>
        <div className="text-sm text-slate-400">
          {completedCount}/{totalCount} completed
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-slate-700 rounded-full h-2">
          <div
            className="bg-purple-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <ul className="space-y-4">
        {recommendations.map((rec, index) => {
          const isCompleted = completed.has(index);
          return (
            <li
              key={index}
              className={`flex items-start p-3 rounded-xl border transition-all duration-200 ${
                isCompleted
                  ? "bg-green-900/20 border-green-700/50"
                  : "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
              }`}
            >
              <div className="mr-3 mt-0.5 flex-shrink-0">
                <input
                  type="checkbox"
                  checked={isCompleted}
                  onChange={() => toggleCompleted(index)}
                  className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                />
              </div>
              <span
                className={`text-sm leading-relaxed font-medium transition-all duration-200 ${
                  isCompleted ? "text-slate-500 line-through" : "text-slate-300"
                }`}
              >
                {rec}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RecommendationBox;
