import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import axios from "axios";

class CommentBox extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            comments: [],
            data: [],
        };

        this.__loadComments = this.__loadComments.bind(this);
        this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    componentDidMount() {

        this.__loadComments();
        
    }
    
    __loadComments(){
        this.setState({comments: []});
        
        axios.get(`http://localhost:3001/api/pets/${this.props.pet_id}/comments`)
        .then(response => {
            console.log(response)
            const thisPet = response.data.filter(pet => pet.pet_id === this.props.pet_id)
            console.log(thisPet)
          this.setState({
            comments: thisPet
          });
        })
        .catch(error => console.log(error));
    }

    handleDelete(index) {
        let comments = this.state.comments;
        console.log(comments)
        console.log(index)
        comments.splice(index, 1);
        this.setState({
            comments: comments
          });
    // axios
    //     .put(`http://localhost:3001/api/pets/${this.props.pet_id}/comments`,
    //     {
    //         comments: this.state.comments,
    //         data: this.state.data,

    //     })
    //     .then(response => {
    //         this.setState({
    //             comments: response.data.comments
    //           });
    //     })
    //     .catch(err => {
    //       console.log('report pet error: ', err);
    //     });
    }

    _handleCommentSubmit(data) {
        axios.post(`http://localhost:3001/api/pets/${this.props.pet_id}/comments`, 
        data, {headers: {
            "Content-Type": "application/json"}}).then( (response) => {
                console.log('response:', response)
                let newCommentState = this.state.comments;
                newCommentState.unshift(response.data);
                this.setState({
                    comments: newCommentState 
                });
                
            }).catch(function (error) {
                console.log(error);
            });
    }
    
    render() {
        return (
            
            <div className='commentBox'>
                <CommentForm onCommentSubmit={this._handleCommentSubmit} current_user={this.props.current_user} ></CommentForm>
                <CommentList comments={this.state.comments} users={this.props.users} data={this.state.data} handleDelete={this.handleDelete}></CommentList>
            </div>
        )
    }
};


export default CommentBox;