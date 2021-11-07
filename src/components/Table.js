import { useState } from "react";
import Devices from "./Devices";
import Users from "./Users";

import userData from '../data/users.json';
import deviceData from '../data/devices.json';

function Table() {

    const [devicesState, setDevicesState] = useState(deviceData);
    const [usersState, setUsersState] = useState(userData);

    // adding devices to user
    function handlerChangeUserDevice(e, userId) {
        e.preventDefault();

        const devId = parseInt(e.target.DevID.value);
        const devAmount = parseInt(e.target.amount.value);
        const newUserState = JSON.parse(JSON.stringify(usersState));
        let searchDevSuccess;

        if (devAmount > 0) {
            newUserState[userId - 1].usedDevices.find((item) => {
                if (item.deviceId === devId) {
                    item.amount += devAmount;
                    searchDevSuccess = true;
                }
                return undefined;
            });
            if (!searchDevSuccess) {
                newUserState[userId - 1].usedDevices.push(
                    { "deviceId": devId, "amount": devAmount }
                )
            };

            setUsersState(newUserState);
        } else {
            alert('Колличество утройств указано не верно, \n ТОЛЬКО ПОЛОЖИТЕЛЬНЫЕ ЧИСЛА')
        }
    };

    // selected users
    function chekedUser(e, UserId) {
        const tempArr = JSON.parse(JSON.stringify(usersState));
        tempArr.map((item) => {
            if (item.id === UserId) {
                item.checked = !item.checked
            }
            return undefined;
        })
        setUsersState(tempArr)
    }

    // delete divice 
    function deleteItem(devId, userId) {
        const tempArr = JSON.parse(JSON.stringify(usersState));
        tempArr.forEach((item, userIndex) => {
            if (item.id === userId) {
                item.usedDevices.forEach((dev, index) => {
                    if (dev.deviceId === devId) {
                        tempArr[userIndex].usedDevices.splice(index, 1)
                    }
                })
            }
        });
        setUsersState(tempArr);
        console.log(usersState);
    }

    // change deviceName
    function changeName(deviceId) {
        const newName = prompt('изменение наименования');
        const tempArr = JSON.parse(JSON.stringify(devicesState))

        tempArr.map((item) => {
            if (item.id === deviceId && newName !== '' && newName !== null) {
                item.name = newName
            }
            return undefined;
        });
        setDevicesState(tempArr);
    }

    // TABS
    const [tabState, setTabState] = useState(1);
    function toggleTab(tabIndex) {
        setTabState(tabIndex)
    };

    return (
        <div>
            <div className="bg-white">
                <nav className="flex flex-col sm:flex-row">
                    <button
                        className={tabState === 1 ? "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500" : "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"}
                        onClick={() => toggleTab(1)}
                    >
                        Пользователи
                    </button>
                    <button
                        className={tabState === 2 ? "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500" : "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none"}
                        onClick={() => toggleTab(2)}
                    >
                        Устройства
                    </button>
                </nav>
            </div>
            {
                tabState === 1 ?
                    <Users
                        usersDb={usersState}
                        devicesDb={devicesState}
                        handlerChangeUserDevice={handlerChangeUserDevice}
                        chekedUser={chekedUser}
                        deleteItem={deleteItem}
                    /> : <Devices
                        devicesDb={devicesState}
                        usersDb={usersState}
                        changeName={changeName}
                    />
            }
        </div>
    )
}

export default Table;