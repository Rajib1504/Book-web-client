export interface Book {
  _id: string;
  title: string;
  author: string;
  coverImage: string;
}

export interface PaginatedBooksResponse {
  books: Book[];
  totalPages: number;
  currentPage: number;
}
