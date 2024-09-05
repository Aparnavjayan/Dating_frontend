import React, { useState, useEffect } from 'react';
import styles from './filters.module.css';

const Filters = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('nearby');

  useEffect(() => {
    onFilterChange(activeFilter);
  }, [activeFilter]);

  return (
    <section className={`d-flex justify-content-around ${styles.filters}`}>
      <div
        className={activeFilter === 'nearby' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('nearby')}
      >
        Nearby
      </div>
      <div
        className={activeFilter === 'education' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('education')}
      >
        Education
      </div>
      <div
        className={activeFilter === 'qualification' ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveFilter('qualification')}
      >
        Qualification
      </div>
    </section>
  );
};

export default Filters;
