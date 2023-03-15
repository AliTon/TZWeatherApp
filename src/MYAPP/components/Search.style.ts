import styled from 'styled-components'

export const SearchStyle = styled.div`
  background-color: #1e1e1e;
  border-radius: 24px;
  .twitter-search-input {
    display: flex;
    align-items: center;
    border-radius: 24px;
    padding: 6px 12px;
  }

  .twitter-search-input input[type="text"] {
    flex: 1;
    border: none;
    padding: 6px 12px;
    font-size: 16px;
    outline: none;
    background-color: #1e1e1e;
    color: white;
  }

  .twitter-search-input button[type="submit"] {
    background-color: #1da1f2;
    color: #fff;
    border: none;
    border-radius: 24px;
    padding: 6px 12px;
    font-size: 16px;
    font-weight: bold;
    margin-left: 12px;
    cursor: pointer;
  }

  .twitter-search-input button[type="submit"]:hover {
    background-color: #0c8de4;
  }

  .twitter-search-input svg {
    width: 24px;
    height: 24px;
    margin-right: 12px;
    fill: #8899a6;
  }

`
