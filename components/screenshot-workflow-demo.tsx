"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { assetPath } from "../lib/asset-path";
import type { DemoVariant } from "../lib/training-catalog";

type Hotspot = { x: number; y: number; width: number; height: number };
type ScreenshotStep = { image: string; label: string; title: string; body: string; hotspot?: Hotspot };
type RecordedWorkflow = { title: string; subtitle: string; steps: ScreenshotStep[] };

const workflows: Record<DemoVariant, RecordedWorkflow> = {
  "map-trips": {
    title: "View vehicle trips",
    subtitle: "Follow a vehicle from Live Map into its trip history and camera timeline.",
    steps: [
      { image: "/demo-screens/maps-view-trips/01-live-map.png", label: "Locate the vehicle", title: "Choose a vehicle", body: "Select AVIATOR_ZenCAM LITE from the Live Map asset list.", hotspot: { x: 6.4, y: 58.3, width: 32.7, height: 13.5 } },
      { image: "/demo-screens/maps-view-trips/02-vehicle-detail.png", label: "Open history", title: "Choose Trip History", body: "Trip History shows where the vehicle traveled on previous days, along with stops, exceptions, and camera activity.", hotspot: { x: 8.8, y: 8.2, width: 8.1, height: 6.2 } },
      { image: "/demo-screens/maps-view-trips/03-trip-history.png", label: "Choose the day", title: "Select a day with activity", body: "Days with recorded trips show activity counts. Select July 14 to open its trip timeline.", hotspot: { x: 11.7, y: 63.1, width: 4.7, height: 13.8 } },
      { image: "/demo-screens/maps-view-trips/04-trip-timeline.png", label: "Inspect the route", title: "Review an individual trip", body: "Use the timeline to review drive time, distance, stops, exceptions, and the route.", hotspot: { x: 7.2, y: 50.5, width: 33.5, height: 28 } },
      { image: "/demo-screens/maps-view-trips/05-trip-hover-camera.png", label: "Hover on the route", title: "Preview trip and camera details", body: "Hover over a route point to see its time, stop and idle details, assigned driver, and camera frame without leaving the map.", hotspot: { x: 69, y: 24, width: 27, height: 34 } },
      { image: "/demo-screens/maps-view-trips/05-trip-hover-camera.png", label: "Complete", title: "You can now review a vehicle trip", body: "You know how to open Trip History, choose a date, and inspect the route with its camera details." },
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
      { image: "/demo-screens/safety/coach-driver/05-incident-detail.png", label: "Complete", title: "You can now review a trip exception", body: "You know how to choose a date, find an exception under a trip, and open its details for follow-up." },
    ],
  },
  "proximity-search": {
    title: "Find vehicle activity with Proximity Search",
    subtitle: "Select a point on the map, choose a date range, and find vehicles that passed through the area.",
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
    subtitle: "Use the Assets workspace to find a vehicle, update its details, and choose its assigned driver.",
    steps: [
      { image: "/demo-screens/maps/manage-assets/01-assets-list.png", label: "Open assets", title: "Find an asset", body: "The Assets page lists vehicle name, assigned driver, location, health, groups, and camera recording status.", hotspot: { x: 7, y: 22, width: 91, height: 62 } },
      { image: "/demo-screens/maps/manage-assets/02-asset-overview.png", label: "Review details", title: "Open the asset record", body: "The asset overview brings identification, assignment, groups, driver, location, and recent activity into one record.", hotspot: { x: 8, y: 17, width: 91, height: 65 } },
      { image: "/demo-screens/maps/manage-assets/03-edit-asset.png", label: "Edit the asset", title: "Update the name and details", body: "Choose Edit to update the asset name, groups, vehicle details, odometer, engine hours, and other operating information.", hotspot: { x: 7, y: 18, width: 45, height: 66 } },
      { image: "/demo-screens/maps/manage-assets/03-edit-asset.png", label: "Assign a driver", title: "Choose the assigned driver", body: "Under Usage & Assignment, open Driver(s), choose the correct driver, and save the asset when your changes are complete.", hotspot: { x: 52, y: 51, width: 44, height: 37 } },
      { image: "/demo-screens/maps/manage-assets/03-edit-asset.png", label: "Complete", title: "You can now manage an asset", body: "You know where to update an asset’s name and details and how to choose its assigned driver." },
    ],
  },
  "map-manage-drivers": {
    title: "Add and assign drivers",
    subtitle: "Use the Drivers workspace to add a driver profile and connect that person to a trip.",
    steps: [
      { image: "/demo-screens/maps/manage-drivers/01-drivers-list.png", label: "Open drivers", title: "Review the Drivers page", body: "The Drivers view lists driver identity, username, phone, security, groups, and last login.", hotspot: { x: 7, y: 22, width: 91, height: 61 } },
      { image: "/demo-screens/maps/manage-drivers/02-add-user.png", label: "Add a driver", title: "Choose Create User", body: "Enter the driver's identity, contact details, groups, time zone, security, map provider, and language.", hotspot: { x: 7, y: 15, width: 53, height: 76 } },
      { image: "/demo-screens/maps/manage-drivers/03-driver-profile.png", label: "Set the profile", title: "Select Driver as the user type", body: "Under Profile Details, choose Driver so the new user is available for vehicle and trip assignment.", hotspot: { x: 7, y: 76, width: 48, height: 17 } },
      { image: "/demo-screens/maps/assign-driver/02-driver-list.png", label: "Assign the driver", title: "Choose the driver on a trip", body: "Open the driver selector, search for the driver, and select the correct name. The assignment applies to the trip you opened.", hotspot: { x: 36, y: 7, width: 25.5, height: 44 } },
      { image: "/demo-screens/maps/assign-driver/02-driver-list.png", label: "Complete", title: "You can now add and assign a driver", body: "You know how to create a driver profile and where to assign that driver to a trip." },
    ],
  },
  "manage-locations": {
    title: "Create locations and zones",
    subtitle: "Create a named place and draw the map boundary that defines its zone.",
    steps: [
      { image: "/demo-screens/maps/manage-locations/01-locations-list.png", label: "Open locations", title: "Review saved locations", body: "Locations are named places such as offices, yards, customer sites, or homes. Their zones let ZenCam recognize activity inside a defined area.", hotspot: { x: 7, y: 22, width: 91, height: 61 } },
      { image: "/demo-screens/maps/manage-locations/02-create-zone-circle.png", label: "Create a location", title: "Enter the location details", body: "Choose Create Location, then enter the name, group, tag, address, contact information, business hours, and stop duration.", hotspot: { x: 5, y: 12, width: 43, height: 80 } },
      { image: "/demo-screens/maps/manage-locations/02-create-zone-circle.png", label: "Define the zone", title: "Set a circular geofence", body: "A geofence is the zone boundary around the location. Choose Circle, then set its color, opacity, and radius on the map.", hotspot: { x: 64, y: 63, width: 34, height: 29 } },
      { image: "/demo-screens/maps/manage-locations/03-zone-polygon.png", label: "Shape the zone", title: "Use a polygon for an exact boundary", body: "Choose Polygon when the location needs a custom boundary, then place points around the area before saving.", hotspot: { x: 64, y: 63, width: 34, height: 29 } },
      { image: "/demo-screens/maps/manage-locations/03-zone-polygon.png", label: "Complete", title: "You can now create a location zone", body: "You know what a zone represents and when to use a circle or polygon to define its boundary." },
    ],
  },
  "request-trip-video": {
    title: "Request video from a trip",
    subtitle: "Choose a trip, preview its camera timeline, and submit a request for saved video.",
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
    subtitle: "Open a trip and learn how to choose the correct driver for that trip.",
    steps: [
      { image: "/demo-screens/maps/assign-driver/01-trip-timeline.png", label: "Find the driver", title: "Locate the trip driver", body: "Each drive segment shows the assigned driver and an edit control.", hotspot: { x: 10, y: 65, width: 15, height: 9 } },
      { image: "/demo-screens/maps/assign-driver/02-driver-list.png", label: "Choose the driver", title: "Search and select the correct driver", body: "Open the list, search by name, and select the driver who completed the trip. Choose Unassign only when no driver should be linked to it.", hotspot: { x: 36, y: 7, width: 25.5, height: 44 } },
      { image: "/demo-screens/maps/assign-driver/02-driver-list.png", label: "Complete", title: "You can now assign a trip driver", body: "You know where to find the assignment and how to choose or remove a driver for one trip." },
    ],
  },
  "contact-driver": {
    title: "Call or message an in-route driver",
    subtitle: "Find the call and message controls for a driver who is currently on route.",
    steps: [
      { image: "/demo-screens/maps/contact-driver/01-in-route.png", label: "Confirm movement", title: "Open a moving vehicle", body: "Confirm the vehicle is moving and the correct driver is assigned before starting communication.", hotspot: { x: 66, y: 36, width: 18, height: 13 } },
      { image: "/demo-screens/maps/contact-driver/01-in-route.png", label: "Choose a channel", title: "Locate Call and Message", body: "Call and Message appear beside the active driver. Follow your organization’s hands-free and safety policy before contacting a moving driver.", hotspot: { x: 39, y: 1, width: 19, height: 8 } },
      { image: "/demo-screens/maps/contact-driver/02-message-composer.png", label: "Prepare a message", title: "Use the message composer", body: "Confirm the vehicle, driver, and online status. Then choose an approved quick reply or write a short message that follows your company’s safety policy.", hotspot: { x: 69, y: 18, width: 30, height: 79 } },
      { image: "/demo-screens/maps/contact-driver/01-in-route.png", label: "Complete", title: "You can now contact an in-route driver", body: "You know how to confirm the driver and find the Call and Message controls while following your organization’s safety policy." },
    ],
  },
  "coach-driver": {
    title: "Coach a driver",
    subtitle: "Find an event that needs coaching, review its evidence, and locate the coaching record.",
    steps: [
      { image: "/demo-screens/safety/coach-driver/01-exceptions.png", label: "Open coaching", title: "Choose Needs Coaching", body: "Narrow the exception queue to incidents that are ready for a coaching review.", hotspot: { x: 22.8, y: 8.3, width: 12.8, height: 7 } },
      { image: "/demo-screens/safety/coach-driver/02-needs-coaching.png", label: "Choose a rule", title: "Open No Seatbelt", body: "Select a rule to see the affected vehicles and incident count.", hotspot: { x: 7, y: 40.5, width: 92, height: 10 } },
      { image: "/demo-screens/safety/coach-driver/03-rule-vehicles.png", label: "Choose a vehicle", title: "Open ADP Vehicle 1", body: "Open the vehicle with incidents that need coaching.", hotspot: { x: 7, y: 35, width: 92, height: 11 } },
      { image: "/demo-screens/safety/coach-driver/04-incidents.png", label: "Review an incident", title: "Open an exception", body: "Choose an incident to review its video, timeline, status, and driver context.", hotspot: { x: 7, y: 34, width: 92, height: 11 } },
      { image: "/demo-screens/safety/coach-driver/05-incident-detail.png", label: "Document coaching", title: "Review the evidence and choose Add Coaching", body: "Confirm the video and event details first. Then choose Add Coaching to record the conversation, outcome, and any follow-up needed.", hotspot: { x: 51.5, y: 61.5, width: 13.5, height: 8 } },
      { image: "/demo-screens/safety/coach-driver/05-incident-detail.png", label: "Complete", title: "You can now begin a coaching record", body: "You know how to find an event, review its evidence, and open the coaching form for the driver." },
    ],
  },
  "review-scorecards": {
    title: "Review safety performance",
    subtitle: "Read the Safety Overview to understand scores, trends, coaching totals, and risk factors.",
    steps: [
      { image: "/demo-screens/safety/review-scorecards/01-safety-overview.png", label: "Set the period", title: "Choose the reporting week", body: "Use the date selector to define the safety-performance period.", hotspot: { x: 74.5, y: 11.5, width: 19, height: 6 } },
      { image: "/demo-screens/safety/review-scorecards/01-safety-overview.png", label: "Read the score", title: "Review the summary", body: "Compare the current safety score with the previous score, distance, and driving time.", hotspot: { x: 80.2, y: 20.5, width: 17.2, height: 24 } },
      { image: "/demo-screens/safety/review-scorecards/01-safety-overview.png", label: "Inspect trends", title: "Review the performance trend", body: "Use the trend chart to see whether the score is improving or declining during the selected period.", hotspot: { x: 28.7, y: 48, width: 33.5, height: 44.5 } },
      { image: "/demo-screens/safety/review-scorecards/01-safety-overview.png", label: "Complete", title: "You can now read the Safety Overview", body: "You know how to set the period, read the summary, and use trends to identify where coaching may be needed." },
    ],
  },
  "manage-event-status": {
    title: "Manage exception status",
    subtitle: "Use the Safety queue to find an event and understand its review and coaching status.",
    steps: [
      { image: "/demo-screens/safety/coach-driver/01-exceptions.png", label: "Filter status", title: "Choose a review queue", body: "Use the exception status filters to isolate incidents that need review or coaching.", hotspot: { x: 22.8, y: 8.3, width: 12.8, height: 7 } },
      { image: "/demo-screens/safety/coach-driver/03-rule-vehicles.png", label: "Choose a vehicle", title: "Open the affected vehicle", body: "Review the vehicle and incident totals associated with the selected rule.", hotspot: { x: 7, y: 35, width: 92, height: 11 } },
      { image: "/demo-screens/safety/coach-driver/04-incidents.png", label: "Open an event", title: "Review the exception", body: "Choose the incident whose review, coaching, or completion status needs attention.", hotspot: { x: 7, y: 34, width: 92, height: 11 } },
      { image: "/demo-screens/safety/coach-driver/05-incident-detail.png", label: "Review follow-up", title: "Find the status and coaching controls", body: "Review the evidence, then use the available status and coaching controls to record the next step in your own account.", hotspot: { x: 51.5, y: 54, width: 45, height: 30 } },
      { image: "/demo-screens/safety/coach-driver/05-incident-detail.png", label: "Complete", title: "You can now manage an event’s status", body: "You know how to find an event, review its evidence, and locate the controls for coaching and follow-up." },
    ],
  },
  "configure-rules": {
    title: "Set up safety rules",
    subtitle: "Learn where to choose the driving behaviors ZenCam detects and how the fleet is notified.",
    steps: [
      { image: "/demo-screens/admin/notifications/01-admin-settings.png", label: "Open rules", title: "Choose Rules", body: "Rules contains the safety and operational automations available to the fleet.", hotspot: { x: 68.5, y: 33, width: 29, height: 15.5 } },
      { image: "/demo-screens/admin/notifications/02-rules.png", label: "Start a rule", title: "Choose Create Rule", body: "Open the builder to define the behavior, scope, and response.", hotspot: { x: 84, y: 13, width: 13, height: 8 } },
      { image: "/demo-screens/admin/notifications/03-create-rule.png", label: "Set conditions", title: "Choose triggers and actions", body: "Choose the source and rule type, set the conditions that trigger the rule, and select who should be notified. Review every setting before saving in your own account.", hotspot: { x: 7, y: 18, width: 91, height: 80 } },
      { image: "/demo-screens/admin/notifications/03-create-rule.png", label: "Complete", title: "You can now begin a safety rule", body: "You know where to find the rule builder and how its conditions and notification actions fit together." },
    ],
  },
  "report-schedule": {
    title: "Schedule a report",
    subtitle: "Choose a report and set its recurring email schedule, file format, and recipients.",
    steps: [
      { image: "/demo-screens/reports/schedule-report/01-report-library.png", label: "Choose a report", title: "Open AAA EXCEPTIONS", body: "Start from the report library and select the report you want to configure.", hotspot: { x: 7, y: 31, width: 90, height: 11 } },
      { image: "/demo-screens/reports/schedule-report/02-report-results.png", label: "Open actions", title: "Open the report menu", body: "Use the actions menu to edit, schedule, share, or download the report.", hotspot: { x: 94, y: 9.8, width: 4.5, height: 7 } },
      { image: "/demo-screens/reports/schedule-report/03-report-actions.png", label: "Edit scheduling", title: "Choose Email Schedule", body: "Open the report editor and its email-schedule configuration.", hotspot: { x: 82, y: 10, width: 16, height: 24 } },
      { image: "/demo-screens/reports/schedule-report/04-report-editor.png", label: "Enable delivery", title: "Turn on Email Schedule", body: "Enable scheduling after the report fields, filters, and sharing settings are correct.", hotspot: { x: 46, y: 59, width: 8, height: 8 } },
      { image: "/demo-screens/reports/schedule-report/05-email-schedule.png", label: "Set delivery", title: "Choose frequency, format, and recipients", body: "Set the delivery time and frequency, choose the file format, and add each recipient. In your own account, review the settings before saving.", hotspot: { x: 36.5, y: 68, width: 61, height: 22 } },
      { image: "/demo-screens/reports/schedule-report/05-email-schedule.png", label: "Complete", title: "You can now schedule a report", body: "You know how to open Email Schedule and choose when, how, and to whom the report is delivered." },
    ],
  },
  "run-report": {
    title: "Find and run reports",
    subtitle: "Use the report library to find a report and understand its results.",
    steps: [
      { image: "/demo-screens/reports/schedule-report/01-report-library.png", label: "Search reports", title: "Find the right report", body: "Browse or search the report library, then choose the report that answers your question.", hotspot: { x: 7, y: 13, width: 90, height: 29 } },
      { image: "/demo-screens/reports/schedule-report/02-report-results.png", label: "Read results", title: "Review the generated report", body: "Confirm the date range and filters, then inspect the current result rows.", hotspot: { x: 7, y: 18, width: 91, height: 72 } },
      { image: "/demo-screens/reports/schedule-report/02-report-results.png", label: "Complete", title: "You can now run a report", body: "You know how to find a report, confirm its date range and filters, and read the result rows." },
    ],
  },
  "saved-views": {
    title: "Save a report view",
    subtitle: "Learn how to set up report fields and filters you can reuse later.",
    steps: [
      { image: "/demo-screens/reports/schedule-report/02-report-results.png", label: "Open actions", title: "Open the report menu", body: "Use the actions menu to edit the current report configuration.", hotspot: { x: 94, y: 9.8, width: 4.5, height: 7 } },
      { image: "/demo-screens/reports/schedule-report/03-report-actions.png", label: "Edit the report", title: "Choose Edit", body: "Open the report editor to review fields, filters, sharing, and delivery settings.", hotspot: { x: 82, y: 10, width: 16, height: 24 } },
      { image: "/demo-screens/reports/schedule-report/04-report-editor.png", label: "Configure a view", title: "Set fields and filters", body: "Choose the fields and filters you want to reuse. In your own account, review the sharing settings and save the report when it is ready.", hotspot: { x: 7, y: 18, width: 90, height: 68 } },
      { image: "/demo-screens/reports/schedule-report/04-report-editor.png", label: "Complete", title: "You can now prepare a saved report view", body: "You know where to edit a report and how to set up reusable fields and filters." },
    ],
  },
  "export-distribute": {
    title: "Export and share a report",
    subtitle: "Find the report actions used to download results or send them to other people.",
    steps: [
      { image: "/demo-screens/reports/schedule-report/02-report-results.png", label: "Open actions", title: "Open the report menu", body: "Use the actions menu from a completed report.", hotspot: { x: 94, y: 9.8, width: 4.5, height: 7 } },
      { image: "/demo-screens/reports/schedule-report/03-report-actions.png", label: "Choose an option", title: "Find download and sharing actions", body: "Choose Download when you need a local copy. Choose Share or Email Schedule when other people need access to the results.", hotspot: { x: 82, y: 10, width: 16, height: 24 } },
      { image: "/demo-screens/reports/schedule-report/05-email-schedule.png", label: "Review recipients", title: "Confirm the format and audience", body: "Check the file format and every recipient before sending or saving. Share fleet information only with authorized people.", hotspot: { x: 36.5, y: 68, width: 61, height: 22 } },
      { image: "/demo-screens/reports/schedule-report/05-email-schedule.png", label: "Complete", title: "You can now export or share a report", body: "You know where to find the report actions and what to confirm before distributing fleet information." },
    ],
  },
  "users-permissions": {
    title: "Manage users and permissions",
    subtitle: "Open User Management and learn which settings control a person’s access.",
    steps: [
      { image: "/demo-screens/admin/users-permissions/01-admin-settings.png", label: "Open users", title: "Choose User Management", body: "User Management contains drivers, technicians, passengers, and general users.", hotspot: { x: 7.5, y: 33, width: 28, height: 15.5 } },
      { image: "/demo-screens/admin/users-permissions/02-users.png", label: "Add a user", title: "Choose Create User", body: "Open the user form from the Admin user list.", hotspot: { x: 84, y: 13, width: 13, height: 8 } },
      { image: "/demo-screens/admin/users-permissions/03-create-user.png", label: "Configure access", title: "Complete user details and security", body: "Enter the person’s details, choose the correct groups and user type, and review security, time zone, map, and language settings before saving in your own account.", hotspot: { x: 7, y: 18, width: 48, height: 80 } },
      { image: "/demo-screens/admin/users-permissions/03-create-user.png", label: "Complete", title: "You can now prepare a new user", body: "You know where to create a user and which settings control that person’s access to ZenCam." },
    ],
  },
  "groups-assets": {
    title: "Understand groups and assets",
    subtitle: "Learn how groups organize people, vehicles, reporting, and access.",
    steps: [
      { image: "/demo-screens/admin/groups-assets/01-admin-settings.png", label: "Open groups", title: "Choose Groups", body: "Groups organize users, vehicles, and other assets so you can control reporting and access for the right teams.", hotspot: { x: 7.5, y: 48.5, width: 28, height: 14.5 } },
      { image: "/demo-screens/admin/groups-assets/02-groups.png", label: "Review hierarchy", title: "Read parent and child groups", body: "A parent group can contain smaller child groups. Use this structure to organize locations, teams, or departments and keep access easy to manage.", hotspot: { x: 6.5, y: 12, width: 34, height: 62 } },
      { image: "/demo-screens/admin/groups-assets/02-groups.png", label: "Complete", title: "You can now understand the group structure", body: "You know where groups are managed and how parent and child groups organize access and reporting." },
    ],
  },
  "manage-drivers": {
    title: "Manage drivers",
    subtitle: "Use User Management to find and configure driver profiles.",
    steps: [
      { image: "/demo-screens/admin/manage-drivers/01-admin-settings.png", label: "Open users", title: "Choose User Management", body: "Drivers are managed alongside other user types in Admin.", hotspot: { x: 7.5, y: 33, width: 28, height: 15.5 } },
      { image: "/demo-screens/admin/manage-drivers/02-users.png", label: "Filter drivers", title: "Choose the Drivers tab", body: "The Drivers view isolates driver profiles and shows access, groups, and login information.", hotspot: { x: 7, y: 8, width: 10, height: 8 } },
      { image: "/demo-screens/admin/users-permissions/03-create-user.png", label: "Set driver type", title: "Configure a driver profile", body: "Use the profile section to select Driver and complete the required identity, group, and security fields.", hotspot: { x: 7, y: 18, width: 48, height: 80 } },
      { image: "/demo-screens/admin/users-permissions/03-create-user.png", label: "Complete", title: "You can now manage a driver profile", body: "You know how to filter the user list for drivers and where to update driver profile settings." },
    ],
  },
  "notifications": {
    title: "Rules and notifications",
    subtitle: "Learn how rule conditions trigger notifications and coaching actions.",
    steps: [
      { image: "/demo-screens/admin/notifications/01-admin-settings.png", label: "Open automation", title: "Choose Rules", body: "Rules control safety, productivity, maintenance triggers, and follow-up actions.", hotspot: { x: 68.5, y: 33, width: 29, height: 15.5 } },
      { image: "/demo-screens/admin/notifications/02-rules.png", label: "Create a rule", title: "Open Create Rule", body: "Start from the custom-rule library to define a new automation.", hotspot: { x: 84, y: 13, width: 13, height: 8 } },
      { image: "/demo-screens/admin/notifications/03-create-rule.png", label: "Configure actions", title: "Set conditions and notifications", body: "Choose the rule source and type, set the conditions, and select the notification or coaching actions. Review every setting before saving in your own account.", hotspot: { x: 7, y: 18, width: 91, height: 80 } },
      { image: "/demo-screens/admin/notifications/03-create-rule.png", label: "Complete", title: "You can now begin a rule", body: "You know where to create a rule and how its conditions and notification actions fit together." },
    ],
  },
};

