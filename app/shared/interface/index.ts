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
