import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useAppDispatch} from "../../configureApp/hooks";
import {changeTempType} from "../../modules/Weather/redux/slices/weatherSlice";

const TempTypeChangerStyle = styled.div`
  background-color: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  margin-right: 20px;
  border-radius: 50px;
  div {
    height: 50px;
    width: 50px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .active {
    background-color: #d6e8f6;
    color: black;
    transition: all 0.4s ease-in-out;
  }

  .inactive {
    background-color: #1e1e1e;
    color: #d6e8f6;
    cursor: pointer;
    transition: all 0.4s ease-in-out;
  }

`

const TempTypeChanger: React.FC = () => {
    const dispatch = useAppDispatch()


    const [type, setType] = useState(true)


    useEffect(() => {
        dispatch(changeTempType(type))
    }, [type, dispatch])

    return (
        <TempTypeChangerStyle>
            <div className={type ? 'active' : 'inactive'} onClick={() => setType(true)}>
                °C
            </div>
            <div className={!type ? 'active' : 'inactive'} onClick={() => setType(false)}>
                °F
            </div>
        </TempTypeChangerStyle>
    );
};

export default TempTypeChanger;
