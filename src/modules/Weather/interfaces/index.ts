export interface IForecastData {
    date: string
    temperature: number
    icon: string
    index: number
    humidity: number
    pressure: number
    description: string
    main: string
    name: string
    speed: number
}
export interface IHistoricalData {
    date: string
    temperature: number
}