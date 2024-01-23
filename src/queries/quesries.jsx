

import { addDoc, collection, deleteDoc, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { db } from '../config/firebase';

export const getMovies = async (colName) => {
  console.log("1")
  try {
    const querySnapshot = await getDocs(collection(db, colName));
    const movieData = querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));
    return movieData;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error; 
};
};

export const getRandomMovie = async () => {
  console.log("2")
    try {
      const querySnapshot = await getDocs(collection(db, 'movies'));
      const movieData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      }));
      
      const randomIndex = Math.floor(Math.random() * movieData.length);
      return movieData[randomIndex];
    } catch (error) {
      console.error('Error fetching random movie:', error);
      throw error; 
    }
  };

  export const addMovieToFavorites = async (movieId, movieData) => {
    console.log("3")
    const docRef = doc(collection(db, 'favorites'));
    await setDoc(docRef, { movieId, ...movieData });
  };
  
  export const removeMovieFromFavorites = async (movieId) => {
    console.log("4")
    const querySnapshot = await getDocs(query(collection(db, 'favorites'), where('movieId', '==', movieId)));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
  };
  