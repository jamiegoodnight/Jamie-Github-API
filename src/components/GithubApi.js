import React from 'react';
import axios from 'axios';
import { Input, Icon, Button } from 'semantic-ui-react';

import Pulls from './Pulls';
import '../styles/GithubApi.css';

class GithubApi extends React.Component {
  state = {
    obj: {},
    username: '',
    reponame: '',
    pulls: [],
    test: { works: true },
  };

  handleChanges = (e) => {
    e.preventDefault();
    console.log(this.state.username);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://api.github.com/repos/${this.state.username}/${this.state.reponame}/pulls?state=all`
      )
      .then((res) => {
        console.log(res.data);
        const mutantData = res.data.map((pull) => {
          pull = {
            user: pull.user.login,
            title: pull.title,
            body: pull.body,
            state: pull.state,
            url: pull.url,
            number: pull.number,
          };
          return pull;
        });
        this.setState({
          ...this.state,
          pulls: mutantData,
        });
      })
      .then(() => {
        this.state.pulls.map((pull) => {
          console.log('THESE ARE PULLS=======>', this.state.pulls);
          console.log('PULLS AT 0', this.state.pulls[0].id);
          console.log('MAP PULL', pull.id);
          return axios
            .get(
              `https://api.github.com/repos/${this.state.username}/${this.state.reponame}/pulls/${pull.number}/comments`
            )
            .then((res) => {
              console.log('COMMENTS DATA', res.data);
              pull.reviewerComments = res.data;
            })
            .then(() => {
              return axios
                .get(
                  `https://api.github.com/repos/${this.state.username}/${this.state.reponame}/pulls/${pull.number}/commits`
                )
                .then((res) => {
                  const commits = res.data.map((com) => {
                    com = {
                      committer: com.commit.committer.name,
                      date: com.commit.committer.date,
                      message: com.commit.message,
                    };
                    return com;
                  });
                  pull.commits = commits;
                  console.log('COMMITS', pull.commits);
                  console.log('COMMITS BY SELVES', commits);
                  console.log('DATA', res.data);
                });
            })
            .then(() => {
              this.setState({
                ...this.state,
                test: {},
              });
              console.log('MUTANT PULLS', this.state.pulls);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleDownload = async () => {
    const test = this.state.pulls;
    const fileName = 'reviews';
    const json = JSON.stringify(test);
    const blob = new Blob([json], { type: 'application/json' });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + '.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    return (
      <div className='app-wrapper'>
        <div className='github'></div>
        <div className='input-wrapper'>
          <Input
            icon={<Icon name='user' circular link />}
            className='input'
            type='text'
            placeholder='Username'
            name='username'
            value={this.state.username}
            onChange={this.handleChanges}
            required
          />
          <Input
            icon={<Icon name='code branch' circular link />}
            className='input'
            type='text'
            placeholder='Repository'
            name='reponame'
            value={this.state.reponame}
            onChange={this.handleChanges}
            required
          />
        </div>
        <div className='btn'>
          <Button primary onClick={this.handleSubmit}>
            Submit
          </Button>
          <Button secondary onClick={this.handleDownload}>
            Download
          </Button>
        </div>
        {this.state.pulls.length > 0 && this.state.pulls[0].reviewerComments ? (
          <div>
            {this.state.pulls.map((pull, i) => (
              <Pulls pull={pull} key={i} />
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default GithubApi;
