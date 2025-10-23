import { useEffect } from "react";

export function useAutoDarkMode() {
  useEffect(() => {
    const updateTheme = () => {
      const hour = new Date().getHours();
      const isDayTime = hour >= 6 && hour < 18;
      
      if (isDayTime) {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
    };

    updateTheme();
    
    const interval = setInterval(updateTheme, 60000);

    return () => clearInterval(interval);
  }, []);
}
