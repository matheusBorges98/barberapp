import React from 'react';
import { Text } from 'react-native';
import { Container } from './styles';
import RadioGroup,{Radio} from "react-native-radio-input";

export default () => {
    getChecked = (value) =>{
        console.log(value)
    }

    
    return (
        <Container>
            <RadioGroup getChecked={this.getChecked}>
                <Radio iconName={"lens"} label={"The first option"} value={"A"}/>
                <Radio iconName={"lens"} label={"The first option"} value={"B"}/>
                <Radio iconName={"lens"} label={"I need numbers"} value={1}/>
                <Radio label={"Is IconName Optional?"} value={"Yes"}/>
                <Radio label={"Show Sentence Value"} value={"This is a Sentence"}/>
            </RadioGroup>
        </Container>
    );
}