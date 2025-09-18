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

const createEventFiles = async (eventsConfig: EventsConfig) => {
  const baseDir = "events";

  // Upewnij się, że główny folder events istnieje
  if (!fs.existsSync(baseDir)) {
    await fsPromises.mkdir(baseDir, { recursive: true });
  }

  for (const eventPage of eventsConfig.pages) {
    // Konwertuj nazwę grupy na format folderu (lowercase, spacje na myślniki)
    const folderName = eventPage.group.toLowerCase().replace(/\s+/g, "-");
    const groupDir = path.join(baseDir, folderName);

    // Utwórz folder grupy jeśli nie istnieje
    if (!fs.existsSync(groupDir)) {
      await fsPromises.mkdir(groupDir, { recursive: true });
      console.log(`Created directory: ${groupDir}`);
    }

    // Przetwórz każdy event w grupie
    for (const eventName of eventPage.pages) {
      // Wyciągnij nazwę eventu z prefixu "webhook "
      const cleanEventName = eventName.replace(/^webhook\s+/, "");

      // Usuń dwa pierwsze człony (EVENTS i nazwa grupy), a następnie zamień . -> _ -> -
      // To będzie baza dla title (bez zmiany wielkości liter)
      const titleBase = cleanEventName
        .split(".")
        .slice(2)
        .join(".")
        .replaceAll(".", "_")
        .replaceAll("_", "-");

      // Nazwa pliku: jak wyżej + lowercase i .mdx
      const fileName = `${titleBase.toLowerCase()}.mdx`;
      const filePath = path.join(groupDir, fileName);

      // Utwórz zawartość pliku MDX
      const fileContent = `---
title: "${titleBase}"
description: ""
openapi: "${eventPage.openapi} ${eventName}"
---

`;

      // Zapisz plik jeśli nie istnieje
      if (!fs.existsSync(filePath)) {
        await fsPromises.writeFile(filePath, fileContent, "utf8");
        console.log(`Created file: ${filePath}`);
      } else {
        console.log(`File already exists: ${filePath}`);
      }
    }
  }
};

// Przykład użycia - wklej tutaj swoją strukturę JSON
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

// Uruchom skrypt
createEventFiles(eventsData)
  .then(() => {
    console.log("Event files creation completed!");
  })
  .catch((error) => {
    console.error("Error creating event files:", error);
  });
