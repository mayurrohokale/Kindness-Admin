import { useAppState } from '../utils/appState';
import PieChart from './charts/Piechart'
import UsersStatus from './charts/usersStatusChart';

export default function Dashboard(){

    return(
        <div>
            <div className='flex flex-col gap-10 justify-center md:flex-row'>
                <div><PieChart /></div>
                <div> <UsersStatus/></div>
            </div>
        </div>
    )
}