import React from 'react';
import {Divider, Header, Icon, Table} from 'semantic-ui-react'

const Pulls = (props) => {

  return (
    <div className="pulls-wrapper">
    <Divider horizontal>
      <Header as='h4'>
        <Icon name='edit' />
        Pull Request
      </Header>
    </Divider>

    <Table definition>
      <Table.Body>
        <Table.Row>
          <Table.Cell width={2}>Size</Table.Cell>
          <Table.Cell>1" x 2"</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Weight</Table.Cell>
          <Table.Cell>6 ounces</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Color</Table.Cell>
          <Table.Cell>Yellowish</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Odor</Table.Cell>
          <Table.Cell>Not Much Usually</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
    </div>
  );
}

export default Pulls;
