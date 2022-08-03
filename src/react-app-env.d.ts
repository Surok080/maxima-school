/// <reference types="react-scripts" />

interface UsePaginationProps {
  contentPerPage: number,
  count: number,
}

interface UsePaginationReturn {
  page: number;
  totalPages: number;
  firstContentIndex: number;
  lastContentIndex: number;
  nextPage: () => void;
  prevPage: () => void;
  setPage: (page: number) => void;
  gaps: { before: boolean; paginationGroup: number[]; after: boolean };
}

interface CofeDataProps {
  cofe: any,
}

interface CofeDataReturn {
  id: number;
  uid: string;
  blend_name: string;
  origin: string;
  variety: string;
  notes: string;
  intensifier: string;
}


type UsePagination = (UsePaginationProps) => (UsePaginationReturn);

