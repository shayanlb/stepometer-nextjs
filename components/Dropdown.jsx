const Dropdown = () => {
  const handleFilterChange = (e) => {
    setFilterOption(e.target.value);
  };

  return (
    <div>
      <label htmlFor="filter">Filter By:</label>
      <select id="filter" onChange={handleFilterChange} value={filterOption}>
        <option value="all">All</option>
        <option value="days">Days</option>
        <option value="months">Months</option>
      </select>
    </div>
  );
};
