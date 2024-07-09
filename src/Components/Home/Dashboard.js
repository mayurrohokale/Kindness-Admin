import { useAppState } from '../utils/appState';
import PieChart from './charts/Piechart'

export default function Dashboard(){

    return(
        <div>
            <div>
                {/* <Sidebar/> */}
                <PieChart />

            </div>
        </div>
    )
}