import React, { useState } from "react";
import { Wallet, User, Map, UtensilsCrossed, Globe } from "lucide-react";

interface FormData {
  budget: number | "";
  age: number | "";
  placeTypes: string[];
  location: string;
  cuisines: string[];
}

interface QuestionsFormProps {
  onSubmit: (data: FormData) => void;
  onBack?: () => void;
}

export const QuestionsForm: React.FC<QuestionsFormProps> = ({ onSubmit, onBack }) => {
  const [formData, setFormData] = useState<FormData>({
    budget: "",
    age: "",
    placeTypes: [],
    location: "",
    cuisines: [],
  });

  // Expanded Place Types
  const placeOptions = [
    "Mountains",
    "Beaches",
    "Rainforest",
    "Deserts",
    "Hills",
    "Lakes",
    "Riverside",
    "Historical Sites",
    "Wildlife Safari",
    "Adventure Parks",
    "City Tours",
    "Island",
    "Countryside",
    "Religious Sites",
    "Snow Regions",
  ];

  // Expanded Cuisine Types
  const cuisineOptions = [
    "North Indian",
    "South Indian",
    "East Indian",
    "West Indian",
    "Mughlai",
    "Rajasthani",
    "Gujarati",
    "Punjabi",
    "Kashmiri",
    "Bengali",
    "Italian",
    "Chinese",
    "Mexican",
    "Thai",
    "Japanese",
    "Korean",
    "Mediterranean",
    "French",
    "American",
    "Middle Eastern",
  ];

  const handleCheckboxChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const currentValues = prev[field] as string[];
      return {
        ...prev,
        [field]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white/20 dark:border-slate-700/50 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
          Travel Preferences ✈️
        </h2>

        {/* Budget */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-200 mb-1">
            <Wallet className="h-5 w-5" /> Budget (₹)
          </label>
          <input
            type="number"
            value={formData.budget}
            onChange={(e) => handleChange("budget", Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 p-2 dark:bg-slate-700 dark:text-white"
            placeholder="Enter your budget"
            required
          />
        </div>

        {/* Age */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-200 mb-1">
            <User className="h-5 w-5" /> Age
          </label>
          <input
            type="number"
            value={formData.age}
            onChange={(e) => handleChange("age", Number(e.target.value))}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 p-2 dark:bg-slate-700 dark:text-white"
            placeholder="Enter your age"
            required
          />
        </div>

        {/* Place Type */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-200 mb-2">
            <Map className="h-5 w-5" /> Type of Place
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {placeOptions.map((place) => (
              <label
                key={place}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 p-2 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.placeTypes.includes(place)}
                  onChange={() => handleCheckboxChange("placeTypes", place)}
                />
                {place}
              </label>
            ))}
          </div>
        </div>

        {/* Residing Location */}
        <div className="mb-4">
          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-200 mb-1">
            <Globe className="h-5 w-5" /> Residing Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 p-2 dark:bg-slate-700 dark:text-white"
            placeholder="Enter your city"
            required
          />
        </div>

        {/* Cuisine Preferences */}
        <div className="mb-6">
          <label className="flex items-center gap-2 text-slate-700 dark:text-slate-200 mb-2">
            <UtensilsCrossed className="h-5 w-5" /> Cuisine Preference
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {cuisineOptions.map((cuisine) => (
              <label
                key={cuisine}
                className="flex items-center gap-2 bg-slate-100 dark:bg-slate-700 p-2 rounded-lg cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.cuisines.includes(cuisine)}
                  onChange={() => handleCheckboxChange("cuisines", cuisine)}
                />
                {cuisine}
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:opacity-80"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:from-teal-600 hover:to-blue-700 shadow-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
