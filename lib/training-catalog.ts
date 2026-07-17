export type SectionSlug = "maps" | "safety" | "reports" | "admin";
export type DemoVariant =
  | "map-trips" | "map-exceptions" | "proximity-search"
  | "manage-assets" | "map-manage-drivers" | "manage-locations"
  | "request-trip-video" | "assign-trip-driver" | "contact-driver"
  | "coach-driver" | "review-scorecards" | "manage-event-status" | "configure-rules"
  | "report-schedule" | "run-report" | "saved-views" | "export-distribute"
  | "users-permissions" | "groups-assets" | "manage-drivers" | "notifications";

export type Lesson = {
  slug: string;
  title: string;
  description: string;
  duration: number;
  level: "Core" | "Intermediate" | "Advanced";
  status: "available" | "planned";
  demo?: DemoVariant;
  objectives: string[];
};

export type TrainingSection = {
  slug: SectionSlug;
  title: string;
  icon: string;
  description: string;
  color: string;
  lessons: Lesson[];
};

export type UpcomingModule = {
  title: string;
  description: string;
  lessons: string[];
};

export const upcomingModules: UpcomingModule[] = [
  { title: "Forms", description: "Build repeatable digital processes for drivers and field teams.", lessons: ["Create a form template", "Send a task", "Review submissions and approvals"] },
  { title: "Maintenance", description: "Stay ahead of service needs, inspections, issues, and work orders.", lessons: ["Set a maintenance schedule", "Review inspections and issues", "Create a work order", "Manage parts"] },
  { title: "Administration setup", description: "Complete the settings that support your organization and connected workflows.", lessons: ["Configure organization details", "Manage tags and custom fields", "Configure video and coaching settings", "Connect applications", "Review the audit log"] },
];

