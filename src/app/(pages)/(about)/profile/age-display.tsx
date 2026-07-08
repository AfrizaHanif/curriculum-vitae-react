"use client";

import { useState, useEffect } from "react";

interface AgeDisplayProps {
  birthday: string;
}

export default function AgeDisplay({ birthday }: AgeDisplayProps) {
  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const birthDate = new Date(birthday);
    const today = new Date();

    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }

    Promise.resolve().then(() => {
      setAge(calculatedAge);
    });
  }, [birthday]);

  // Render a stable placeholder during SSR and initial hydration
  if (age === null) return <span>--</span>;

  return <span>{age} tahun</span>;
}
