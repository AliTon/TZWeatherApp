import styled from 'styled-components'


interface currentProps {
    current: boolean
}

export const CardStyle = styled.div<currentProps>`
  width: 200px;
  border-radius: 30px;
  color: ${(props) => (props.current ? '#1b1a1d' : '#d6e8f6')};
  padding: 8px;

  .card-header {
    height: 70px;
    background-color: ${(props) => (props.current ? '#d6e8f6' : '#1b1a1d')};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;

  }

  .card-body {
    background-color: ${(props) => (props.current ? '#bbd8ec' : '#1b1a1d')};
    height: 200px;
  }

  .divider {
    background: grey;
    height: 2px;
    margin: 0 10px;
  }

  .card-content {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8px;
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    padding: 8px;

    div {
      font-size: 16px;
      font-weight: 400;

      span {
        font-weight: 700;
        font-size: 10px;
      }
    }
  }
`
