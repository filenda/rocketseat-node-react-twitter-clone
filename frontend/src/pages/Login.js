import React, { Component } from 'react';

import twitterLogo from '../twitter.svg'
// this is enough for React to import and apply styles
import './Login.css';

export default class Login extends Component {

    // state é um objeto do javascript que pode ser usado dentro do componente, e sempre que uma propriedade
    // dentro dele é alterada, o componente é re-renderizado sozinho com a atualização
    state = {
        username: '',
    };

    // every function you create that is not default to react should adopt the arrow (=>) function model
    // so that whenever you use "this" keyword, it refers to the current class

    handleSubmit = e => {
        e.preventDefault();

        const { username } = this.state;

        if(!username.length) return;

        localStorage.setItem("@GoTwitter:username", username);

        this.props.history.push("/timeline");
    }

    handleInputChange = (e) => {
        this.setState({ username: e.target.value });
    }

    render() {
        return (
            //the word "class" is reserved to javascript so we use "className" instead
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitter" />
                <form onSubmit={this.handleSubmit}>
                    <input
                        value={this.state.username}
                        onChange={this.handleInputChange}
                        placeholder="Nome de usuário" 
                    />
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}