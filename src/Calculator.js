import React, { Component } from 'react';
import './App.css';

function Key(props) {
    return(
        <button className={props.className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Keyboard extends React.Component {
    renderKey(i){
        return(
            <Key
                value={i}
                onClick={() => this.props.onClick(i)}
                className="btn btnNumber"
            />
        );
    }

    renderKeyOp(op){
        return(
            <Key
                value={op}
                onClick={() => this.props.onClick(op)}
                className="btn btnOperation"
            />
        );
    }

    render(){
        return(
            <div>
                <div className="calc-row">
                    {this.renderKey(7)}
                    {this.renderKey(8)}
                    {this.renderKey(9)}
                    {this.renderKeyOp('/')}
                </div>
                <div className="calc-row">
                    {this.renderKey(4)}
                    {this.renderKey(5)}
                    {this.renderKey(6)}
                    {this.renderKeyOp('*')}
                </div>
                <div className="calc-row">
                    {this.renderKey(1)}
                    {this.renderKey(2)}
                    {this.renderKey(3)}
                    {this.renderKeyOp('-')}
                </div>
                <div className="calc-row">
                    {this.renderKey(0)}
                    {this.renderKey('.')}
                    {this.renderKey('=')}
                    {this.renderKeyOp('+')}
                </div>
            </div>
        );
    }
}

function Display(props) {
    return (
        <div className="display">
            <text className="textDisplay">
                {props.value}
            </text>
        </div>
    );
}

class Calculator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentValue: '',
            operator: '',
            operation: null,
            concat: true
        };
    }

    handleClick(i) {
        if((i === '+' ) || (i === '-' ) || (i === '/' ) || (i === '*' )){
            this.setState({
                operation: i,
                operator: this.state.currentValue,
                concat: false
            });
        }
        else if(i === '=' ){
            let total;
            if(this.state.operation === '/'){
                total = parseFloat(this.state.operator) / parseFloat(this.state.currentValue);
            }
            else if (this.state.operation === '*'){
                total = parseFloat(this.state.operator) * parseFloat(this.state.currentValue);
            }
            else if (this.state.operation === '-'){
                total = parseFloat(this.state.operator) - parseFloat(this.state.currentValue);
            }
            else if (this.state.operation === '+'){
                total = parseFloat(this.state.operator) + parseFloat(this.state.currentValue);
            }
            this.setState({
                currentValue: total,
                operator: '',
                operation: '',
                concat: true
            });
        }
        else {
            if (this.state.operation === '') {
                this.setState({
                    currentValue: this.state.currentValue + i.toString()
                })
            } else if (this.state.concat) {
                this.setState({
                    currentValue: this.state.currentValue + i.toString()
                })
            } else {
                this.setState({
                    currentValue: i.toString(),
                    concat: true
                })
            }
        }
    }

    render() {
        return (
            <div className="App calcutator">
                <div>
                    <Display
                        value={this.state.currentValue}
                    />
                    <Keyboard
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
            </div>
        );
    }
}

export default Calculator;
