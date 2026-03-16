import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get the user's JWT from the Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Create a client with the user's JWT to verify identity
    const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired session" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const userId = user.id;

    // Create admin client with service role key
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Delete user data from all related tables (order matters for foreign keys)
    const tables = [
      "boss_first_pass_claims",
      "boss_repeat_perfect_claims",
      "coin_purchase_claims",
      "daily_quest_progress",
      "level_node_completions",
      "quiz_first_pass_claims",
      "quiz_repeat_perfect_claims",
      "skill_tree_badge_unlocks",
      "story_reward_claims",
      "profiles",
    ];

    for (const table of tables) {
      const { error: deleteError } = await adminClient
        .from(table)
        .delete()
        .eq("user_id", userId);

      if (deleteError) {
        console.error(`Error deleting from ${table}:`, deleteError.message);
        // Continue — some tables may have no rows
      }
    }

    // Delete the auth user
    const { error: authDeleteError } = await adminClient.auth.admin.deleteUser(userId);
    if (authDeleteError) {
      console.error("Error deleting auth user:", authDeleteError.message);
      return new Response(
        JSON.stringify({ error: "Failed to delete authentication account" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Account and all associated data have been deleted." }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
