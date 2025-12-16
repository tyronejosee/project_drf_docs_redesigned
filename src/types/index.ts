export type Document = {
  title: string;
  path: string;
};

export type Tutorial = Document;
export type ApiGuide = Document;
export type Topic = Document;
export type Community = Document;

export type DocumentType = Tutorial | ApiGuide | Topic | Community;
export type CategoryType = "tutorial" | "api-guide" | "topics" | "community";

export type CategoryList = {
  type: CategoryType;
  pathPrefix: string;
  items: DocumentType[];
  next?: CategoryType;
  prev?: CategoryType;
}

export type Heading = {
  id: string;
  text: string;
  depth: number;
};

export type MDXLink = {
  title: string;
  path: string;
};