type LessonLink = { href: string; label: string };

export function ScreenshotWorkflowDemo({
  variant,
  moduleLink,
  nextLesson,
}: {
  variant: DemoVariant;
  moduleLink: LessonLink;
  nextLesson?: LessonLink;
}) {
  const workflow = workflows[variant];
  const [mode, setMode] = useState<"guided" | "watch" | null>(null);
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const completionRef = useRef<HTMLElement>(null);
  const current = workflow.steps[step];
  const running = mode !== null;
  const advance = useCallback(() => setStep((value) => Math.min(value + 1, workflow.steps.length - 1)), [workflow.steps.length]);
  const exit = useCallback(() => { setStep(0); setMode(null); }, []);

  useEffect(() => {
    if (mode !== "watch" || step === workflow.steps.length - 1) return;
    const timer = window.setTimeout(advance, 5000);
    return () => window.clearTimeout(timer);
  }, [advance, mode, step, workflow.steps.length]);

  const placement = useMemo(() => {
    const hotspot = current.hotspot;
    if (!hotspot) return { side: "right", style: { "--target-y": "50%" } as CSSProperties };
    const rightEdge = hotspot.x + hotspot.width;
    const centerY = hotspot.y + hotspot.height / 2;
    const rightSpace = 100 - rightEdge;
    const leftSpace = hotspot.x;
    if (rightSpace >= 34) return { side: "adjacent-right", style: { "--target-y": `${centerY}%`, left: `calc(${rightEdge}% + 14px)`, right: "auto" } as CSSProperties };
    if (leftSpace >= 34) return { side: "adjacent-left", style: { "--target-y": `${centerY}%`, left: "auto", right: `calc(${100 - hotspot.x}% + 14px)` } as CSSProperties };

    const targetIsLeft = hotspot.x + hotspot.width / 2 < 50;
    return { side: targetIsLeft ? "overlay-right" : "overlay-left", style: { "--target-y": `${centerY}%`, left: targetIsLeft ? "auto" : "2%", right: targetIsLeft ? "2%" : "auto" } as CSSProperties };
  }, [current]);

  useEffect(() => {
    if (!running) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") exit();
      if (event.key === "ArrowRight") advance();
      if (event.key === "ArrowLeft") setStep((value) => Math.max(0, value - 1));
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [advance, exit, running]);

  useEffect(() => {
    if (completed) completionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [completed]);

  function start(nextMode: "guided" | "watch") { setCompleted(false); setStep(0); setMode(nextMode); }
  function finish() { setCompleted(true); setMode(null); }

  return <section className="workflow-demo-wrap screenshot-workflow">
    <div className="workflow-demo-intro"><div><span>Interactive ZenCam lesson</span><h2>{workflow.title}</h2><p>{workflow.subtitle}</p></div><div><button onClick={() => start("guided")}>Start guided lesson →</button><button onClick={() => start("watch")}>▶ Watch step by step</button></div></div>
    <div className="workflow-demo-shell"><div className="workflow-browser"><i/><i/><i/><span>academy.zencam.com/{variant}</span><b>PRACTICE</b></div><div className="screenshot-stage">
      <img src={assetPath(current.image)} alt={`ZenCam product screen — ${current.title}`} />
      {running && current.hotspot && <button className="screenshot-hotspot" aria-label={`${current.title}. Select highlighted area.`} onClick={advance} style={{ left: `${current.hotspot.x}%`, top: `${current.hotspot.y}%`, width: `${current.hotspot.width}%`, height: `${current.hotspot.height}%` }} />}
      {running && <>{!current.hotspot && <div className="screenshot-complete-mark">✓</div>}<button className="simple-exit screenshot-exit" onClick={exit}>× Exit lesson</button><aside className={`simple-tour-card screenshot-tour-card ${placement.side}`} style={placement.style}><div><span>{step + 1}</span><strong>{current.label}</strong></div><h3>{current.title}</h3><p>{current.body}</p><footer><button disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>← Back</button><span>{step + 1} / {workflow.steps.length}</span>{step === workflow.steps.length - 1 ? <button className="next" onClick={finish}>Finish lesson</button> : <button className="next" onClick={advance}>Next →</button>}</footer></aside></>}
    </div></div>
    {completed && <aside ref={completionRef} className="lesson-complete" aria-live="polite"><div><span>Lesson complete</span><h3>You’re ready to use this workflow in ZenCam.</h3><p>Repeat the lesson at any time, or continue to the next task.</p></div><div><button onClick={() => start("guided")}>Review again</button>{nextLesson ? <Link href={nextLesson.href}>Next: {nextLesson.label} →</Link> : <Link href={moduleLink.href}>Back to {moduleLink.label} →</Link>}</div></aside>}
  </section>;
}
