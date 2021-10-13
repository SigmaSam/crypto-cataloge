/* eslint-disable jsx-a11y/anchor-is-valid, jsx-a11y/control-has-associated-label, jsx-a11y/anchor-has-content, max-len */

import React from 'react';
import { PropTypes } from 'prop-types';

const Paginator = ({
  handlePaginator,
  page,
}) => (
  <div>
    <a
      role="button"
      href="#"
      onClick={() => handlePaginator('PREV')}
    />
    <p>
      {`Page ${page}/40`}
    </p>
    <a
      role="button"
      href="#"
      onClick={() => handlePaginator('NEXT')}
    />
  </div>
);

Paginator.propTypes = {
  handlePaginator: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default Paginator;
