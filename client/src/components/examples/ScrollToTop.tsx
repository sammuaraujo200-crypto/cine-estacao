import ScrollToTop from "../ScrollToTop";

export default function ScrollToTopExample() {
  return (
    <div className="h-[200vh]">
      <ScrollToTop />
      <div className="p-8">
        <p className="text-foreground">Scroll down to see the button appear...</p>
      </div>
    </div>
  );
}
