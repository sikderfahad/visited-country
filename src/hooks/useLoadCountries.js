import { useEffect, useState } from "react";

const useLoadCountries = () => {
  const [countries, setCountries] = useState([]);
  const [visibleCountries, setVisibleCountries] = useState([]);
  const itemsPerPage = 12; // Number of countries to load per batch
  const [loadedCount, setLoadedCount] = useState(0); // Tracks how many items are loaded

  // Fetch country data from API
  useEffect(() => {
    const fetchCountries = async () => {
      const url = `https://restcountries.com/v3.1/all`;
      const res = await fetch(url);
      const data = await res.json();
      setCountries(data);
      setVisibleCountries(data.slice(0, itemsPerPage));
      setLoadedCount(itemsPerPage); // Initialize loadedCount
    };
    fetchCountries();
  }, []);

  // Load more countries when reaching the bottom
  const loadMoreData = () => {
    const newVisibleCount = loadedCount + itemsPerPage;
    setVisibleCountries(countries.slice(0, newVisibleCount));
    setLoadedCount(newVisibleCount);
  };

  // Scroll event listener
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= scrollHeight - 100) {
      loadMoreData();
    }
  };

  // Attach and cleanup scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loadedCount, countries]); // Re-attach listener if loadedCount or countries change

  return { countries, visibleCountries };
};
export default useLoadCountries;
