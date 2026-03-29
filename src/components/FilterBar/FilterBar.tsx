// Library
import clsx from "clsx";

// Types
import type { Filter } from "../../types";

// Styles
import styles from "./FilterBar.module.scss";

const FILTERS: Filter[] = ["all", "active", "completed"];

type FilterBarProps = {
  activeFilter: Filter;
  onFilterSelect(filter: Filter): void;
};

function FilterBar({ activeFilter, onFilterSelect }: FilterBarProps) {
  return (
    <nav className={styles.filters} aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          className={clsx(
            styles.button,
            activeFilter === filter && styles.active,
          )}
          onClick={() => onFilterSelect(filter)}
          aria-pressed={activeFilter === filter}
        >
          {filter}
        </button>
      ))}
    </nav>
  );
}

export default FilterBar;
