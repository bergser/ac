export type GhostPost = {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  mobiledoc: string;
  html: string;
  comment_id: string;
  plaintext: string;
  feature_image: string | null;
  featured: number;
  type: "post";
  status: "published";
  locale: null;
  visibility: "public" | "members";
  author_id: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string | null;
  published_at: string;
  published_by: string;
  custom_excerpt: null;
  codeinjection_head: null;
  codeinjection_foot: null;
  custom_template: null;
  canonical_url: null;
  email_recipient_filter: "none";
  newsletter_id: null;
};

export interface IPostConverter {
  process(post: GhostPost): Promise<void>;
}
