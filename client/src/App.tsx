import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";
import { useAutoDarkMode } from "@/hooks/useAutoDarkMode";

import EmConstrucao from "@/pages/EmConstrucao";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/sobre" component={EmConstrucao} />
      <Route path="/promocoes" component={EmConstrucao} />
      <Route path="/fidelidade" component={EmConstrucao} />
      <Route path="/duvidas" component={EmConstrucao} />
      <Route path="/mais" component={EmConstrucao} />
      <Route component={NotFound} />
    </Switch>
  );
}



function App() {
  useAutoDarkMode();
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
