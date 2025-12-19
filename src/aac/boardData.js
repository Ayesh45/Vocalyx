export const initialBoards = {
  root: {
    title: "AAC Board",
    items: [
      { id: "family", label: "Family", nextBoard: "familyBoard" },
      { id: "food", label: "Food", nextBoard: "foodBoard" }
    ]
  },

  familyBoard: {
    title: "Family",
    items: []
  },

  foodBoard: {
    title: "Food",
    items: []
  }
};
