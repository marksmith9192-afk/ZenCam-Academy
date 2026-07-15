"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { assetPath } from "../lib/asset-path";
import type { DemoVariant } from "../lib/training-catalog";

type Hotspot = { x: number; y: number; width: number; height: number };
type ScreenshotStep = { image: string; label: string; title: string; body: string; hotspot?: Hotspot };
type RecordedWorkflow = { title: string; subtitle: string; steps: ScreenshotStep[] };

const workflows: Record<DemoVariant, RecordedWorkflow> = {
  "map-trips": {
    title: "View vehicle trips",
    subtitle: "Follow a real vehicle from Live Map into its recorded trip timeline.",
    steps: [
      { image: "/demo-screens/maps-view-trips/01-live-map.png", label: "Locate the vehicle", title: "Choose a vehicle", body: "Select AVIATOR_ZenCAM LITE from the Live Map asset list.", hotspot: { x: 6.4, y: 58.3, width: 32.7, height: 13.5 } },
      { image: "/demo-screens/maps-view-trips/02-vehicle-detail.png", label: "Open history", title: "Open Trip History", body: "The vehicle workspace keeps live status, camera data, exceptions, and historical travel together.", hotspot: { x: 8.8, y: 8.2, width: 8.1, height: 6.2 } },
      { image: "/demo-screens/maps-view-trips/03-trip-history.png", label: "Choose the day", title: "Select a day with activity", body: "Days with recorded trips show activity counts. Select July 14 to open its trip timeline.", hotspot: { x: 11.7, y: 63.1, width: 4.7, height: 13.8 } },
      { image: "/demo-screens/maps-view-trips/04-trip-timeline.png", label: "Inspect the route", title: "Review an individual trip", body: "Use the timeline to review drive time, distance, stops, exceptions, and the route.", hotspot: { x: 7.2, y: 50.5, width: 33.5, height: 28 } },
      { image: "/demo-screens/maps-view-trips/05-trip-hover-camera.png", label: "Hover on the route", title: "Preview trip and camera details", body: "Hover over a route point to see its time, stop and idle details, assigned driver, and camera frame without leaving the map.", hotspot: { x: 69, y: 24, width: 27, height: 34 } },
      { image: "/demo-screens/maps-view-trips/05-trip-hover-camera.png", label: "Complete", title: "Trip and camera reviewed", body: "You can now follow a vehicle into Trip History and inspect route details with its camera context." },
    ],
  },
  "map-exceptions": {
    title: "Review exceptions from trips",
    subtitle: "Start in Trip History, choose a date, and review exceptions attached to a recorded trip.",
    steps: [
      { image: "/demo-screens/maps-view-trips/02-vehicle-detail.png", label: "Open history", title: "Select Trip History", body: "From the vehicle workspace, open Trip History to move from live status into recorded travel.", hotspot: { x: 8.8, y: 8.2, width: 8.1, height: 6.2 } },
      { image: "/demo-screens/maps-view-trips/03-trip-history.png", label: "Choose a date", title: "Select a day with exceptions", body: "Use the calendar to choose the date you want to review. Activity counts identify days that contain trips and exceptions.", hotspot: { x: 11.7, y: 63.1, width: 4.7, height: 13.8 } },
      { image: "/demo-screens/maps/review-exceptions/03-trip-exceptions.png", label: "Expand exceptions", title: "Open exceptions for the trip", body: "Exceptions appear under the trip where they occurred. Expand the count to see each event, rule, time, and location.", hotspot: { x: 7, y: 34, width: 34, height: 43 } },
      { image: "/demo-screens/maps/review-exceptions/03-trip-exceptions.png", label: "Choose an event", title: "Select an exception to review", body: "Choose the relevant exception from the trip to open its evidence and follow-up details.", hotspot: { x: 8, y: 45, width: 31, height: 9 } },
      { image: "/demo-screens/safety/coach-driver/05-incident-detail.png", label: "Complete", title: "Exception context reviewed", body: "You can now move from a trip to the incident details used for follow-up." },
    ],
  },
  "proximity-search": {
    title: "Find vehicle activity with Proximity Search",
    subtitle: "Select a point on the real map, choose a date range, and find vehicles that passed through the area.",
    steps: [
      { image: "/demo-screens/maps-view-trips/01-live-map.png", label: "Choose an area", title: "Left-click the map", body: "On Live Map, left-click the point whose surrounding vehicle activity you want to investigate.", hotspot: { x: 48, y: 28, width: 28, height: 34 } },
      { image: "/demo-screens/maps/proximity-search/01-area-search.png", label: "Open the tool", title: "Choose Proximity Search", body: "Proximity Search uses the selected map point or a searched address. Adjust the distance to define the area.", hotspot: { x: 5, y: 10, width: 34, height: 53 } },
      { image: "/demo-screens/maps/proximity-search/02-date-range.png", label: "Set the date", title: "Choose the activity date range", body: "Select Today, another quick range, or exact calendar dates for the vehicle-activity search.", hotspot: { x: 5, y: 37, width: 50, height: 54 } },
      { image: "/demo-screens/maps/proximity-search/03-nearby-assets.png", label: "Review results", title: "Find vehicles through the area", body: "Search returns nearby assets that passed through the selected area. Switch between Trips and Exceptions to investigate their activity.", hotspot: { x: 5, y: 47, width: 35, height: 34 } },
      { image: "/demo-screens/maps/proximity-search/03-nearby-assets.png", label: "Complete", title: "Area activity found", body: "You can now use Proximity Search to identify vehicles that traveled through a selected area and date range." },
    ],
  },
  "manage-assets": {
    title: "Manage assets",
    subtitle: "Use the real Assets workspace to find a vehicle, update its details, and review driver assignment.",
    steps: [
      { image: "/demo-screens/maps/manage-assets/01-assets-list.png", label: "Open assets", title: "Find an asset", body: "The Assets page lists vehicle name, assigned driver, location, health, groups, and camera recording status.", hotspot: { x: 7, y: 22, width: 91, height: 62 } },
      { image: "/demo-screens/maps/manage-assets/02-asset-overview.png", label: "Review details", title: "Open the asset record", body: "The asset overview brings identification, assignment, groups, driver, location, and recent activity into one record.", hotspot: { x: 8, y: 17, width: 91, height: 65 } },
      { image: "/demo-screens/maps/manage-assets/03-edit-asset.png", label: "Edit the asset", title: "Update the name and details", body: "Choose Edit to update the asset name, groups, vehicle details, odometer, engine hours, and other operating information.", hotspot: { x: 7, y: 18, width: 45, height: 66 } },
      { image: "/demo-screens/maps/manage-assets/03-edit-asset.png", label: "Assign a driver", title: "Review Driver assignment", body: "Use Driver(s) under Usage & Assignment to review or change who is assigned to the asset before saving.", hotspot: { x: 52, y: 51, width: 44, height: 37 } },
      { image: "/demo-screens/maps/manage-assets/03-edit-asset.png", label: "Complete", title: "Asset workflow reviewed", body: "You can now find an asset, update its name and configuration, and review its assigned driver." },
    ],
  },
  "map-manage-drivers": {
    title: "Add and assign drivers",
    subtitle: "Use the real Drivers workspace to add a driver profile and connect that person to a trip.",
    steps: [
      { image: "/demo-screens/maps/manage-drivers/01-drivers-list.png", label: "Open drivers", title: "Review the Drivers page", body: "The Drivers view lists driver identity, username, phone, security, groups, and last login.", hotspot: { x: 7, y: 22, width: 91, height: 61 } },
      { image: "/demo-screens/maps/manage-drivers/02-add-user.png", label: "Add a driver", title: "Choose Create User", body: "Enter the driver's identity, contact details, groups, time zone, security, map provider, and language.", hotspot: { x: 7, y: 15, width: 53, height: 76 } },
      { image: "/demo-screens/maps/manage-drivers/03-driver-profile.png", label: "Set the profile", title: "Select Driver as the user type", body: "Under Profile Details, choose Driver so the new user is available for vehicle and trip assignment.", hotspot: { x: 7, y: 76, width: 48, height: 17 } },
      { image: "/demo-screens/maps/assign-driver/02-driver-list.png", label: "Assign the driver", title: "Choose the driver on a trip", body: "From a trip segment, open the driver selector, search the driver list, and choose the correct person for that trip.", hotspot: { x: 36, y: 7, width: 25.5, height: 44 } },
      { image: "/demo-screens/maps/assign-driver/02-driver-list.png", label: "Complete", title: "Driver workflow reviewed", body: "You can now add a driver profile and find the control used to assign that driver to a trip." },
    ],
  },
  "manage-locations": {
    title: "Create locations and zones",
    subtitle: "Use the real Locations workspace to create a named place and the geofence that defines its zone.",
    steps: [
      { image: "/demo-screens/maps/manage-locations/01-locations-list.png", label: "Open locations", title: "Review saved locations", body: "Locations are named places such as offices, yards, customer sites, or homes. Their zones let ZenCam recognize activity inside a defined area.", hotspot: { x: 7, y: 22, width: 91, height: 61 } },
      { image: "/demo-screens/maps/manage-locations/02-create-zone-circle.png", label: "Create a location", title: "Enter the location details", body: "Choose Create Location, then enter the name, group, tag, address, contact information, business hours, and stop duration.", hotspot: { x: 5, y: 12, width: 43, height: 80 } },
      { image: "/demo-screens/maps/manage-locations/02-create-zone-circle.png", label: "Define the zone", title: "Set a circular geofence", body: "A geofence is the zone boundary around the location. Choose Circle, then set its color, opacity, and radius on the map.", hotspot: { x: 64, y: 63, width: 34, height: 29 } },
      { image: "/demo-screens/maps/manage-locations/03-zone-polygon.png", label: "Shape the zone", title: "Use a polygon for an exact boundary", body: "Choose Polygon when the location needs a custom boundary, then place points around the area before saving.", hotspot: { x: 64, y: 63, width: 34, height: 29 } },
      { image: "/demo-screens/maps/manage-locations/03-zone-polygon.png", label: "Complete", title: "Location zone reviewed", body: "You can now create a location and choose the geofence shape that defines its activity zone." },
    ],
  },
  "request-trip-video": {
    title: "Request video from a trip",
    subtitle: "Choose a real trip, preview its camera timeline, and complete a historical-video request.",
    steps: [
      { image: "/demo-screens/maps/request-trip-video/01-trip-calendar.png", label: "Choose a day", title: "Open a day with trips", body: "Select an active day to load the route, stops, exceptions, and camera timeline.", hotspot: { x: 16, y: 62, width: 5.5, height: 15 } },
      { image: "/demo-screens/maps/request-trip-video/02-trip-timeline.png", label: "Open the timeline", title: "Review the trip video band", body: "The colored band below the map represents available trip and camera coverage across the day.", hotspot: { x: 47.5, y: 78, width: 46, height: 9 } },
      { image: "/demo-screens/maps/request-trip-video/03-preview-time.png", label: "Preview another moment", title: "Move along the trip", body: "Scrub along the band to preview the route, speed, location, and camera frames at a different time before requesting video.", hotspot: { x: 47.5, y: 78, width: 46, height: 9 } },
      { image: "/demo-screens/maps/request-trip-video/03-preview-time.png", label: "Start a request", title: "Choose Request Video", body: "After confirming the correct moment, open the historical-video request.", hotspot: { x: 85.5, y: 90, width: 13, height: 8 } },
      { image: "/demo-screens/maps/request-trip-video/04-request-settings.png", label: "Review settings", title: "Confirm date, time, type, and duration", body: "Verify the selected date and time, choose the video type and clip duration, then select Send Video.", hotspot: { x: 83, y: 8, width: 14, height: 8 } },
      { image: "/demo-screens/maps/request-trip-video/05-confirm-request.png", label: "Confirm delivery", title: "Name the request and confirm recipients", body: "Add a recognizable request name, verify the recipient email address, and choose Save to submit the request.", hotspot: { x: 38, y: 27, width: 37, height: 50 } },
      { image: "/demo-screens/maps/request-trip-video/06-request-submitted.png", label: "Complete", title: "Video request submitted", body: "The confirmation message shows that the request was submitted and will be processed when the vehicle is available." },
    ],
  },
  "assign-trip-driver": {
    title: "Assign a driver to a trip",
    subtitle: "Review the real per-trip driver selector without changing the recorded assignment.",
    steps: [
      { image: "/demo-screens/maps/assign-driver/01-trip-timeline.png", label: "Find the driver", title: "Locate the trip driver", body: "Each drive segment shows the assigned driver and an edit control.", hotspot: { x: 10, y: 65, width: 15, height: 9 } },
      { image: "/demo-screens/maps/assign-driver/02-driver-list.png", label: "Open assignments", title: "Review the driver list", body: "Open the selector to search drivers, unassign the current driver, or choose a replacement. This lesson does not make a selection.", hotspot: { x: 36, y: 7, width: 25.5, height: 44 } },
      { image: "/demo-screens/maps/assign-driver/02-driver-list.png", label: "Complete", title: "Assignment controls reviewed", body: "You can now locate the driver assignment for an individual trip segment." },
    ],
  },
  "contact-driver": {
    title: "Call or message an in-route driver",
    subtitle: "Use a real moving vehicle to review safe driver communication controls.",
    steps: [
      { image: "/demo-screens/maps/contact-driver/01-in-route.png", label: "Confirm movement", title: "Open a moving vehicle", body: "Confirm the vehicle is moving and the correct driver is assigned before starting communication.", hotspot: { x: 66, y: 36, width: 18, height: 13 } },
      { image: "/demo-screens/maps/contact-driver/01-in-route.png", label: "Choose a channel", title: "Locate Call and Message", body: "Call and Message appear beside the active driver. Follow your organization’s hands-free and safety policy before contacting a moving driver.", hotspot: { x: 39, y: 1, width: 19, height: 8 } },
      { image: "/demo-screens/maps/contact-driver/02-message-composer.png", label: "Review messaging", title: "Use the message composer", body: "The composer confirms the vehicle, driver, and online status and offers approved quick replies. This lesson does not send a message or place a call.", hotspot: { x: 69, y: 18, width: 30, height: 79 } },
      { image: "/demo-screens/maps/contact-driver/01-in-route.png", label: "Complete", title: "Communication controls reviewed", body: "You can now find Call and Message for an active in-route driver without interrupting the live account." },
    ],
  },
  "coach-driver": {
    title: "Coach a driver",
    subtitle: "Move through the real Safety queue and review recorded incident evidence.",
    steps: [
      { image: "/demo-screens/safety/coach-driver/01-exceptions.png", label: "Open coaching", title: "Choose Needs Coaching", body: "Narrow the exception queue to incidents that are ready for a coaching review.", hotspot: { x: 22.8, y: 8.3, width: 12.8, height: 7 } },
      { image: "/demo-screens/safety/coach-driver/02-needs-coaching.png", label: "Choose a rule", title: "Open No Seatbelt", body: "Select a rule to see the affected vehicles and incident count.", hotspot: { x: 7, y: 40.5, width: 92, height: 10 } },
      { image: "/demo-screens/safety/coach-driver/03-rule-vehicles.png", label: "Choose a vehicle", title: "Open ADP Vehicle 1", body: "Open the vehicle with incidents that need coaching.", hotspot: { x: 7, y: 35, width: 92, height: 11 } },
      { image: "/demo-screens/safety/coach-driver/04-incidents.png", label: "Review an incident", title: "Open an exception", body: "Choose an incident to review its video, timeline, status, and driver context.", hotspot: { x: 7, y: 34, width: 92, height: 11 } },
      { image: "/demo-screens/safety/coach-driver/05-incident-detail.png", label: "Document coaching", title: "Review evidence and add coaching", body: "Confirm the evidence, then use Add Coaching to document the conversation. This recorded lesson does not submit changes.", hotspot: { x: 51.5, y: 61.5, width: 13.5, height: 8 } },
      { image: "/demo-screens/safety/coach-driver/05-incident-detail.png", label: "Complete", title: "Coaching workflow reviewed", body: "You can now find a coaching incident and review its evidence safely." },
    ],
  },
  "review-scorecards": {
    title: "Review safety performance",
    subtitle: "Read the real Safety Overview, trends, coaching totals, and risk factors.",
    steps: [
      { image: "/demo-screens/safety/review-scorecards/01-safety-overview.png", label: "Set the period", title: "Choose the reporting week", body: "Use the date selector to define the safety-performance period.", hotspot: { x: 74.5, y: 11.5, width: 19, height: 6 } },
      { image: "/demo-screens/safety/review-scorecards/01-safety-overview.png", label: "Read the score", title: "Review the summary", body: "Compare the current safety score with the previous score, distance, and driving time.", hotspot: { x: 80.2, y: 20.5, width: 17.2, height: 24 } },
      { image: "/demo-screens/safety/review-scorecards/01-safety-overview.png", label: "Inspect trends", title: "Review Safety Performance", body: "Use the trend chart to see how the score changes across the selected period.", hotspot: { x: 28.7, y: 48, width: 33.5, height: 44.5 } },
      { image: "/demo-screens/safety/review-scorecards/01-safety-overview.png", label: "Complete", title: "Performance reviewed", body: "You can now interpret the Safety Overview and its coaching signals." },
    ],
  },
  "manage-event-status": {
    title: "Manage exception status",
    subtitle: "Use the real Safety queue to review an incident’s follow-up and coaching state.",
    steps: [
      { image: "/demo-screens/safety/coach-driver/01-exceptions.png", label: "Filter status", title: "Choose a review queue", body: "Use the exception status filters to isolate incidents that need review or coaching.", hotspot: { x: 22.8, y: 8.3, width: 12.8, height: 7 } },
      { image: "/demo-screens/safety/coach-driver/03-rule-vehicles.png", label: "Choose a vehicle", title: "Open the affected vehicle", body: "Review the vehicle and incident totals associated with the selected rule.", hotspot: { x: 7, y: 35, width: 92, height: 11 } },
      { image: "/demo-screens/safety/coach-driver/04-incidents.png", label: "Open an event", title: "Review the exception", body: "Choose the incident whose review, coaching, or completion status needs attention.", hotspot: { x: 7, y: 34, width: 92, height: 11 } },
      { image: "/demo-screens/safety/coach-driver/05-incident-detail.png", label: "Review follow-up", title: "Inspect status and coaching controls", body: "Review the evidence and available follow-up controls. This lesson does not change the live incident status.", hotspot: { x: 51.5, y: 54, width: 45, height: 30 } },
      { image: "/demo-screens/safety/coach-driver/05-incident-detail.png", label: "Complete", title: "Status workflow reviewed", body: "You can now locate an incident and identify its review and coaching state." },
    ],
  },
  "configure-rules": {
    title: "Configure safety rules",
    subtitle: "Review the real rule builder used to detect and prioritize safety behavior.",
    steps: [
      { image: "/demo-screens/admin/notifications/01-admin-settings.png", label: "Open rules", title: "Choose Rules", body: "Rules contains the safety and operational automations available to the fleet.", hotspot: { x: 68.5, y: 33, width: 29, height: 15.5 } },
      { image: "/demo-screens/admin/notifications/02-rules.png", label: "Start a rule", title: "Choose Create Rule", body: "Open the builder to define the behavior, scope, and response.", hotspot: { x: 84, y: 13, width: 13, height: 8 } },
      { image: "/demo-screens/admin/notifications/03-create-rule.png", label: "Set conditions", title: "Review triggers and thresholds", body: "Choose the source and rule type, then review the available conditions and notification actions. This lesson never saves the rule.", hotspot: { x: 7, y: 18, width: 91, height: 80 } },
      { image: "/demo-screens/admin/notifications/03-create-rule.png", label: "Complete", title: "Safety rule reviewed", body: "You can now find the rule builder and identify its conditions and actions." },
    ],
  },
  "report-schedule": {
    title: "Schedule a report",
    subtitle: "Open a real report, configure its fields, and review email-delivery settings.",
    steps: [
      { image: "/demo-screens/reports/schedule-report/01-report-library.png", label: "Choose a report", title: "Open AAA EXCEPTIONS", body: "Start from the report library and select the report you want to configure.", hotspot: { x: 7, y: 31, width: 90, height: 11 } },
      { image: "/demo-screens/reports/schedule-report/02-report-results.png", label: "Open actions", title: "Open the report menu", body: "Use the actions menu to edit, schedule, share, or download the report.", hotspot: { x: 94, y: 9.8, width: 4.5, height: 7 } },
      { image: "/demo-screens/reports/schedule-report/03-report-actions.png", label: "Edit scheduling", title: "Choose Email Schedule", body: "Open the report editor and its email-schedule configuration.", hotspot: { x: 82, y: 10, width: 16, height: 24 } },
      { image: "/demo-screens/reports/schedule-report/04-report-editor.png", label: "Enable delivery", title: "Turn on Email Schedule", body: "Enable scheduling after the report fields, filters, and sharing settings are correct.", hotspot: { x: 46, y: 59, width: 8, height: 8 } },
      { image: "/demo-screens/reports/schedule-report/05-email-schedule.png", label: "Set delivery", title: "Choose frequency, format, and recipients", body: "Review the delivery time, email frequency, file format, and recipient list. This lesson does not save the form.", hotspot: { x: 36.5, y: 68, width: 61, height: 22 } },
      { image: "/demo-screens/reports/schedule-report/05-email-schedule.png", label: "Complete", title: "Schedule reviewed", body: "You can now find and configure the report scheduling controls." },
    ],
  },
  "run-report": {
    title: "Find and run reports",
    subtitle: "Use the real report library to choose a report and inspect its current results.",
    steps: [
      { image: "/demo-screens/reports/schedule-report/01-report-library.png", label: "Search reports", title: "Find the right report", body: "Browse or search the report library, then choose the report that answers your question.", hotspot: { x: 7, y: 13, width: 90, height: 29 } },
      { image: "/demo-screens/reports/schedule-report/02-report-results.png", label: "Read results", title: "Review the generated report", body: "Confirm the date range and filters, then inspect the current result rows.", hotspot: { x: 7, y: 18, width: 91, height: 72 } },
      { image: "/demo-screens/reports/schedule-report/02-report-results.png", label: "Complete", title: "Report reviewed", body: "You can now find a report and inspect its current output." },
    ],
  },
  "saved-views": {
    title: "Create saved report views",
    subtitle: "Review the real report editor used to preserve repeatable fields and filters.",
    steps: [
      { image: "/demo-screens/reports/schedule-report/02-report-results.png", label: "Open actions", title: "Open the report menu", body: "Use the actions menu to edit the current report configuration.", hotspot: { x: 94, y: 9.8, width: 4.5, height: 7 } },
      { image: "/demo-screens/reports/schedule-report/03-report-actions.png", label: "Edit the report", title: "Choose Edit", body: "Open the report editor to review fields, filters, sharing, and delivery settings.", hotspot: { x: 82, y: 10, width: 16, height: 24 } },
      { image: "/demo-screens/reports/schedule-report/04-report-editor.png", label: "Configure a view", title: "Review fields and filters", body: "Set the report structure you want to reuse. This lesson does not overwrite the live report.", hotspot: { x: 7, y: 18, width: 90, height: 68 } },
      { image: "/demo-screens/reports/schedule-report/04-report-editor.png", label: "Complete", title: "Saved view reviewed", body: "You can now find the controls used to preserve a repeatable report view." },
    ],
  },
  "export-distribute": {
    title: "Export and distribute",
    subtitle: "Review the real report actions for downloading and sharing results.",
    steps: [
      { image: "/demo-screens/reports/schedule-report/02-report-results.png", label: "Open actions", title: "Open the report menu", body: "Use the actions menu from a completed report.", hotspot: { x: 94, y: 9.8, width: 4.5, height: 7 } },
      { image: "/demo-screens/reports/schedule-report/03-report-actions.png", label: "Choose distribution", title: "Review download and sharing options", body: "Choose the appropriate export or sharing method for the intended audience.", hotspot: { x: 82, y: 10, width: 16, height: 24 } },
      { image: "/demo-screens/reports/schedule-report/05-email-schedule.png", label: "Review recipients", title: "Confirm format and audience", body: "Verify file format and recipients before distribution. This lesson does not send or save anything.", hotspot: { x: 36.5, y: 68, width: 61, height: 22 } },
      { image: "/demo-screens/reports/schedule-report/05-email-schedule.png", label: "Complete", title: "Distribution controls reviewed", body: "You can now locate report export and distribution options." },
    ],
  },
  "users-permissions": {
    title: "Users and permissions",
    subtitle: "Navigate the real Admin user list and user-access form.",
    steps: [
      { image: "/demo-screens/admin/users-permissions/01-admin-settings.png", label: "Open users", title: "Choose User Management", body: "User Management contains drivers, technicians, passengers, and general users.", hotspot: { x: 7.5, y: 33, width: 28, height: 15.5 } },
      { image: "/demo-screens/admin/users-permissions/02-users.png", label: "Add a user", title: "Choose Create User", body: "Open the user form from the Admin user list.", hotspot: { x: 84, y: 13, width: 13, height: 8 } },
      { image: "/demo-screens/admin/users-permissions/03-create-user.png", label: "Configure access", title: "Complete user details and security", body: "Set identity, groups, time zone, security, map provider, language, and user type. The lesson never saves the form.", hotspot: { x: 7, y: 18, width: 48, height: 80 } },
      { image: "/demo-screens/admin/users-permissions/03-create-user.png", label: "Complete", title: "User setup reviewed", body: "You can now find the user form and identify its permission controls." },
    ],
  },
  "groups-assets": {
    title: "Groups and assets",
    subtitle: "Review the actual Admin group hierarchy used for access and organization.",
    steps: [
      { image: "/demo-screens/admin/groups-assets/01-admin-settings.png", label: "Open groups", title: "Choose Groups", body: "Groups organize users and fleet entities for permissions and reporting.", hotspot: { x: 7.5, y: 48.5, width: 28, height: 14.5 } },
      { image: "/demo-screens/admin/groups-assets/02-groups.png", label: "Review hierarchy", title: "Inspect parent and child groups", body: "Use the hierarchy to understand how fleet access and organization are inherited.", hotspot: { x: 6.5, y: 12, width: 34, height: 62 } },
      { image: "/demo-screens/admin/groups-assets/02-groups.png", label: "Complete", title: "Groups reviewed", body: "You can now locate and interpret the group hierarchy." },
    ],
  },
  "manage-drivers": {
    title: "Manage drivers",
    subtitle: "Use the real Admin user workspace to find and configure driver profiles.",
    steps: [
      { image: "/demo-screens/admin/manage-drivers/01-admin-settings.png", label: "Open users", title: "Choose User Management", body: "Drivers are managed alongside other user types in Admin.", hotspot: { x: 7.5, y: 33, width: 28, height: 15.5 } },
      { image: "/demo-screens/admin/manage-drivers/02-users.png", label: "Filter drivers", title: "Choose the Drivers tab", body: "The Drivers view isolates driver profiles and shows access, groups, and login information.", hotspot: { x: 7, y: 8, width: 10, height: 8 } },
      { image: "/demo-screens/admin/users-permissions/03-create-user.png", label: "Set driver type", title: "Configure a driver profile", body: "Use the profile section to select Driver and complete the required identity, group, and security fields.", hotspot: { x: 7, y: 18, width: 48, height: 80 } },
      { image: "/demo-screens/admin/users-permissions/03-create-user.png", label: "Complete", title: "Driver setup reviewed", body: "You can now find driver profiles and their configuration fields." },
    ],
  },
  "notifications": {
    title: "Rules and notifications",
    subtitle: "Review the real custom-rule builder and its notification actions.",
    steps: [
      { image: "/demo-screens/admin/notifications/01-admin-settings.png", label: "Open automation", title: "Choose Rules", body: "Rules control safety, productivity, maintenance triggers, and follow-up actions.", hotspot: { x: 68.5, y: 33, width: 29, height: 15.5 } },
      { image: "/demo-screens/admin/notifications/02-rules.png", label: "Create a rule", title: "Open Create Rule", body: "Start from the custom-rule library to define a new automation.", hotspot: { x: 84, y: 13, width: 13, height: 8 } },
      { image: "/demo-screens/admin/notifications/03-create-rule.png", label: "Configure actions", title: "Set conditions and notifications", body: "Choose the rule source and type, then select notification or coaching actions. The lesson does not save the rule.", hotspot: { x: 7, y: 18, width: 91, height: 80 } },
      { image: "/demo-screens/admin/notifications/03-create-rule.png", label: "Complete", title: "Rule setup reviewed", body: "You can now find the rule builder and identify its trigger actions." },
    ],
  },
};

