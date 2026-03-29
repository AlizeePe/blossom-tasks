// Types
import type { Filter } from "../../types";

const FILTERS: Filter[] = ["all", "active", "completed"];

type FilterBarProps = {
  activeFilter: Filter;
  onFilterSelect(filter: Filter): void;
};

function FilterBar({ activeFilter, onFilterSelect }: FilterBarProps) {
  return (
    <nav aria-label="Filter tasks">
      {FILTERS.map((filter) => (
        <button
          key={filter}
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
