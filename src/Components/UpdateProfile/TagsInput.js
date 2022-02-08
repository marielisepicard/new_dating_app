import React, { useState, useEffect } from "react";
import "./TagsInput.css";

const InputTag = ({ initialTags, updateTags }) => {
  const [tags, setTags] = useState([]);
  const [comaInTag, setComaInTag] = useState(false);
  let tagInput;

  const removeTag = (i) => {
    const newTags = [...tags];
    newTags.splice(i, 1);
    setTags(newTags);
    updateTags(newTags);
  };

  const inputKeyDown = (e) => {
    const val = e.target.value;
    if (e.key === "Enter" && val) {
      if (val.includes(",")) {
        // writing a "," must be forbidden
        setComaInTag(true);
        return;
      }
      // if (tags.find((tag) => tag.toLowerCase() === val.toLowerCase())) {
      //   return;
      // }
      setComaInTag(false);
      setTags([...tags, val]);
      updateTags([...tags, val]);
      tagInput.value = null;
    } else if (e.key === "Backspace" && !val) {
      removeTag(tags.length - 1);
    }
  };

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  return (
    <>
      <div className="input-tag">
        {tags && (
          <ul className="input-tag__tags">
            {tags.map((tag, i) => (
              <li key={tag + i.toString()}>
                {tag}
                <button
                  type="button"
                  onClick={() => {
                    removeTag(i);
                  }}
                >
                  +
                </button>
              </li>
            ))}
            <li className="input-tag__tags__input">
              <input
                type="text"
                onKeyDown={inputKeyDown}
                ref={(c) => {
                  tagInput = c;
                }}
              />
            </li>
          </ul>
        )}
      </div>
      {comaInTag === true && (
        <span className="error-in-tag">
          Sorry, you can't write a comma in a tag, erase and write something
          else :)
        </span>
      )}
    </>
  );
};

export default InputTag;
