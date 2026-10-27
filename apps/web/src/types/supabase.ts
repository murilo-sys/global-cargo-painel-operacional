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
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      freights: {
        Row: {
          cte_number: number | null
          current_location: string | null
          destination_hub: string | null
          emission_type: string | null
          freight_type: string | null
          freight_weight: number
          id: number
          invoice_value: number
          is_disabled: boolean
          issuance_status: string | null
          last_synced_at: string
          minute_number: number | null
          modal: string | null
          origin_hub: string | null
          status: string | null
          updated_at: string | null
          volume_m3: number
          weight_kg: number
        }
        Insert: {
          cte_number?: number | null
          current_location?: string | null
          destination_hub?: string | null
          emission_type?: string | null
          freight_type?: string | null
          freight_weight?: number
          id: number
          invoice_value: number
          is_disabled?: boolean
          issuance_status?: string | null
          last_synced_at?: string
          minute_number?: number | null
          modal?: string | null
          origin_hub?: string | null
          status?: string | null
          updated_at?: string | null
          volume_m3: number
          weight_kg: number
        }
        Update: {
          cte_number?: number | null
          current_location?: string | null
          destination_hub?: string | null
          emission_type?: string | null
          freight_type?: string | null
          freight_weight?: number
          id?: number
          invoice_value?: number
          is_disabled?: boolean
          issuance_status?: string | null
          last_synced_at?: string
          minute_number?: number | null
          modal?: string | null
          origin_hub?: string | null
          status?: string | null
          updated_at?: string | null
          volume_m3?: number
          weight_kg?: number
        }
        Relationships: []
      }
      hubs: {
        Row: {
          code: string
          color: string
          is_active: boolean
          modal: string
          region: string
        }
        Insert: {
          code: string
          color?: string
          is_active?: boolean
          modal?: string
          region: string
        }
        Update: {
          code?: string
          color?: string
          is_active?: boolean
          modal?: string
          region?: string
        }
        Relationships: []
      }
      manifest_freights: {
        Row: {
          freight_id: number
          manifest_id: number
        }
        Insert: {
          freight_id: number
          manifest_id: number
        }
        Update: {
          freight_id?: number
          manifest_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_manifest_freights_freight"
            columns: ["freight_id"]
            isOneToOne: false
            referencedRelation: "freights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_manifest_freights_manifest"
            columns: ["manifest_id"]
            isOneToOne: false
            referencedRelation: "manifests"
            referencedColumns: ["id"]
          },
        ]
      }
      manifests: {
        Row: {
          code: number | null
          estimated_arrival: string | null
          id: number
          origin_hub: string | null
          status: string | null
          total_invoices_value: number | null
          total_m3: number | null
          total_weight_kg: number | null
          unloading_places: string[] | null
          vehicle_plate: string | null
        }
        Insert: {
          code?: number | null
          estimated_arrival?: string | null
          id: number
          origin_hub?: string | null
          status?: string | null
          total_invoices_value?: number | null
          total_m3?: number | null
          total_weight_kg?: number | null
          unloading_places?: string[] | null
          vehicle_plate?: string | null
        }
        Update: {
          code?: number | null
          estimated_arrival?: string | null
          id?: number
          origin_hub?: string | null
          status?: string | null
          total_invoices_value?: number | null
          total_m3?: number | null
          total_weight_kg?: number | null
          unloading_places?: string[] | null
          vehicle_plate?: string | null
        }
        Relationships: []
      }
      pickups: {
        Row: {
          code: number | null
          destination_hub: string | null
          filial: string | null
          id: number
          invoice_value: number | null
          request_date: string | null
          service_date: string | null
          status: string | null
          volume_m3: number | null
          weight_kg: number | null
        }
        Insert: {
          code?: number | null
          destination_hub?: string | null
          filial?: string | null
          id: number
          invoice_value?: number | null
          request_date?: string | null
          service_date?: string | null
          status?: string | null
          volume_m3?: number | null
          weight_kg?: number | null
        }
        Update: {
          code?: number | null
          destination_hub?: string | null
          filial?: string | null
          id?: number
          invoice_value?: number | null
          request_date?: string | null
          service_date?: string | null
          status?: string | null
          volume_m3?: number | null
          weight_kg?: number | null
        }
        Relationships: []
      }
      routes: {
        Row: {
          created_at: string
          created_by: string | null
          hubs: string[]
          id: string
          name: string
          vehicle_code: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          hubs: string[]
          id?: string
          name: string
          vehicle_code: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          hubs?: string[]
          id?: string
          name?: string
          vehicle_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "routes_vehicle_code_fkey"
            columns: ["vehicle_code"]
            isOneToOne: false
            referencedRelation: "vehicle_types"
            referencedColumns: ["name"]
          },
        ]
      }
      sync_history: {
        Row: {
          created_at: string
          error: string[] | null
          id: number
          status: string
        }
        Insert: {
          created_at?: string
          error?: string[] | null
          id?: number
          status: string
        }
        Update: {
          created_at?: string
          error?: string[] | null
          id?: number
          status?: string
        }
        Relationships: []
      }
      vehicle_types: {
        Row: {
          id: string
          is_active: boolean
          "max_volume_m³": number
          max_weight_kg: number
          name: string
        }
        Insert: {
          id?: string
          is_active?: boolean
          "max_volume_m³": number
          max_weight_kg: number
          name: string
        }
        Update: {
          id?: string
          is_active?: boolean
          "max_volume_m³"?: number
          max_weight_kg?: number
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fn_get_freights_metrics: { Args: { p_date: string }; Returns: Json }
      fn_get_manifests_metrics: { Args: never; Returns: Json }
      fn_get_pickups_metrics: { Args: { p_date: string }; Returns: Json }
      fn_get_routes: { Args: { p_date: string }; Returns: Json }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      hub_item_type: {
        code: string | null
        wareHouse:
          | Database["public"]["CompositeTypes"]["hub_values_type"]
          | null
      }
      hub_values_type: {
        m3: number | null
        realWeight: number | null
        invoiceValue: number | null
      }
      issuance_metrics_type: {
        pendings: number | null
        issued: number | null
        manifested: number | null
      }
      mocar_metrics_type: {
        m3: number | null
        realWeight: number | null
      }
      operational_metrics_type: {
        wareHouseHubs:
          | Database["public"]["CompositeTypes"]["hub_item_type"][]
          | null
        issuances:
          | Database["public"]["CompositeTypes"]["issuance_metrics_type"]
          | null
        mocar: Database["public"]["CompositeTypes"]["mocar_metrics_type"] | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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
