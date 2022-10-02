
import PercentageCircle from 'reactjs-percentage-circle';



export function CirclePercent({board}) {
console.log('board',board)


  return <div>
    <PercentageCircle percent={80}></PercentageCircle>
    <PercentageCircle percent={80}></PercentageCircle>
  </div>
}