import { useState, useEffect } from "react";

type Theme = "default" | "halloween" | "christmas" | "valentines";

export function useSeasonalTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;

    if (month === 10) {
      setTheme("halloween");
    } else if (month === 12) {
      setTheme("christmas");
    } else if (month === 6) {
      setTheme("valentines");
    } else {
      setTheme("default");
    }
  }, []);

  return theme;
}
