import { useSelector } from 'react-redux';

export const useCollectionSelector = () =>
    useSelector((state) => state.collection);