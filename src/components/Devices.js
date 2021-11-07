import editpen from '../edit-pen.svg'

function Devices(props) {

    const selectedUsersDevices = [];

    props.usersDb.map(item => {
        if (item.checked) {
            item.usedDevices.map(item => {
                if (!selectedUsersDevices.includes(item.deviceId)) {
                    selectedUsersDevices.push(item.deviceId)
                }
                return undefined;
            })
        }
        return undefined;
    })
    selectedUsersDevices.sort();


    const elements = props.devicesDb.map((device) => {
        if (selectedUsersDevices.includes(device.id)) {
            return (
                <tr key={device.id} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center ">
                            {device.id}
                        </div>
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                            <img onClick={() => props.changeName(device.id)} className='w-5 mr-5 cursor-pointer' src={editpen} alt="edit pen" />
                            {device.name}
                        </div>
                    </td>
                </tr>
            );
        }
        return undefined;
    });

    return (
        <div>
            <table className="min-w-max w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left w-1/5">Серийный номер</th>
                        <th className="py-3 px-6 text-left">Наименование</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 font-light">
                    {elements}
                </tbody>
            </table>
        </div>
    );
};

export default Devices;