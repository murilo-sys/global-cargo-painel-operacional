// Response interface from services/api/esl-report requestArchive()
export interface RequestArchive {
  show_url: string;
  status: string;
}

export interface StatusArchive extends RequestArchive {
  download_url: string;
}
