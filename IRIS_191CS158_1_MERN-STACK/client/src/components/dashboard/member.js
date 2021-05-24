import { getmemberDetails } from "../../helpers/members";

const DashMember = () => {

    getmemberDetails().then(res => {
        console.log(res);
    });

    return (
        <div className="dashMember">
            <h2>This is the member page.</h2>
        </div>
    );
}
 
export default DashMember;