import './index.css'; 


const CategoryItem = props => {
  const {tagDetails, onClickTagItem, isActive} = props; 

  const {optionId, displayText} = tagDetails; 
  const onClickTagButton = () => onClickTagItem(optionId); // Function to handle tag button click

 
  return (
    <li>
      <button
        type="button"
        className={`tag_button_element ${isActive ? 'active' : ''}`} // Conditionally apply 'active' class based on isActive prop
        onClick={onClickTagButton} // Handle click event on tag button
      >
        {displayText} {/* Display tag text */}
      </button>
    </li>
  );
};

export default CategoryItem; 
