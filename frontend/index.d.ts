declare module "#app" {
  interface NuxtApp {
    $db: import("@supabase/supabase-js").SupabaseClient;
  }
}

declare module "vue" {
  interface ComponentCustomProperties {
    $db: import("@supabase/supabase-js").SupabaseClient;
  }
}

export {};
