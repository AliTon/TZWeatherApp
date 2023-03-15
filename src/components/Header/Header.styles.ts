import styled from 'styled-components'

export const HeaderStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100px;
  width: 100%;
  background: black;
  z-index: 1;
  padding: 0 10px 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  line-height: 0;

  .title {
    margin: 5px;
    font-weight: bold;
    font-size: 32px;
    color: #d6e8f6
  }
  img {
    border-radius: 8px;
  }
`
