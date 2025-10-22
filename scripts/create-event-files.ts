import fs from "fs";
import fsPromises from "fs/promises";
import path from "path";

interface EventPage {
  group: string;
  openapi: string;
  pages: string[];
}

interface EventGroup {
  group: string;
  pages: EventPage[];
}

interface EventsConfig {
  group: string;
  pages: EventPage[];
}

/**
 * Create MDX files for events and append content from matching Markdown introduction files.
 * Additionally validates that:
 * - for every event a corresponding docs/webhook-introductions file exists
 * - every file in docs/webhook-introductions is actually used by at least one event
 */
const createEventFiles = async (eventsConfig: EventsConfig) => {
  const baseDir = "events";
  const introDir = path.join("docs", "webhook-introductions");

  // Ensure base directories exist
  if (!fs.existsSync(baseDir)) {
    await fsPromises.mkdir(baseDir, { recursive: true });
  }
  if (!fs.existsSync(introDir)) {
    throw new Error(
      `Missing directory: ${introDir}. Please ensure your introduction Markdown files are present.`,
    );
  }

  // Will be used to verify coverage of all files in docs/webhook-introductions
  const usedIntroFiles = new Set<string>();
  const missingIntroForEvents: Array<{ event: string; expectedFile: string }> =
    [];

  for (const eventPage of eventsConfig.pages) {
    // Convert group name to a directory-friendly format
    const folderName = eventPage.group.toLowerCase().replace(/\s+/g, "-");
    const groupDir = path.join(baseDir, folderName);

    // Ensure group folder exists
    if (!fs.existsSync(groupDir)) {
      await fsPromises.mkdir(groupDir, { recursive: true });
      console.log(`Created directory: ${groupDir}`);
    }

    // Process each event in the group
    for (const eventName of eventPage.pages) {
      // Strip the "webhook " prefix
      const cleanEventName = eventName.replace(/^webhook\s+/, "");

      // Compute title base by removing the first two parts (EVENTS and group), then converting dots -> dashes
      const titleBase = cleanEventName
        .split(".")
        .slice(2)
        .join(".")
        .replaceAll(".", "_")
        .replaceAll("_", "-");

      // MDX file name: lowercase + .mdx
      const fileName = `${titleBase.toLowerCase()}.mdx`;
      const filePath = path.join(groupDir, fileName);

      // MDX frontmatter/content
      const fileContent = `---
title: "${titleBase
        .toLowerCase()
        .replaceAll("-", " ")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")}"
description: ""
openapi: "${eventPage.openapi} ${eventName}"
---

`;

      // Build introduction markdown file name:
      // Example: "EVENTS.CUSTOMER.CREATED" -> "events-customer-created.md"
      const eventParts = cleanEventName.split(".");
      const introMdName = `events-${eventParts
        .slice(1)
        .join("-")
        .toLowerCase()}.md`;
      const introMdPath = path.join(introDir, introMdName);

      let introMdContent = "";
      if (fs.existsSync(introMdPath)) {
        introMdContent = await fsPromises.readFile(introMdPath, "utf8");
        usedIntroFiles.add(introMdName);
        // Ensure spacing after frontmatter
        if (!fileContent.endsWith("\n\n") && !introMdContent.startsWith("\n")) {
          introMdContent = `\n\n${introMdContent}`;
        }
      } else {
        // Track missing introduction mapping for strict validation
        missingIntroForEvents.push({
          event: cleanEventName,
          expectedFile: introMdName,
        });
        console.warn(
          `Missing introduction file for ${cleanEventName} -> ${introMdName} (skipping append)`,
        );
      }

      // Always write (overwrite) the MDX file with the frontmatter and appended content (if any)
      await fsPromises.writeFile(
        filePath,
        `${fileContent}${introMdContent}`,
        "utf8",
      );
      console.log(`Updated file: ${filePath}`);
    }
  }

  // Strict validation 1: ensure no event is missing its intro file
  if (missingIntroForEvents.length > 0) {
    const list = missingIntroForEvents
      .map((m) => `- ${m.event} -> expected: ${m.expectedFile}`)
      .join("\n");
    throw new Error(
      `Some events do not have corresponding introduction files in ${introDir}:\n${list}\n\n` +
        `Please add these files or adjust the mapping.`,
    );
  }

  // Strict validation 2: ensure all files in docs/webhook-introductions are used
  const introFiles = (await fsPromises.readdir(introDir)).filter((f) =>
    f.toLowerCase().endsWith(".md"),
  );

  const notUsedIntroFiles = introFiles.filter((f) => !usedIntroFiles.has(f));
  if (notUsedIntroFiles.length > 0) {
    const list = notUsedIntroFiles.map((f) => `- ${f}`).join("\n");
    throw new Error(
      `There are introduction Markdown files in ${introDir} that were not used by any event:\n${list}\n\n` +
        `Please ensure corresponding events exist in the configuration or remove/rename the unused files.`,
    );
  }

  console.log("All introduction Markdown files were properly used.");
};