export const sections: TrainingSection[] = [
  {
    slug: "maps",
    title: "Maps",
    icon: "/product-icons/map.svg",
    color: "blue",
    description: "Find vehicles, understand movement, and investigate activity in place and time.",
    lessons: [
      { slug: "view-trips", title: "View vehicle trips", description: "Locate a vehicle, choose a date, inspect its route, and preview camera context from the map.", duration: 5, level: "Core", status: "available", demo: "map-trips", objectives: ["Locate a vehicle on Live Map", "Open Trip History", "Choose a date", "Hover over the route for trip and camera details"] },
      { slug: "review-exceptions-from-trips", title: "Review exceptions from trips", description: "Choose a trip-history date, find exceptions attached to a trip, and open one for review.", duration: 5, level: "Core", status: "available", demo: "map-exceptions", objectives: ["Open Trip History", "Choose a date", "Expand trip exceptions", "Choose an exception to review"] },
      { slug: "proximity-search", title: "Find vehicle activity with Proximity Search", description: "Select an area on the map and search a date range for vehicles that passed through it.", duration: 5, level: "Intermediate", status: "available", demo: "proximity-search", objectives: ["Left-click an area on Live Map", "Open Proximity Search", "Choose the area and date range", "Review nearby vehicle activity"] },
      { slug: "manage-assets", title: "Manage assets", description: "Find a vehicle on the Assets page and update its identifying and operating details.", duration: 6, level: "Core", status: "available", demo: "manage-assets", objectives: ["Open the Assets page", "Choose an asset", "Open the edit form", "Update the asset details"] },
      { slug: "manage-drivers", title: "Add and assign drivers", description: "Create a driver profile, then learn where to assign that driver to a trip.", duration: 6, level: "Core", status: "available", demo: "map-manage-drivers", objectives: ["Open the Drivers page", "Create a driver profile", "Choose Driver as the user type", "Assign the driver to a trip"] },
      { slug: "manage-locations", title: "Create locations and zones", description: "Learn what a zone represents, create a location, and define its circular or polygon geofence.", duration: 6, level: "Core", status: "available", demo: "manage-locations", objectives: ["Open Locations", "Understand location zones", "Enter location details", "Draw a geofence"] },
      { slug: "request-trip-video", title: "Request video from a trip", description: "Preview a camera-equipped trip at a chosen time, configure the clip, and submit the request.", duration: 8, level: "Intermediate", status: "available", demo: "request-trip-video", objectives: ["Choose an active trip day", "Move along the trip timeline", "Preview camera context", "Send and confirm the video request"] },
      { slug: "assign-trip-driver", title: "Assign a driver to a trip", description: "Open a trip, find the driver selector, and choose the correct driver for that trip.", duration: 4, level: "Core", status: "available", demo: "assign-trip-driver", objectives: ["Open a trip", "Find the assigned driver", "Search the driver list", "Choose the correct driver"] },
      { slug: "contact-driver", title: "Call or message an in-route driver", description: "Open a moving vehicle and use its driver communication controls.", duration: 4, level: "Core", status: "available", demo: "contact-driver", objectives: ["Identify a moving vehicle", "Confirm the active driver", "Locate Call and Message", "Review the message composer"] },
    ],
  },
  {
    slug: "safety",
    title: "Safety",
    icon: "/product-icons/safety.svg",
    color: "orange",
    description: "Review risky events, understand performance, and document driver coaching.",
    lessons: [
      { slug: "coach-driver", title: "Coach a driver", description: "Find an event that needs coaching, review the video, and locate the coaching record.", duration: 6, level: "Core", status: "available", demo: "coach-driver", objectives: ["Open the Needs Coaching queue", "Choose an event", "Review the video and event details", "Find Add Coaching"] },
      { slug: "review-scorecards", title: "Review safety performance", description: "Read the live Safety Overview, score trends, and coaching performance.", duration: 6, level: "Core", status: "available", demo: "review-scorecards", objectives: ["Set the reporting period", "Read the safety summary", "Interpret score trends"] },
      { slug: "manage-event-status", title: "Manage exception status", description: "Find an event and identify the controls used for review, coaching, and follow-up.", duration: 4, level: "Intermediate", status: "available", demo: "manage-event-status", objectives: ["Filter events by status", "Open an event", "Review the evidence", "Find the follow-up controls"] },
      { slug: "configure-rules", title: "Set up safety rules", description: "Learn where to choose the driving behaviors your safety program detects and prioritizes.", duration: 8, level: "Advanced", status: "available", demo: "configure-rules", objectives: ["Open Rules", "Start a new rule", "Choose conditions", "Review notification actions"] },
    ],
  },
  {
    slug: "reports",
    title: "Reports",
    icon: "/product-icons/reports.svg",
    color: "green",
    description: "Run, customize, schedule, and distribute recurring operational reports.",
    lessons: [
      { slug: "schedule-report", title: "Schedule a report", description: "Choose a report and set its recurring email schedule, format, and recipients.", duration: 5, level: "Core", status: "available", demo: "report-schedule", objectives: ["Choose a report", "Open Email Schedule", "Choose the frequency and format", "Add recipients"] },
      { slug: "run-report", title: "Find and run reports", description: "Navigate the report library and generate current results.", duration: 4, level: "Core", status: "available", demo: "run-report", objectives: ["Search the report library", "Choose a report", "Set a date range", "Read the results"] },
      { slug: "saved-views", title: "Save a report view", description: "Set up fields and filters you can reuse the next time you run the report.", duration: 5, level: "Intermediate", status: "available", demo: "saved-views", objectives: ["Open the report menu", "Choose Edit", "Set fields and filters", "Review the save options"] },
      { slug: "export-distribute", title: "Export and share a report", description: "Find the download and sharing options, then confirm the format and audience.", duration: 4, level: "Core", status: "available", demo: "export-distribute", objectives: ["Open the report menu", "Find download and sharing options", "Choose a file format", "Confirm the recipients"] },
    ],
  },
  {
    slug: "admin",
    title: "Admin",
    icon: "/product-icons/admin.svg",
    color: "purple",
    description: "Configure people, access, groups, assets, rules, and connected systems.",
    lessons: [
      { slug: "users-permissions", title: "Manage users and permissions", description: "Open User Management and learn which fields control a new user’s access.", duration: 8, level: "Core", status: "available", demo: "users-permissions", objectives: ["Open User Management", "Choose Create User", "Enter user details", "Review groups and security settings"] },
      { slug: "groups-assets", title: "Understand groups and assets", description: "Learn how the group hierarchy organizes people, vehicles, reporting, and access.", duration: 5, level: "Core", status: "available", demo: "groups-assets", objectives: ["Open Groups", "Read parent and child groups", "Understand how groups control access"] },
      { slug: "manage-drivers", title: "Manage drivers", description: "Find driver profiles and review their configuration fields.", duration: 6, level: "Core", status: "available", demo: "manage-drivers", objectives: ["Open User Management", "Filter drivers", "Identify driver profile fields"] },
      { slug: "notifications", title: "Rules and notifications", description: "Review rule conditions and available notification actions.", duration: 8, level: "Advanced", status: "available", demo: "notifications", objectives: ["Open Rules", "Start a rule", "Identify triggers and notification actions"] },
    ],
  },
];

export function getSection(slug: string) {
  return sections.find((section) => section.slug === slug);
}

export function getLesson(sectionSlug: string, lessonSlug: string) {
  const section = getSection(sectionSlug);
  const lesson = section?.lessons.find((item) => item.slug === lessonSlug);
  return section && lesson ? { section, lesson } : undefined;
}

export const availableLessons = sections.flatMap((section) =>
  section.lessons.filter((lesson) => lesson.status === "available").map((lesson) => ({ ...lesson, section }))
);
