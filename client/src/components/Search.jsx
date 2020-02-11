import React, { useState } from 'react';
import { Input } from 'reactstrap';

const Search = ({ search }) => {
  const [searchTask, setSearchTask] = useState('');

  const handleSearch = (e) => {
    setSearchTask(e.target.value);
    search(e.target.value);
  };
  return (
    <div className="mt-2">
      <Input
        type="text"
        name="search"
        value={searchTask}
        onChange={handleSearch}
        id="search"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
