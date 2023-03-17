import styled from 'styled-components'

export const WeatherStyle = styled.div`
  .weather_spin {
    display: flex;
    justify-content: center;
    margin-top: 40px
  }

  .error_message {
    font-size: 24px;
    font-weight: 700;
    color: red
  }

  .weather_card_container {
    display: flex;
    justify-content: center
  }
  
  .weather_city {
    font-size: 32px;
    padding: 4px 20px;
    font-weight: 700;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
