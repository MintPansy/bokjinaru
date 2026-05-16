export type DataSource = "api" | "mock";

export type WithSource<T> = {
  data: T;
  source: DataSource;
};
