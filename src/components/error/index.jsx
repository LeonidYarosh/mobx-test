import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import './style.css'

export const Error = observer(({ store, children }) =>
  store.error.addDev ? <div className="error">Введите имя и SP</div> : children
)

Error.propTypes = {
  store: PropTypes.shape({
    error: PropTypes.shape({
      addDev: PropTypes.boolean,
    })
  }),
  children: PropTypes.node,
}
