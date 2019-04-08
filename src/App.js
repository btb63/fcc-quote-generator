import React, {
    Component
} from 'react';
import logo from './logo.svg';
import './App.css';

const axios = require('axios');
let quotes;

class App extends Component {

    constructor(props){
        super(props);
        this.state = ({
            loaded: false,
            quotes: {},
            numQuotes: 0,
            currentQuoteIndex: -1,
        });
        this.onClick = this.onClick.bind(this);
    }
    // Pull the quotes json from the example
    componentDidMount() {
        axios.get('https://www.btburke.com/quotes/quotes.json')
            .then((response)  => {
                // handle success

                // I changed to arrow notation because
                // apparently 'this' is automatically
                // bound when you use arrow notation.
                // I don't know the proper way to do this
                // using the 'function (response)' notation'
                console.log("This is in the didMount function.");
                console.log(response);
                quotes = Object.assign({},response);
                this.setState({
                    loaded: true,
                    numQuotes: quotes.data.quotes.length,
                    quotes: quotes,
                    currentQuoteIndex: getRandomInt(quotes.data.quotes.length),
                });
            })
            .catch(function(error) {
                // handle error
                console.log(error);
                alert('Error: '+ error);
            })
            .then(function() {
                // always executed
            });
    }
    onClick() {
        var thisQuoteIndex = this.state.currentQuoteIndex;
        this.setState({
            currentQuoteIndex:getRandomInt(quotes.data.quotes.length),
        });
    }
    render() {
        console.log("This is in the Render."); 
        console.log(this.state.quotes);
        if(this.state.loaded){
            return (
                <div className="App App-header">
                {/* <h1>Total Number of Quotes: {this.state.numQuotes}</h1> */}
                {/*   <h1>Current Quote Index: {this.state.currentQuoteIndex}</h1> */}
                  <div className="Quote">
                  <p className="quote-body">{extractQuote(this.state.quotes.data.quotes[this.state.currentQuoteIndex])}</p>
                  <p className="quote-author">-- {extractAuthor(this.state.quotes.data.quotes[this.state.currentQuoteIndex])}</p>
                  </div>
                <QuoteButton className="App-link" onClick={this.onClick}/>
                </div>
            );
        }
        else {
            return (<h1>loading</h1>);
        }
    }
}

class QuoteButton extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <button className="quote-button" onClick={this.props.onClick}>Give me another!</button>
        );
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

/*
  I'm not sure I actually need these functions
  but I'm just going to keep them in for now.
*/
function extractQuote(quote){
    console.log("w/in quote fxn");
    console.log(quote.quote);
    return quote.quote;
}

function extractAuthor(quote){
    console.log("w/in author fxn");
    console.log(quote.author);
    return quote.author;
}

export default App;
