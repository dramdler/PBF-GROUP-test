

function Users(props) {
    const elements = props.usersDb.map((user) => {
        return (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                        <input
                            onChange={(e) => props.chekedUser(e, user.id)}
                            checked={user.checked ? 'checked' : ''}
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-gray-600" />
                    </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center font-semibold">
                        {user.id}
                    </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                        {user.firstName}
                    </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                        {user.lastName}
                    </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                        {user.description}
                    </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="">
                        {user.usedDevices.map((device, index) => {
                            return (
                                <div
                                    key={device.deviceId}
                                >
                                    <div className='inline mr-4 text-lg font-semibold text-red-400 cursor-pointer' onClick={(e) => props.deleteItem(device.deviceId, user.id)}>x</div>
                                    Номер устройства {device.deviceId},
                                    кол-во {device.amount} <br /></div>
                            );
                        })}
                    </div>
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                        <form onSubmit={(e) => props.handlerChangeUserDevice(e, user.id)}>
                            <label>
                                устройство:
                                <select className='ml-3 pl-3 px-6 py-1 w-44 border-2 border-gray-200 rounded-md text-blue-600' size="1" name="DevID">
                                    {props.devicesDb.map((device, index) => {
                                        return (
                                            <option key={device.id} value={device.id}>{device.name}</option>
                                        )
                                    }
                                    )}
                                </select>
                            </label>
                            <label>
                                <input className='ml-3 pl-3 px-6 py-1 w-32 border-2 border-gray-200 rounded-md text-blue-600' type="number" name="amount" placeholder='кол-во' />
                            </label>
                            <input className='ml-3 pl-3 px-6 py-2 w-32 rounded-md text-sm font-medium focus:outline-none focus:ring transition text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100 active:bg-blue-200 focus:ring-blue-300 ' type="submit" value="Добавить" />
                        </form>
                    </div>
                </td>
            </tr>
        );
    });

    return (
        <div>
            <table className="min-w-max w-full table-auto">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left"></th>
                        <th className="py-3 px-6 text-left">ID </th>
                        <th className="py-3 px-6 text-left">Имя</th>
                        <th className="py-3 px-6 text-left" >Фамилия</th>
                        <th className="py-3 px-6 text-left">Описание</th>
                        <th className="py-3 px-6 text-left">Список выбранных Устройств</th>
                        <th className="py-3 px-6 text-left">Добавление</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 font-light">
                    {elements}
                </tbody>
            </table>
        </div>
    );
};

export default Users;