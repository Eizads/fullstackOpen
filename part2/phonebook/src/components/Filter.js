const Filter = ({ newSearch, handleNewSearch }) => (
  <div>
    Filter shown with <input value={newSearch} onChange={handleNewSearch} />
  </div>
);
export default Filter;
