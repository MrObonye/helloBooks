import React from 'react';
import PropTypes from 'prop-types';

import Categories from '../common/Categories';
import Loading from '../common/Loading';
import requestImageUrl from '../../utils/requestImageUrl';
/**
 * for for adding or editing books
 * @param {object} props
 * @returns {JSX} JSX representation of component
 */
const BookForm = (props) => {
  const categories = props.categories ?
    <Categories
      text='Select Book Category'
      categories={props.categories}
      onChange={props.onSelectCategory}
    /> : null;
  return (
    <div>
      <h5>{props.heading}</h5>
      <form id="book-form"
        onSubmit={props.onSubmit}
        method="post"
        encType="multipart/form-data"
      >
        <div className="input-field">
          <input
            id="title"
            type="text"
            name="title"
            value={props.book.title}
            placeholder="Book Title"
            onChange={event => props.onChange(event)}
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            name="authors"
            value={props.book.authors}
            placeholder="Authors (comma separated for multiple)"
            onChange={event => props.onChange(event)}
          />
        </div>
        <div className="input-field">
          <textarea name="description"
            value={props.book.description}
            rows="20"
            placeholder="Book Description"
            onChange={event => props.onChange(event)}
          />
        </div>
        {categories}
        <hr style={{ visibility: 'hidden' }}/>
        <div className="input-field">
          <input
            type="number"
            name="total"
            min="0"
            value={props.book && (props.book.total || 0)}
            placeholder="Number available"
            onChange={event => props.onChange(event)}
          />
        </div>
        <div className="">
          <div className="file-field input-field">
            <div className="btn">
              <span>Browse</span>
              <input
                type="file"
                name="cover"
                accept="image/jpeg image/x-png"
                onChange={event => props.onBookConverChange(event)}
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Upload Book Cover"
              />
            </div>
            <div>
              <span>
                <small className="green-text">
                  {props.imageUploading &&
                    <Loading text="uploading image . . ." />}
                </small>
              </span>
              {props.imageUploaded &&
                <span>
                  <small className="green-text">
                    book cover uploaded &nbsp;
                  </small>
                  <img
                    src={requestImageUrl(props.book.cover, { width: 100 })}
                    alt="image uploaded"
                  />
                </span>}
              {(!props.imageUploaded && !props.imageUploading) &&
                <img src={requestImageUrl(props.book.cover, { width: 100 })} />
              }
              <span className="red-text">
                <small>{props.imageError}</small>
              </span>
            </div>
          </div>
        </div>
        <div className="">
          <div className="file-field input-field">
            <div className="btn">
              <span>Browse</span>
              <input
                type="file"
                name="bookFile"
                accept="application/pdf"
                onChange={event => props.onBookFileChange(event)}
              />
            </div>
            <div className="file-path-wrapper">
              <input
                className="file-path validate"
                type="text"
                placeholder="Upload Book file"
              />
            </div>
            <div>
              <span>
                <small className="green-text">
                  {props.bookFileUploading &&
                    <Loading text="uploading book file . . ." />}
                </small>
              </span>
              {props.bookFileUploaded &&
                <span>
                  <small className="green-text">
                    book file uploaded &nbsp;
                  </small>
                  <img
                    src={requestImageUrl(`${props
                      .book.bookFile.slice(0, -3)}jpg`,
                    { width: 100, fill: true })}
                    alt="File uploaded"
                  />
                </span>}
              <span className="red-text">
                <small>{props.bookFileError}</small>
              </span>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '10px' }}>
          <input
            id="submit-book-form-btn"
            type="submit"
            className="btn center"
            onClick={props.onSubmit}
          />
        </div>
      </form>
    </div>
  );
};

BookForm.propTypes = {
  categories: PropTypes.array,
  heading: PropTypes.string,
  book: PropTypes.object,
  onSelectCategory: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBookConverChange: PropTypes.func.isRequired,
  imageUploading: PropTypes.bool,
  imageUploaded: PropTypes.bool,
  imageError: PropTypes.string,
  bookFileUploading: PropTypes.bool,
  bookFileUploaded: PropTypes.bool,
  onBookFileChange: PropTypes.func.isRequired,
  bookFileError: PropTypes.string,
};

export default BookForm;
