import { useState, useEffect } from "react";

type Theme = "default" | "halloween" | "christmas" | "valentines" | "easter" | "children" | "independence" | "cinema";

export function useSeasonalTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("default");

  useEffect(() => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    if (month === 2) {
      setTheme("valentines");
    } else if (month === 3 || month === 4) {
      setTheme("easter");
    } else if (month === 6 && day >= 15 && day <= 22) {
      setTheme("cinema");
    } else if (month === 9 && day >= 1 && day <= 10) {
      setTheme("independence");
    } else if (month === 10 && day >= 1 && day <= 15) {
      setTheme("children");
    } else if (month === 10 && day >= 16) {
      setTheme("halloween");
    } else if (month === 12) {
      setTheme("christmas");
    } else {
      setTheme("default");
    }
  }, []);

  return theme;
}
