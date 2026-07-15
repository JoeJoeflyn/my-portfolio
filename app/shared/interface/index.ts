export type CareerLogo =
  | {
      readonly kind: "icon";
      readonly name: string;
      readonly fallback: string;
    }
  | {
      readonly kind: "image";
      readonly src: string;
      readonly alt: string;
    };

export type CareerEntry = {
  readonly company: string;
  readonly role: string;
  readonly dateStart: string;
  readonly dateEnd: string;
  readonly logo: CareerLogo;
  readonly description?: string;
};

export type SocialLink =
  | {
      readonly href: string;
      readonly kind: "resume";
      readonly label: string;
    }
  | {
      readonly href: string;
      readonly kind: "icon";
      readonly icon: string;
      readonly label: string;
    };

export type AllTimeType = {
  readonly text: string;
  readonly daily_average: number;
  readonly range: {
    readonly start_date: string;
    readonly end_text: string;
    readonly end_date: string;
  };
};

export type WakaStatItemType = {
  readonly total_seconds: number;
  readonly name: string;
  readonly percent: number;
  readonly digital: string;
  readonly decimal: string;
  readonly text: string;
  readonly hours: number;
  readonly minutes: number;
  readonly seconds?: number;
};

export type WakaStatsType = {
  readonly total_seconds: number;
  readonly human_readable_daily_average_including_other_language: string;
  readonly human_readable_total?: string;
  readonly best_day: {
    readonly date: string;
    readonly text: string;
    readonly total_seconds?: number;
  };
  readonly grand_total?: {
    readonly text: string;
  };
  readonly categories?: readonly WakaStatItemType[];
  readonly languages?: readonly WakaStatItemType[];
  readonly editors?: readonly WakaStatItemType[];
  readonly operating_systems?: readonly WakaStatItemType[];
};

export type WakaSummaryType = {
  readonly range: {
    readonly start: string;
    readonly end: string;
    readonly date: string;
    readonly text: string;
    readonly timezone: string;
  };
  readonly grand_total: {
    readonly hours: number;
    readonly minutes: number;
    readonly total_seconds: number;
    readonly digital: string;
    readonly decimal: string;
    readonly text: string;
  };
  readonly categories?: readonly WakaStatItemType[];
  readonly languages?: readonly WakaStatItemType[];
  readonly editors?: readonly WakaStatItemType[];
  readonly operating_systems?: readonly WakaStatItemType[];
};
