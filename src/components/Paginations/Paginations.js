import React from 'react'
import PropTypes from 'prop-types'

import './paginations.css'

const renderPaginationBtns = (onClick, page, lastPage) => {
  const startBtns = [page, page + 1, page + 2]
  const gapBtns = [1, '...', page - 2, page - 1, page, page + 1, page + 2]
  const middleBtn = ['...']
  const lastBtns = [lastPage - 1]

  let btnsArr = []

  if (page < lastPage - 6 && page <= 4) {
    btnsArr = [...startBtns, ...middleBtn, ...lastBtns]
  } else if (page < lastPage - 4) {
    btnsArr = [...gapBtns, ...middleBtn, ...lastBtns]
  } else if (page < lastPage - 3) {
    btnsArr = [...gapBtns, ...lastBtns]
  } else {
    btnsArr = [...middleBtn, ...lastBtns]
  }

  return btnsArr.map(num => {
    return num === '...' ? (
      num
    ) : (
      <button
        key={num}
        onClick={onClick}
        data-name={num}
        className={num === page ? 'active' : ''}
      >
        {num >= 0 ? num : 0}
      </button>
    )
  })
}

const Paginations = ({ onClick, page, lastPage }) => (
  <div className='paginationWrapper'>
    {page !== 0 && (
      <button onClick={onClick} data-name='prev'>
        {'<<'}
      </button>
    )}
    {renderPaginationBtns(onClick, page, lastPage)}
    {page !== lastPage - 1 && lastPage >= 0 && (
      <button onClick={onClick} data-name='next'>
        {'>>'}
      </button>
    )}
  </div>
)

Paginations.propTypes = {
  onClick: PropTypes.func,
  page: PropTypes.number,
  lastPage: PropTypes.number
}

Paginations.defaultProps = {
  onClick: () => {},
  page: 0,
  lastPage: 0
}

export default Paginations
