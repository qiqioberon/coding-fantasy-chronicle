export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      boss_first_pass_claims: {
        Row: {
          coin_reward: number
          created_at: string
          exp_reward: number
          fight_id: string
          is_perfect: boolean
          user_id: string
        }
        Insert: {
          coin_reward: number
          created_at?: string
          exp_reward: number
          fight_id: string
          is_perfect: boolean
          user_id: string
        }
        Update: {
          coin_reward?: number
          created_at?: string
          exp_reward?: number
          fight_id?: string
          is_perfect?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "boss_first_pass_claims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      boss_repeat_perfect_claims: {
        Row: {
          claim_local_date: string
          created_at: string
          exp_reward: number
          fight_id: string
          user_id: string
        }
        Insert: {
          claim_local_date: string
          created_at?: string
          exp_reward: number
          fight_id: string
          user_id: string
        }
        Update: {
          claim_local_date?: string
          created_at?: string
          exp_reward?: number
          fight_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "boss_repeat_perfect_claims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      coin_purchase_claims: {
        Row: {
          awarded_coins: number
          claim_status: string
          created_at: string
          id: number
          order_id: string
          package_name: string
          product_id: string
          purchase_payload: string
          purchase_state: string
          purchase_token: string
          reason: string
          updated_at: string
          user_id: string
        }
        Insert: {
          awarded_coins?: number
          claim_status: string
          created_at?: string
          id?: number
          order_id?: string
          package_name: string
          product_id: string
          purchase_payload?: string
          purchase_state: string
          purchase_token: string
          reason?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          awarded_coins?: number
          claim_status?: string
          created_at?: string
          id?: number
          order_id?: string
          package_name?: string
          product_id?: string
          purchase_payload?: string
          purchase_state?: string
          purchase_token?: string
          reason?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "coin_purchase_claims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      daily_quest_progress: {
        Row: {
          created_at: string
          quest_local_date: string
          quiz_cleared: boolean
          reward_claimed: boolean
          reward_exp: number
          story_cleared: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          quest_local_date: string
          quiz_cleared?: boolean
          reward_claimed?: boolean
          reward_exp?: number
          story_cleared?: boolean
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          quest_local_date?: string
          quiz_cleared?: boolean
          reward_claimed?: boolean
          reward_exp?: number
          story_cleared?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "daily_quest_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      level_node_completions: {
        Row: {
          created_at: string
          map_id: string
          node_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          map_id: string
          node_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          map_id?: string
          node_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "level_node_completions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          coins: number
          created_at: string
          equipped_character_id: string
          exp: number
          exp_max: number
          id: string
          level: number
          updated_at: string
          username: string
        }
        Insert: {
          avatar_url?: string | null
          coins?: number
          created_at?: string
          equipped_character_id?: string
          exp?: number
          exp_max?: number
          id: string
          level?: number
          updated_at?: string
          username: string
        }
        Update: {
          avatar_url?: string | null
          coins?: number
          created_at?: string
          equipped_character_id?: string
          exp?: number
          exp_max?: number
          id?: string
          level?: number
          updated_at?: string
          username?: string
        }
        Relationships: []
      }
      quiz_first_pass_claims: {
        Row: {
          correct_count: number
          created_at: string
          exp_reward: number
          is_perfect: boolean
          sub_chapter_level: number
          topic: string
          total_count: number
          user_id: string
        }
        Insert: {
          correct_count: number
          created_at?: string
          exp_reward: number
          is_perfect: boolean
          sub_chapter_level: number
          topic: string
          total_count: number
          user_id: string
        }
        Update: {
          correct_count?: number
          created_at?: string
          exp_reward?: number
          is_perfect?: boolean
          sub_chapter_level?: number
          topic?: string
          total_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_first_pass_claims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_repeat_perfect_claims: {
        Row: {
          claim_local_date: string
          created_at: string
          exp_reward: number
          sub_chapter_level: number
          topic: string
          user_id: string
        }
        Insert: {
          claim_local_date: string
          created_at?: string
          exp_reward: number
          sub_chapter_level: number
          topic: string
          user_id: string
        }
        Update: {
          claim_local_date?: string
          created_at?: string
          exp_reward?: number
          sub_chapter_level?: number
          topic?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_repeat_perfect_claims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_tree_badge_unlocks: {
        Row: {
          badge_id: string
          created_at: string
          source_sub_chapter_level: number
          source_topic: string
          tree_id: string
          user_id: string
        }
        Insert: {
          badge_id: string
          created_at?: string
          source_sub_chapter_level: number
          source_topic: string
          tree_id: string
          user_id: string
        }
        Update: {
          badge_id?: string
          created_at?: string
          source_sub_chapter_level?: number
          source_topic?: string
          tree_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_tree_badge_unlocks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      story_reward_claims: {
        Row: {
          created_at: string
          exp_reward: number
          sub_chapter_level: number
          topic: string
          user_id: string
        }
        Insert: {
          created_at?: string
          exp_reward: number
          sub_chapter_level: number
          topic: string
          user_id: string
        }
        Update: {
          created_at?: string
          exp_reward?: number
          sub_chapter_level?: number
          topic?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_reward_claims_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      claim_android_coin_purchase: {
        Args: {
          p_order_id: string
          p_package_name: string
          p_product_id: string
          p_purchase_payload?: string
          p_purchase_state: string
          p_purchase_token: string
          p_user_id: string
        }
        Returns: {
          awarded_coins: number
          coins: number
          exp: number
          exp_max: number
          level: number
          reason: string
          status: string
        }[]
      }
      claim_boss_completion_reward: {
        Args: {
          p_fight_id: string
          p_is_perfect: boolean
          p_is_victory: boolean
        }
        Returns: {
          awarded: boolean
          coins: number
          exp: number
          exp_max: number
          level: number
          reason: string
          repeat_claims_today: number
          repeat_daily_cap: number
          reward_coins: number
          reward_exp: number
        }[]
      }
      claim_daily_quest_reward: {
        Args: never
        Returns: {
          awarded: boolean
          coins: number
          exp: number
          exp_max: number
          level: number
          quest_local_date: string
          quiz_cleared: boolean
          reason: string
          reward_claimed: boolean
          reward_exp: number
          story_cleared: boolean
        }[]
      }
      claim_quiz_completion_reward: {
        Args: {
          p_correct_count: number
          p_sub_chapter_level: number
          p_topic: string
          p_total_count: number
        }
        Returns: {
          awarded: boolean
          badge_awarded: boolean
          badge_id: string
          coins: number
          exp: number
          exp_max: number
          level: number
          reason: string
          repeat_claims_today: number
          repeat_daily_cap: number
          reward_exp: number
        }[]
      }
      claim_story_first_completion_reward: {
        Args: {
          p_exp_reward: number
          p_sub_chapter_level: number
          p_topic: string
        }
        Returns: {
          awarded: boolean
          coins: number
          exp: number
          exp_max: number
          level: number
        }[]
      }
      get_daily_quest_status: {
        Args: never
        Returns: {
          quest_local_date: string
          quiz_cleared: boolean
          reward_claimed: boolean
          story_cleared: boolean
        }[]
      }
      get_leaderboard: {
        Args: { p_limit?: number }
        Returns: {
          avatar_url: string
          level: number
          rank: number
          username: string
        }[]
      }
      mark_daily_quest_quiz_clear: {
        Args: never
        Returns: {
          quest_local_date: string
          quiz_cleared: boolean
          reward_claimed: boolean
          story_cleared: boolean
        }[]
      }
      mark_daily_quest_story_clear: {
        Args: never
        Returns: {
          quest_local_date: string
          quiz_cleared: boolean
          reward_claimed: boolean
          story_cleared: boolean
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
