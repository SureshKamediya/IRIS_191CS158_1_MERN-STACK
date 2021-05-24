import { getmemberDetails } from "../../helpers/members";

const DashConvener = () => {

    
    getmemberDetails().then(res => {
        console.log(res);
    });

    return (  
        <div className="dashConvener">
            <h2>This is the Convner page.</h2>
        </div>
    );
}
 
export default DashConvener;