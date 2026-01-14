export interface Book {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
}

export interface PaginatedBooksResponse {
  status: boolean;
  message: string;
  data: {
    items: Book[];
    total: number;
    perPage: number;
    currentPage: number;
  };
}
