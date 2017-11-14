export interface AppState {
  publications: any,
  active: String,
  resumeTo: {publicationId: String, experience: {open: Boolean,experienceId: String}, comment: {open: Boolean, commentId: String}},
  pending: Boolean,
  error: String
}