export function ScreenshotWorkflowDemo({ variant }: { variant: DemoVariant }) {
  const workflow = workflows[variant];
  const [mode, setMode] = useState<"guided" | "watch" | null>(null);
  const [step, setStep] = useState(0);
  const current = workflow.steps[step];
  const running = mode !== null;
  const advance = useCallback(() => setStep((value) => Math.min(value + 1, workflow.steps.length - 1)), [workflow.steps.length]);

  useEffect(() => {
    if (mode !== "watch" || step === workflow.steps.length - 1) return;
    const timer = window.setTimeout(advance, 3200);
    return () => window.clearTimeout(timer);
  }, [advance, mode, step, workflow.steps.length]);

  const placement = useMemo(() => {
    const hotspot = current.hotspot;
    if (!hotspot) return { side: "right", style: { "--target-y": "50%" } as CSSProperties };
    const rightEdge = hotspot.x + hotspot.width;
    const centerY = hotspot.y + hotspot.height / 2;
    const placeOnRight = 100 - rightEdge >= 34 || hotspot.x < 34;
    return { side: placeOnRight ? "adjacent-right" : "adjacent-left", style: { "--target-y": `${centerY}%`, left: placeOnRight ? `calc(${rightEdge}% + 14px)` : "auto", right: placeOnRight ? "auto" : `calc(${100 - hotspot.x}% + 14px)` } as CSSProperties };
  }, [current]);

  function start(nextMode: "guided" | "watch") { setStep(0); setMode(nextMode); }
  function exit() { setStep(0); setMode(null); }

  return <section className="workflow-demo-wrap screenshot-workflow">
    <div className="workflow-demo-intro"><div><span>Guided product lesson</span><h2>{workflow.title}</h2><p>{workflow.subtitle}</p></div><div><button onClick={() => start("guided")}>Try it yourself →</button><button onClick={() => start("watch")}>▶ Watch lesson</button></div></div>
    <div className="workflow-demo-shell"><div className="workflow-browser"><i/><i/><i/><span>academy.zencam.com/{variant}</span><b>PRACTICE</b></div><div className="screenshot-stage">
      <img src={assetPath(current.image)} alt={`ZenCam product screen — ${current.title}`} />
      {running && current.hotspot && <button className="screenshot-hotspot" aria-label={`${current.title}. Select highlighted area.`} onClick={advance} style={{ left: `${current.hotspot.x}%`, top: `${current.hotspot.y}%`, width: `${current.hotspot.width}%`, height: `${current.hotspot.height}%` }} />}
      {running && <>{!current.hotspot && <div className="screenshot-complete-mark">✓</div>}<button className="simple-exit screenshot-exit" onClick={exit}>× Exit guide</button><aside className={`simple-tour-card screenshot-tour-card ${placement.side}`} style={placement.style}><div><span>{step + 1}</span><strong>{current.label}</strong></div><h3>{current.title}</h3><p>{current.body}</p><footer><button disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>← Back</button><span>{step + 1} / {workflow.steps.length}</span>{step === workflow.steps.length - 1 ? <button className="next" onClick={exit}>Finish</button> : <button className="next" onClick={advance}>Next →</button>}</footer></aside></>}
    </div></div>
  </section>;
}