// Example usage - paste your JSON structure here
const eventsData: EventsConfig = {
  group: "Events",
  pages: [
    {
      group: "Redemption",
      openapi: "/openapi-events/events-redemption.json",
      pages: [
        "webhook EVENTS.REDEMPTION.SUCCEEDED",
        "webhook EVENTS.REDEMPTION.FAILED",
        "webhook EVENTS.REDEMPTION.ROLLBACK.SUCCEEDED",
        "webhook EVENTS.REDEMPTION.ROLLBACK.FAILED",
      ],
    },
    {
      group: "Customer",
      openapi: "/openapi-events/events-customer.json",
      pages: [
        "webhook EVENTS.CUSTOMER.CREATED",
        "webhook EVENTS.CUSTOMER.DELETED",
        "webhook EVENTS.CUSTOMER.REDEMPTION.SUCCEEDED",
        "webhook EVENTS.CUSTOMER.REDEMPTION.ROLLBACK.SUCCEEDED",
        "webhook EVENTS.CUSTOMER.REWARDED",
        "webhook EVENTS.CUSTOMER.REWARDED.LOYALTY_POINTS",
        "webhook EVENTS.CUSTOMER.REWARD_REDEMPTIONS.CREATED",
        "webhook EVENTS.CUSTOMER.REWARD_REDEMPTIONS.PENDING",
        "webhook EVENTS.CUSTOMER.REWARD_REDEMPTIONS.COMPLETED",
        "webhook EVENTS.CUSTOMER.VOUCHER.LOYALTY_CARD.PENDING_POINTS.ACTIVATED",
        "webhook EVENTS.CUSTOMER.VOUCHER.LOYALTY_CARD.PENDING_POINTS.ADDED",
        "webhook EVENTS.CUSTOMER.VOUCHER.LOYALTY_CARD.PENDING_POINTS.CANCELED",
        "webhook EVENTS.CUSTOMER.VOUCHER.LOYALTY_CARD.PENDING_POINTS.UPDATED",
        "webhook EVENTS.CUSTOMER.VOUCHER.LOYALTY_CARD.POINTS_ADDED",
        "webhook EVENTS.CUSTOMER.VOUCHER.LOYALTY_CARD.POINTS_EXPIRED",
        "webhook EVENTS.CUSTOMER.VOUCHER.GIFT.BALANCE_ADDED",
        "webhook EVENTS.CUSTOMER.SEGMENT.ENTERED",
        "webhook EVENTS.CUSTOMER.SEGMENT.LEFT",
        "webhook EVENTS.CUSTOMER.LOYALTY.TIER.JOINED",
        "webhook EVENTS.CUSTOMER.LOYALTY.TIER.UPGRADED",
        "webhook EVENTS.CUSTOMER.LOYALTY.TIER.DOWNGRADED",
        "webhook EVENTS.CUSTOMER.LOYALTY.TIER.PROLONGED",
        "webhook EVENTS.CUSTOMER.LOYALTY.TIER.LEFT",
        "webhook EVENTS.CUSTOMER.HOLDER.ASSIGNMENT.CREATED",
        "webhook EVENTS.CUSTOMER.HOLDER.ASSIGNMENT.DELETED",
        "webhook EVENTS.CUSTOMER.ORDER.CREATED",
        "webhook EVENTS.CUSTOMER.ORDER.PAID",
        "webhook EVENTS.CUSTOMER.ORDER.UPDATED",
        "webhook EVENTS.CUSTOMER.ORDER.CANCELED",
        "webhook EVENTS.CUSTOMER.PUBLICATION.SUCCEEDED",
        "webhook EVENTS.CUSTOMER.CUSTOM_EVENT",
      ],
    },
    {
      group: "Publication",
      openapi: "/openapi-events/events-publication.json",
      pages: ["webhook EVENTS.PUBLICATION.SUCCEEDED"],
    },
    {
      group: "Voucher",
      openapi: "/openapi-events/events-voucher.json",
      pages: [
        "webhook EVENTS.VOUCHER.CREATED",
        "webhook EVENTS.VOUCHER.DISABLED",
        "webhook EVENTS.VOUCHER.ENABLED",
        "webhook EVENTS.VOUCHER.UPDATED",
        "webhook EVENTS.VOUCHER.PUBLISHED",
        "webhook EVENTS.VOUCHER.LOYALTY_CARD.TRANSACTION.CREATED",
        "webhook EVENTS.VOUCHER.LOYALTY_CARD.PENDING_POINTS.ACTIVATED",
        "webhook EVENTS.VOUCHER.LOYALTY_CARD.PENDING_POINTS.ADDED",
        "webhook EVENTS.VOUCHER.LOYALTY_CARD.PENDING_POINTS.CANCELED",
        "webhook EVENTS.VOUCHER.LOYALTY_CARD.PENDING_POINTS.UPDATED",
        "webhook EVENTS.VOUCHER.LOYALTY_CARD.POINTS_ADDED",
        "webhook EVENTS.VOUCHER.LOYALTY_CARD.POINTS_EXPIRED",
        "webhook EVENTS.VOUCHER.GIFT.TRANSACTION.CREATED",
        "webhook EVENTS.VOUCHER.GIFT.BALANCE_ADDED",
        "webhook EVENTS.VOUCHER.DELETED",
      ],
    },
    {
      group: "Campaign",
      openapi: "/openapi-events/events-campaign.json",
      pages: [
        "webhook EVENTS.CAMPAIGN.CREATED",
        "webhook EVENTS.CAMPAIGN.VOUCHERS.GENERATION.COMPLETED",
        "webhook EVENTS.CAMPAIGN.DISABLED",
        "webhook EVENTS.CAMPAIGN.ENABLED",
        "webhook EVENTS.CAMPAIGN.UPDATED",
        "webhook EVENTS.CAMPAIGN.DELETED",
        "webhook EVENTS.CAMPAIGN.LOYALTY_TIER.CREATED",
        "webhook EVENTS.CAMPAIGN.LOYALTY_TIER.DELETED",
        "webhook EVENTS.CAMPAIGN.LOYALTY_TIER.UPDATED",
        "webhook EVENTS.CAMPAIGN.PROMOTION_TIER.CREATED",
        "webhook EVENTS.CAMPAIGN.PROMOTION_TIER.DISABLED",
        "webhook EVENTS.CAMPAIGN.PROMOTION_TIER.ENABLED",
        "webhook EVENTS.CAMPAIGN.PROMOTION_TIER.UPDATED",
        "webhook EVENTS.CAMPAIGN.PROMOTION_TIER.DELETED",
      ],
    },
    {
      group: "Validation Rules",
      openapi: "/openapi-events/events-bus_val_rule.json",
      pages: [
        "webhook EVENTS.BUS_VAL_RULE.CREATED",
        "webhook EVENTS.BUS_VAL_RULE.UPDATED",
        "webhook EVENTS.BUS_VAL_RULE.ASSIGNMENT.CREATED",
        "webhook EVENTS.BUS_VAL_RULE.ASSIGNMENT.DELETED",
        "webhook EVENTS.BUS_VAL_RULE.DELETED",
      ],
    },
    {
      group: "Distribution",
      openapi: "/openapi-events/events-distribution.json",
      pages: ["webhook EVENTS.DISTRIBUTION.MANUAL_DISTRIBUTION_SCHEDULE"],
    },
  ],
};

// Run the script
createEventFiles(eventsData)
  .then(() => {
    console.log("Event files creation completed!");
  })
  .catch((error) => {
    console.error("Error creating event files:", error);
    process.exitCode = 1;
  });
