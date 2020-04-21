import React, { useState } from 'react'

function Searchbar() {

    const [search, searchInput] = useState('');
    return (
        <div>
            {search}
            <input onChange={e => searchInput(e.target.value)} />
        </div>
    )
}

export default Searchbar
