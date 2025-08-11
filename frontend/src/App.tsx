import React, { useState } from "react";
import { AuthForm } from "./components/AuthForm";
import { QuestionsForm } from "./components/Questions";
import {Dashboard} from "./components/Dashboard";
import type { User as UserType } from "./types";

export default function App() {
  const [step, setStep] = useState<"auth" | "questions" | "dashboard">("auth");
  const [user, setUser] = useState<UserType | null>(null);
  const [preferences, setPreferences] = useState<any>(null);

  // When AuthForm is successful
  const handleAuth = (userData: UserType) => {
    setUser(userData);
    setStep("questions");
  };

  // When QuestionsForm is submitted
  const handleQuestionsSubmit = (data: any) => {
    setPreferences(data);
    setStep("dashboard");
  };

  return (
    <>
      {step === "auth" && <AuthForm onAuth={handleAuth} />}
      {step === "questions" && (
        <QuestionsForm onSubmit={handleQuestionsSubmit} onBack={() => setStep("auth")} />
      )}
      {step === "dashboard" && (
        <Dashboard user={user} preferences={preferences} />
      )}
    </>
  );
}
