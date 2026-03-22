import { useDispatch, useSelector } from 'react-redux';
import { selectPets, selectPetLoading } from '../redux/pets/petSelectors';
import { fetchPetsRequest } from '../redux/pets/petSlice';

const usePets = () => {
  const dispatch = useDispatch();
  const pets = useSelector(selectPets);
  const loading = useSelector(selectPetLoading);

  const fetchPets = (params) => dispatch(fetchPetsRequest(params));

  return { pets, loading, fetchPets };
};

export default usePets;
