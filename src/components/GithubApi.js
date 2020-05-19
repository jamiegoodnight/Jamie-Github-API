import React from 'react';
import axios from 'axios';
import {Input, Icon, Button} from 'semantic-ui-react'

import Pulls from './Pulls'
import '../styles/GithubApi.css'

class GithubApi extends React.Component {
    state={
        obj: {},
        username: "",
        reponame: "",
        pulls: [],
        test: {works: true}
    }

    handleChanges = e => {
        e.preventDefault();
        console.log(this.state.username)
        this.setState({
          [e.target.name]: e.target.value
        });
      };

    handleSubmit = e => {
        e.preventDefault()
        axios
          .get(`https://api.github.com/repos/${this.state.username}/${this.state.reponame}/pulls?state=all`)
          .then(res => {
            console.log(res.data)
            const mutantData= res.data.map(pull => {
              pull = {
                user: pull.user.login,
                title: pull.title,
                body: pull.body,
                state: pull.state,
                url: pull.url,
                number: pull.number
              }
              return pull
            })
            this.setState({
              ...this.state,
              pulls: mutantData
            })
          })
          .then(() => {
              this.state.pulls.map(pull => {
              console.log("THESE ARE PULLS=======>", this.state.pulls)
              console.log("PULLS AT 0", this.state.pulls[0].id)
              console.log("MAP PULL", pull.id)
              return axios
              .get(`https://api.github.com/repos/${this.state.username}/${this.state.reponame}/pulls/${pull.number}/comments`)
              .then(res => {
                console.log("COMMENTS DATA", res.data) 
                pull.reviewerComments=res.data
              })
              .then(() => {
                console.log("MUTANT PULLS", this.state.pulls)
              })
            })
          })
          // .then(() => {
          //     this.state.pulls.map(pull => {
          //       return axios
          //       .get(`https://api.github.com/repos/${this.state.username}/${this.state.reponame}/pulls/${this.pull.number}/comments`)
          //     }
          // })
          .catch(err => {
              console.log(err)
          })
      }
  

    handleDownload = async () => {
        const test = this.state.test; // I am assuming that "this.state.myData"
                                     // is an object and I wrote it to file as
                                     // json
        const fileName = "reviews";
        const json = JSON.stringify(test);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

    render() {
        return (
            <div className="app-wrapper">
            <div className='github'></div>
            <div className="input-wrapper">
            <Input
              icon={<Icon name='user' circular link/>}
              className="input"
              type="text"
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.handleChanges}
              required
            />
            <Input
              icon={<Icon name='code branch' circular link/>}
              className="input"
              type="text"
              placeholder="Repository"
              name="reponame"
              value={this.state.reponame}
              onChange={this.handleChanges}
              required
            />
            </div>
            <div>
            <Button primary onClick={this.handleSubmit}>Submit</Button>
            <Button secondary onClick={this.handleDownload}>Download</Button>
            </div>
            <Pulls></Pulls>
            {/* {this.state.pulls.length===0 ? 
            <div> </div>
             :
             <div> 
               {this.state.pulls.map(pull => {
               return (
               <>
               <h1>{pull.title}</h1>
               <h3>{pull.user}</h3>
               <h3>{pull.body}</h3>
               <h3>{pull.state}</h3>
               </>
      
               )
               })}
             </div> } */}
            </div>
        )
    }
}

export default GithubApi