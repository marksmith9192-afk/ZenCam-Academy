export type Scene =
  | "map"
  | "vehicle"
  | "camera"
  | "exceptions"
  | "detail"
  | "summary";

export type TourStep = {
  scene: Scene;
  target?: string;
  eyebrow: string;
  title: string;
  body: string;
  placement: string;
};

export const steps: TourStep[] = [
  { scene: "map", target: "camera-vehicle", eyebrow: "Locate a vehicle", title: "Open a camera-equipped asset", body: "Select AVIATOR ZenCAM LITE to open its live vehicle details.", placement: "tip-map" },
  { scene: "vehicle", target: "camera-tab", eyebrow: "Open video tools", title: "Move from telemetry to video", body: "The vehicle workspace keeps live data, trips, camera, and safety exceptions together.", placement: "tip-tabs" },
  { scene: "camera", target: "live-feed", eyebrow: "See the road and cabin", title: "Check the live camera feed", body: "Two channels provide road-facing and in-cab context without leaving the asset.", placement: "tip-feed" },
  { scene: "camera", target: "exceptions-tab", eyebrow: "Review the exception", title: "Open safety exceptions", body: "Jump directly from live context to the events that need review or coaching.", placement: "tip-tabs" },
  { scene: "exceptions", target: "phone-row", eyebrow: "Prioritize risk", title: "Review cell phone events", body: "Grouped rules make it easy to focus on the behavior with the greatest exposure.", placement: "tip-table" },
  { scene: "detail", target: "coach-action", eyebrow: "Close the loop", title: "Mark the driver as coached", body: "Document the follow-up so the event, response, and outcome stay connected.", placement: "tip-coach" },
  { scene: "summary", eyebrow: "Workflow complete", title: "Risk reviewed. Driver coached.", body: "The entire workflow stays in one operating view—from map signal to documented action.", placement: "tip-summary" },
];

export const vehicles = [
  ["ADP Vehicle 1", "Bruce Wayne", "Unnamed Road", "Moving · 46 mph", "green"],
  ["AVIATOR_ZenCAM LITE", "Andres Bejerano", "3201 NW 6 Ave, Miami, FL", "Moving · 40 mph", "red"],
  ["SS Vehicle 5", "", "925 Hwy 61 N, Vicksburg, MS", "Moving · 12 mph", "green"],
  ["ADP Vehicle 2", "Tony Stark", "150 Commerce Blvd, Johnstown, OH", "Stopped · 22m", "blue"],
  ["LEXUS GX460 — ZenCAM PLUS", "Mike Vermillion", "Rock Hill, SC Office", "Stopped · 3hr", "blue"],
];

export const rules = [
  ["Cell Phone Use While Driving", "3", "1", "3"],
  ["Following Distance Detection", "3", "1", "3"],
  ["Forward Collision Warning", "2", "1", "2"],
  ["Distracted Driving", "1", "1", "1"],
];
