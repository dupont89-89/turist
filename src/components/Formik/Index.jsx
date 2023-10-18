import React, { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";
import Page from "./Page";



function FileDragAndDropField({
  margin,
  placeholder,
  accept,
  className,
  form,
  field
}) {
  const input = useRef();
  const [url, setUrl] = useState("");

  useEffect(() => {
    try {
      if (field.value && new URL(field.value)) {
        setUrl(field.value);
      }
    } catch (error) {}
  }, [field.value]);

  function loadFile(file) {
    const reader = new FileReader();
    reader.onload = () => {
      setUrl(reader.result);
      form.setFieldValue(field.name, file);
      input.current.value = "";
    };
    reader.readAsDataURL(file);
  }

  function removeDragData(event) {
    if (event.dataTransfer.items) {
      event.dataTransfer.items.clear();
      return;
    }
    event.dataTransfer.clearData();
  }

  function handleChange(event) {
    event.persist();
    if (event.target.files.length > 0) {
      loadFile(event.target.files[0]);
    }
  }

  function handleOnDrop(event) {
    event.persist();
    event.preventDefault();

    if (event.dataTransfer.items) {
      for (let item of event.dataTransfer.items) {
        if (item.kind === "file") {
          loadFile(item.getAsFile());
        }
      }
    } else if (event.dataTransfer.files.length > 0) {
      loadFile(event.dataTransfer.files[0]);
    }

    removeDragData(event);
  }

  function handleOnDragOver(event) {
    event.persist();
    event.preventDefault();
  }

  function handleDeleteValue() {
    setUrl(null);
    form.setFieldValue(field.name, null);
  }

  return (
    <Page
      name={field.name}
      url={url}
      placeholder={placeholder}
      accept={accept}
      className={className}
      margin={margin}
      inputRef={input}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDeleteValue={handleDeleteValue}
      onChangeInput={handleChange}
    />
  );
}

FileDragAndDropField.propTypes = {
  margin: PropTypes.string,
  placeholder: PropTypes.string,
  accept: PropTypes.string,
  className: PropTypes.string,
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired
};

export default FileDragAndDropField;
