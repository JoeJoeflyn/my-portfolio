export type NotionBlock = {
  object: "block";
  id: string;
  parent: {
    type: "page_id";
    page_id: string;
  };
  created_time: string;
  last_edited_time: string;
  created_by: {
    object: "user";
    id: string;
  };
  last_edited_by: {
    object: "user";
    id: string;
  };
  has_children: boolean;
  archived: boolean;
  in_trash: boolean;
  type: "child_page";
  properties: {
    Tags?: any; // Assuming Tags can be of any structure; adjust as needed
    Name: {
      title: [
        {
          plain_text: string;
        }
      ];
    };
  };
}[];

export type AllTimeType = {
  text: string;
  daily_average: number;
  range: {
    start_date: string;
    end_text: string;
    end_date: string;
  };
};

export type WakaStatsType = {
  total_seconds: number;
  name: string;
  percent: number;
  digital: string;
  decimal: string;
  text: string;
  hours: number;
  minutes: number;
  human_readable_daily_average_including_other_language: string;
  best_day: {
    date: string;
    text: string;
  };
  grand_total: {
    text: string;
  };
};

export type WakaInsightsType = {
  categories: [];
  date: string;
  total: number;
};
