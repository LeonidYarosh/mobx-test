import React from 'react'
import PropTypes from 'prop-types'

export const Row = ({ name, sp }) =>
  <tr>
    <td>{name}</td>
    <td>{sp}</td>
  </tr>

Row.propTypes = {
  name: PropTypes.string,
  sp: PropTypes.number,
}
