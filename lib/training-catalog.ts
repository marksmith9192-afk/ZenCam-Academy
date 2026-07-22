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
      { slug: "manage-assets", title: "Manage assets", description: "Find a vehicle on the Assets page, update its details, and save the record.", duration: 6, level: "Core", status: "available", demo: "manage-assets", objectives: ["Open the Assets page", "Choose an asset", "Update the asset details", "Save and verify the record"] },
      { slug: "manage-drivers", title: "Add and assign drivers", description: "Create and save a driver profile, then assign that driver to a trip.", duration: 7, level: "Core", status: "available", demo: "map-manage-drivers", objectives: ["Open the Drivers page", "Create a driver profile", "Save the driver", "Assign and verify the trip driver"] },
      { slug: "manage-locations", title: "Create locations and zones", description: "Create a named location, define its geofence, and save it for use across ZenduONE.", duration: 7, level: "Core", status: "available", demo: "manage-locations", objectives: ["Open Locations", "Enter location details", "Draw a geofence", "Save and verify the location"] },
      { slug: "request-trip-video", title: "Request video from a trip", description: "Preview a camera-equipped trip at a chosen time, configure the clip, and submit the request.", duration: 8, level: "Intermediate", status: "available", demo: "request-trip-video", objectives: ["Choose an active trip day", "Move along the trip timeline", "Preview camera context", "Send and confirm the video request"] },
      { slug: "assign-trip-driver", title: "Assign a driver to a trip", description: "Open a trip, find the driver selector, and choose the correct driver for that trip.", duration: 4, level: "Core", status: "available", demo: "assign-trip-driver", objectives: ["Open a trip", "Find the assigned driver", "Search the driver list", "Choose the correct driver"] },
      { slug: "contact-driver", title: "Call or message an in-route driver", description: "Open a moving vehicle, send a message, and verify it in the conversation.", duration: 5, level: "Core", status: "available", demo: "contact-driver", objectives: ["Identify a moving vehicle", "Confirm the active driver", "Locate Call and Message", "Send and verify a message"] },
      { slug: "live-map-filters", title: "Use Live Map filters and layers", description: "Show the vehicles, statuses, labels, and map details needed for the task at hand.", duration: 5, level: "Core", status: "planned", objectives: ["Open map controls", "Filter vehicle status", "Choose map layers", "Reset the map view"] },
      { slug: "review-stops-idling", title: "Review stops and idling", description: "Use trip history to identify stop duration, idle time, and the location where activity occurred.", duration: 5, level: "Core", status: "planned", objectives: ["Open Trip History", "Choose a trip", "Review stop and idle details", "Open the map location"] },
      { slug: "monitor-camera-status", title: "Monitor vehicle and camera status", description: "Use Maps and Assets to identify vehicles that are offline or not recording and decide what to check next.", duration: 5, level: "Core", status: "planned", objectives: ["Read vehicle status", "Read camera status", "Find units that need attention", "Open the asset details"] },
    ],
  },
  {
    slug: "safety",
    title: "Safety",
    icon: "/product-icons/safety.svg",
    color: "orange",
    description: "Review risky events, understand performance, and document driver coaching.",
    lessons: [
      { slug: "coach-driver", title: "Review a coaching-ready exception", description: "Find an event that needs coaching, review its video and details, and open the coaching workflow.", duration: 6, level: "Core", status: "available", demo: "coach-driver", objectives: ["Open the Needs Coaching queue", "Choose an event", "Review the video and event details", "Open Add Coaching"] },
      { slug: "review-scorecards", title: "Review safety performance", description: "Read the live Safety Overview, score trends, and coaching performance.", duration: 6, level: "Core", status: "available", demo: "review-scorecards", objectives: ["Set the reporting period", "Read the safety summary", "Interpret score trends"] },
      { slug: "manage-event-status", title: "Review exception follow-up status", description: "Find an event, review its evidence, and identify its current review or coaching status.", duration: 4, level: "Intermediate", status: "available", demo: "manage-event-status", objectives: ["Filter events by status", "Open an event", "Review the evidence", "Identify the current status"] },
      { slug: "configure-rules", title: "Set up safety rules", description: "Choose the driving behaviors to monitor, configure notifications, and save the rule.", duration: 9, level: "Advanced", status: "available", demo: "configure-rules", objectives: ["Open Rules", "Start a new rule", "Choose conditions and actions", "Save and verify the rule"] },
      { slug: "complete-coaching-record", title: "Complete and save a coaching record", description: "Document the coaching conversation, outcome, notes, and follow-up before saving the record.", duration: 7, level: "Core", status: "planned", objectives: ["Open Add Coaching", "Record the conversation", "Choose an outcome", "Save and verify coaching"] },
      { slug: "update-exception-status", title: "Update an exception status", description: "Choose the correct follow-up status and confirm the event moves to the expected queue.", duration: 5, level: "Core", status: "planned", objectives: ["Open an exception", "Choose a status", "Confirm the update", "Verify the destination queue"] },
      { slug: "tag-exception", title: "Tag and organize an exception", description: "Apply a useful event tag and confirm it is available for later review and reporting.", duration: 4, level: "Core", status: "planned", objectives: ["Open an exception", "Choose a tag", "Save the change", "Find the tagged event"] },
    ],
  },
  {
    slug: "reports",
    title: "Reports",
    icon: "/product-icons/reports.svg",
    color: "green",
    description: "Run, customize, schedule, and distribute recurring operational reports.",
    lessons: [
      { slug: "schedule-report", title: "Schedule a report", description: "Choose a report, set its recurring delivery, and save the schedule.", duration: 6, level: "Core", status: "available", demo: "report-schedule", objectives: ["Choose a report", "Open Email Schedule", "Choose the frequency and recipients", "Save and verify the schedule"] },
      { slug: "run-report", title: "Find and run reports", description: "Navigate the report library and generate current results.", duration: 4, level: "Core", status: "available", demo: "run-report", objectives: ["Search the report library", "Choose a report", "Set a date range", "Read the results"] },
      { slug: "saved-views", title: "Save a report view", description: "Set up reusable fields and filters, save the view, and find it again.", duration: 6, level: "Intermediate", status: "available", demo: "saved-views", objectives: ["Open the report menu", "Set fields and filters", "Save the view", "Find it under Saved View"] },
      { slug: "export-distribute", title: "Choose a report delivery option", description: "Find the download and sharing actions and decide which one fits the audience.", duration: 4, level: "Core", status: "available", demo: "export-distribute", objectives: ["Open the report menu", "Find delivery options", "Review format choices", "Confirm the intended audience"] },
      { slug: "download-report", title: "Download a report", description: "Choose a download format, complete the export, and verify the file opens correctly.", duration: 4, level: "Core", status: "planned", objectives: ["Open report actions", "Choose Download", "Select a format", "Verify the downloaded file"] },
      { slug: "share-report", title: "Share a report with selected users", description: "Choose the audience, save the sharing settings, and confirm access from Saved View.", duration: 5, level: "Core", status: "planned", objectives: ["Open sharing settings", "Choose selected users", "Save the view", "Verify the audience"] },
      { slug: "create-report", title: "Create a report", description: "Start from the report library, choose the source and fields, then save and run the new report.", duration: 8, level: "Core", status: "planned", objectives: ["Choose Reports", "Select a source", "Configure fields and filters", "Save and run the report"] },
    ],
  },
  {
    slug: "admin",
    title: "Admin",
    icon: "/product-icons/admin.svg",
    color: "purple",
    description: "Configure people, access, groups, assets, rules, and connected systems.",
    lessons: [
      { slug: "users-permissions", title: "Manage users and permissions", description: "Create a user, configure access, save the record, and verify the result.", duration: 9, level: "Core", status: "available", demo: "users-permissions", objectives: ["Open User Management", "Enter user details", "Configure groups and security", "Save and verify the user"] },
      { slug: "groups-assets", title: "Understand groups and assets", description: "Learn how the group hierarchy organizes people, vehicles, reporting, and access.", duration: 5, level: "Core", status: "available", demo: "groups-assets", objectives: ["Open Groups", "Read parent and child groups", "Understand how groups control access"] },
      { slug: "manage-drivers", title: "Manage drivers", description: "Find a driver, update the profile, save the changes, and verify the result.", duration: 7, level: "Core", status: "available", demo: "manage-drivers", objectives: ["Open User Management", "Filter drivers", "Update the profile", "Save and verify the driver"] },
      { slug: "notifications", title: "Rules and notifications", description: "Configure rule conditions and notification actions, then save and verify the rule.", duration: 9, level: "Advanced", status: "available", demo: "notifications", objectives: ["Open Rules", "Start a rule", "Configure triggers and actions", "Save and verify the rule"] },
      { slug: "create-group", title: "Create and save a group", description: "Add a group to the correct place in the hierarchy and verify that it controls the intended assets and users.", duration: 6, level: "Core", status: "planned", objectives: ["Choose a parent group", "Create the group", "Assign members", "Save and verify the hierarchy"] },
      { slug: "organization-settings", title: "Review organization settings", description: "Understand the organization-wide settings that affect users, time, mapping, and fleet workflows.", duration: 6, level: "Core", status: "planned", objectives: ["Open organization settings", "Review regional settings", "Review fleet defaults", "Save and verify changes"] },
      { slug: "audit-log", title: "Review the audit log", description: "Find a recorded change, identify who made it, and use filters to narrow the history.", duration: 5, level: "Core", status: "planned", objectives: ["Open the audit log", "Set filters", "Review a change", "Clear the filters"] },
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
