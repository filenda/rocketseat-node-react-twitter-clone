import React, { Component } from 'react';
import api from '../services/api';
import socket from 'socket.io-client';

import twitterLogo from '../twitter.svg'
// this is enough for React to import and apply styles
import './Timeline.css';

import Tweet from '../components/Tweet';

export default class Timeline extends Component {

    // state é um objeto do javascript que pode ser usado dentro do componente, e sempre que uma propriedade
    // dentro dele é alterada, o componente é re-renderizado sozinho com a atualização
    state = {
        tweets: [],
        newTweet: ''
    };

    //  componentdidmount é o evento que dispara quando o componente em questão é renderizado
    //  parecido com o document ready
    async componentDidMount() {
        this.subscribeToEvents();
        const response = await api.get('tweets');
        
        this.setState({ tweets: response.data });
    }

    subscribeToEvents = () => {
        const io = socket('http://localhost:3002');

        io.on('tweet', data => {
            // you should not push itens to the array not to break immutability rule and
            // create a new array with the new itens instead

            // "..." is the spread operator. Here it grabs all tweets that were already in the timeline
            this.setState({ tweets: [data, ...this.state.tweets] });
        })
        io.on('like', data => {
            // run through all the tweets to until the one with the matching id is found
            this.setState({ tweets: this.state.tweets.map(tweet =>
                tweet._id === data._id ? data : tweet           
              ) })
        });
    };

    // every function you create that is not default to react should adopt the arrow (=>) function model
    // so that whenever you use "this" keyword, it refers to the current class
    handleNewTweet = async e => {
        //13 is the keycode for "enter"
        if(e.keyCode !== 13) return;

        const content = this.state.newTweet;
        const author = localStorage.getItem("@GoTwitter:username");

        await api.post('tweets', { content, author });

        this.setState({ newTweet: '' });
    }

    handleInputChange = (e) => {
        this.setState({ newTweet: e.target.value });
    }

    render() {
        return (
            //the word "class" is reserved to javascript so we use "className" instead
            <div className="timeline-wrapper">
                <img height={24} src={twitterLogo} alt="GoTwitter" />

                <form>
                    <textarea
                        value={this.state.newTweet}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleNewTweet}
                        placeholder="O que está acontecendo?"
                    />
                </form>

                <ul className="tweetList">
                {/* map function to go through each one of the tweets returned */}
                {this.state.tweets.map(tweet => (
                    // the tweet property passed here can be accessed inside the
                    // component using "this.props"
                    <Tweet key={tweet._id} tweet={tweet} />
                ))}
                </ul>
            </div>
        );
    }
}