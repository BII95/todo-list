export default function SortBy({sortBy,sortDirection,onSortByChange,onSortDirectionChange}){
    return(<>
        <label htmlFor="Sort by">Sort by:</label>
            <select name="sortOptions" 
                    id="sortOptions"
                    value={sortBy}
                    onChange={(e) => onSortByChange(e.target.value)}>
            <option value="createdAt">Created At</option>
            <option value="title">Title</option>
            </select>

         <label htmlFor="Order">Order:</label>
            <select name="orderOptions" 
                    id="orderOptions"
                    value={sortDirection}
                    onChange={(e) => onSortDirectionChange(e.target.value)}>
            <option value= "desc">Descending</option>
            <option value= "asc">Ascending</option>
            </select>
    </>
    )
}