import React from 'react';
import { Divider, Header, Icon, Table } from 'semantic-ui-react';

const Pulls = (props) => {
  console.log('PULLLLL', props.pull);
  return (
    <div className='pulls-wrapper'>
      <Divider horizontal>
        <Header as='h4'>
          <Icon name='edit' />
          Pull Request
        </Header>
      </Divider>

      <Table definition>
        <Table.Body>
          <Table.Row>
            <Table.Cell width={2}>Title</Table.Cell>
            <Table.Cell>{props.pull.title}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Requester</Table.Cell>
            <Table.Cell>{props.pull.user}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Request Comment</Table.Cell>
            <Table.Cell>{props.pull.body}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>State</Table.Cell>
            <Table.Cell>{props.pull.state}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <div>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='wrench' />
            Commits
          </Header>
        </Divider>
        <>
          {props.pull.commits ? (
            <>
              {props.pull.commits.map((com) => (
                <Table definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width={2}>Committer</Table.Cell>
                      <Table.Cell>{com.committer}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Message</Table.Cell>
                      <Table.Cell>{com.message}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Date</Table.Cell>
                      <Table.Cell>{com.date}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      </div>

      <div>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='comment' />
            Reviewer Comments
          </Header>
        </Divider>
        <>
          {props.pull.reviewerComments ? (
            <>
              {props.pull.reviewerComments.map((review) => (
                <Table definition>
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell width={2}>Reviewer</Table.Cell>
                      <Table.Cell>{review.user.login}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Review Comment</Table.Cell>
                      <Table.Cell>{review.body}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>Commit ID</Table.Cell>
                      <Table.Cell>{review.commit_id}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              ))}
            </>
          ) : (
            <></>
          )}
        </>
      </div>
    </div>
  );
};

export default Pulls;
