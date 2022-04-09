import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useStyletron } from 'baseui';
import { TableBuilder, TableBuilderColumn } from 'baseui/table-semantic';
import ProduceDetail from './ProduceDetail';
import { fetchAllProduces } from '../../../actions/produce';
import { clearData } from '../../../actions/data';
import { UPDATED_PRODUCE, DELETED_PRODUCE } from '../../../utils/constants';

const ProduceList = ({ produces, data, fetchAllProduces, clearData }) => {
  const [css, theme] = useStyletron();
  const [selectedProduce, setSelectedProduce] = useState({});

  useEffect(() => {
    if(data.success) {
      if(data.action == UPDATED_PRODUCE) alert('Sucessfully updated Produce');
      if(data.action == DELETED_PRODUCE) alert('Sucessfully deleted Produce');
      clearData();
      fetchAllProduces();
      setSelectedProduce({});
    }
  }, [data]);

  return (
    Object.keys(selectedProduce).length === 0 ?
      <TableBuilder 
        data={produces}
        overrides={{
          Root: {
            style: ({ $theme }) => ({
              width: '100%'
            })
          }
        }}
      >
        <TableBuilderColumn header="Name">
          {row => (
            <p>{row.name}</p>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Type">
          {row => (
            <p>{row.type}</p>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Shelf Life">
          {row => (
            <p>{row.shelf_life} days</p>
          )}
        </TableBuilderColumn>
        <TableBuilderColumn header="Image">
          {(row, i) => (
            <img 
              src={row.image_url} 
              className={css({ maxWidth: '75px', float: 'right', height: 'auto%' })} 
              onClick={() => {
                setSelectedProduce(produces[i])
              }}
            />
          )}
        </TableBuilderColumn>
      </TableBuilder>
    :
      <ProduceDetail produce={selectedProduce} />
  );
}

const ConnectedProduceList = connect(
  (state) => {
    return {
      data: state.data
    }
  }, {
    fetchAllProduces,
    clearData
  }
)(ProduceList);

export default ConnectedProduceList;