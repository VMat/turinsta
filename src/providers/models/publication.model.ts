export interface AppState {
  publications: any,
  active: string,
  resumeTo: {publicationId: string, experience: {open: boolean,experienceId: string}, comment: {open: boolean, commentId: string}},
  pending: boolean,
  error: string
}
