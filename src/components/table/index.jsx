import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Row } from './row'


export const Table = observer(({ store }) =>
  <table id="main-table">
    <thead>
      <tr>
        <td>Name:</td>
        <td>SP:</td>
      </tr>
    </thead>
    <tbody>
      {
        store.filteredDev.map((dev) => <Row key={dev.id} {...dev}/>)
      }
    </tbody>
    <tfoot>
      <tr>
        <td>Team SP:</td>
        <td>{store.totalSum}</td>
      </tr>
      <tr>
        <td>Top Performer:</td>
        <td>{store.topPerformer || '' }</td>
      </tr>
    </tfoot>
  </table>
)

Table.propTypes = {
  store: PropTypes.shape({
    filteredDev: PropTypes.array,
    totalSum: PropTypes.number,
    topPerformer: PropTypes.string,
  })
}

