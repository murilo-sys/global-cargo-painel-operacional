//------------------------------REQUEST BODY----------------------------------//

// Freights request body
export interface FreightsRequestBody {
  search: {
    freights: { updated_at: string };
    scopes?: { by_updated_at?: string };
    fit_freight_location?: { current_location_id?: number };
  };
}

// Manifest request body
export interface ManifestsRequestBody {
  search: {
    manifests: {
      updated_at: string;
    };
  };
}

// Pickups request body
export interface PickupsRequestBody {
  search: {
    picks: { request_date: string };
  };
}

// Request body Union
export type RequestBody = FreightsRequestBody | ManifestsRequestBody | PickupsRequestBody;

//-----------------------------------------------------------------------------------------//

// Generic type
export interface ReportConfig<TBody = RequestBody> {
  url: string;
  body: TBody;
  process: (json: unknown) => void;
}

// Map of reports
export interface ReportConfigOptions {
  freights: ReportConfig<FreightsRequestBody>;
  manifests: ReportConfig<ManifestsRequestBody>;
  pickups: ReportConfig<PickupsRequestBody>;
}

// Type from key of ReportConfigOptions
export type ReportsType = keyof ReportConfigOptions;
