import { DELETE_ID } from "./actions"

export const addDeleteId = (id) => {
  return {
    type: DELETE_ID,
    id: id,
  }
}
