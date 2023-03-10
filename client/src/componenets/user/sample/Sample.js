import React, { useRef, useState } from 'react'
import Card from '../card/Card';

function Sample() {

    const [currentTab, setCurrentTab] = useState('assigned');

    const handleTabChange = (tab) => {
      setCurrentTab(tab);
    };



    return (
        <>
      <div className='mt-16'>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li className="mr-2">
                <a  aria-current="page" className="inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500" style={{ color: currentTab === 'assigned' ? 'red' : 'black' }}
            onClick={() => handleTabChange('assigned')}>Assigned</a>
            </li>
            <li className="mr-2">
                <a className="inline-block  p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"  style={{ color: currentTab === 'completed' ? 'red' : 'black' }}
            onClick={() => handleTabChange('started')}>Started</a>
            </li>
            <li className="mr-2">
                <a className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300"style={{ color: currentTab === 'completed' ? 'red' : 'black' }}
            onClick={() => handleTabChange('completed')}
            >Completed</a>
            </li>
            <li className="mr-2">
                <a href="#" className="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300">Contacts</a>
            </li>
            <li>
                <a className="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
            </li>
        </ul>
        </div>

     <Card prop={currentTab}/>
        </>
    )
}

export default Sample