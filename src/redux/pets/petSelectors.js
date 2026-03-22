export const selectPets = (state) => state.pets.pets;
export const selectPet = (state) => state.pets.pet;
export const selectPetLoading = (state) => state.pets.loading;
export const selectPetError = (state) => state.pets.error;
export const selectPagination = (state) => ({
  totalPages: state.pets.totalPages,
  currentPage: state.pets.currentPage,
});
